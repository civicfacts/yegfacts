import {
  claimsOf,
  commentsOnQuestion,
  questionRegister,
  sourceRegister,
  type Claim as RegisterClaim,
  type Question,
  type Source,
} from './intake';
import {
  allPublicStories,
  claimsForStory,
  type Claim as PublishedClaim,
  type Story,
} from './content';

/**
 * One question with everything the site knows about it: where it came from,
 * what was decided, what is checked under it, and the article if it has one.
 *
 * The register and the published content are two files that describe the same
 * thing from opposite ends, and every page that shows a question needs both. So
 * the join happens once, here, rather than in each route: the register is the
 * decision and the claim list, the content collection is the finding and the
 * article, and a question is the row that carries both.
 *
 * D-0029 made the question the unit of work, so this module is the shape the
 * site reads it in. The `story` collection is still called that on disk; the
 * word does not reach a reader.
 */
export interface QuestionRow {
  question: Question;
  /** The capture it came out of, for the questions that came out of one. */
  source: Source | undefined;
  /** The article, when the question has been written up and has a page. */
  story: Story | undefined;
  /**
   * The claims that have been through the panel and carry a finding, in the
   * order the article lists them.
   */
  answered: PublishedClaim[];
  /**
   * The claims from the register that carry no finding: everything under the
   * question that has not been checked, minus the ones a published claim
   * declares it was grouped from.
   *
   * A published question legitimately has some. It means the site answered the
   * question and people went on making claims about it, which is worth showing
   * plainly rather than tidying away.
   */
  registered: RegisterClaim[];
  /**
   * The topics the question is filed under, straight off the register.
   *
   * They used to come off the article, which meant a topic page listed the six
   * questions that had been written up and none of the thirty-eight that had
   * not. The register carries every question, so it is where the filing
   * belongs; a published question's article repeats the same set, and the
   * validator fails the build if the two disagree.
   */
  topics: readonly string[];
  /** How many captured comments carried it, added up over every claim under it. */
  comments: number;
  claimCount: number;
  /** Claims for the source's argument and claims against it, under one question. */
  twoSided: boolean;
}

/**
 * The register's state vocabulary, re-exported so a page that shows questions
 * has one import for everything about a question.
 */
export {
  QUESTION_STATES,
  questionStateKey,
  statesOf,
  triageHeading,
  type QuestionState,
} from './intake';

/**
 * Every question, most-commented first, joined to its article and its claims.
 *
 * The comment count is the sort key because it is the closest the register has
 * to "how much of this argument is actually being had": it puts the questions
 * Edmonton is arguing over at the top and sinks the hyper-specific ones, which
 * is the order somebody checking for cherry-picking wants. The questions
 * registered one at a time, before whole-source intake existed, carry no
 * captured wordings and sort last, with ties broken by id so the order is
 * explicit rather than incidental.
 */
export async function questionRows(): Promise<QuestionRow[]> {
  const stories = new Map((await allPublicStories()).map((story) => [story.id, story]));
  const sources = new Map(sourceRegister().map((source) => [source.id, source]));

  const rows = await Promise.all(
    questionRegister().map(async (question) => {
      const story = question.story ? stories.get(question.story) : undefined;
      const answered = story ? await claimsForStory(story) : [];
      // A register claim a published claim was grouped from is that claim; it
      // is listed once, with its finding, not twice.
      const grouped = new Set(answered.flatMap((claim) => claim.data.register_claims));
      const registered = claimsOf(question.id).filter((claim) => !grouped.has(claim.id));
      const sides = new Set(claimsOf(question.id).map((claim) => claim.side));
      return {
        question,
        source: question.source ? sources.get(question.source) : undefined,
        story,
        answered,
        registered,
        topics: question.topics,
        comments: commentsOnQuestion(question.id),
        claimCount: answered.length + registered.length,
        twoSided: sides.has('for') && sides.has('against'),
      } satisfies QuestionRow;
    }),
  );

  return rows.sort(
    (a, b) => b.comments - a.comments || a.question.id.localeCompare(b.question.id),
  );
}

/** The questions that came out of one capture, most-commented first. */
export async function questionRowsForSource(sourceId: string): Promise<QuestionRow[]> {
  return (await questionRows()).filter((row) => row.question.source === sourceId);
}

/** The questions filed under one topic, most-commented first. */
export async function questionRowsForTopic(slug: string): Promise<QuestionRow[]> {
  return (await questionRows()).filter((row) => row.topics.includes(slug));
}
