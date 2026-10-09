/**
 * MASTER DBMS PRACTICE DATA
 * 
 * Part 1: SQL Query Challenges (Interactive SQL Lab with Sandboxed Schema & Automated Test Cases)
 * Part 2: Comprehensive DBMS MCQ Question Bank (196 deeply authored questions with progressive hints & explanations)
 */

import { DBMS_SQL_CHALLENGES } from './dbmsSqlChallengesData.js';
import { DBMS_MCQ_QUESTIONS } from './dbmsMcqBankData.js';

export { DBMS_SQL_CHALLENGES, DBMS_MCQ_QUESTIONS };

/**
 * Returns SQL challenges scoped to the current canonical topic.
 * If topicId is unprovided or no topic-specific challenges exist, returns all challenges.
 */
export function getDBMSSqlChallenges(rawTopicId) {
  if (!rawTopicId) return DBMS_SQL_CHALLENGES;
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  const filtered = DBMS_SQL_CHALLENGES.filter(c => c.topicId === clean);
  return filtered.length > 0 ? filtered : DBMS_SQL_CHALLENGES;
}

/**
 * Returns MCQs scoped to the current canonical topic.
 * Prioritizes topic-specific questions; falls back to full bank if unset.
 */
export function getDBMSMcqQuestions(rawTopicId) {
  if (!rawTopicId) return DBMS_MCQ_QUESTIONS;
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  const filtered = DBMS_MCQ_QUESTIONS.filter(q => q.topicId === clean);
  return filtered.length > 0 ? filtered : DBMS_MCQ_QUESTIONS;
}
