/**
 * MASTER COMPUTER NETWORKS (CN) PRACTICE DATA PROVIDER
 * Exports Topic-Scoped MCQs, Diagram/Scenario Questions, and Filtering Utilities
 */

import { CN_MCQ_QUESTIONS, CN_DIAGRAM_QUESTIONS } from './cnMcqBankData.js';
import { resolveCNTopicId } from './cnTopicDataRegistry.js';

export { CN_MCQ_QUESTIONS, CN_DIAGRAM_QUESTIONS };

/**
 * Returns MCQs scoped to the current canonical topic.
 * If topicId is unset or empty, returns all MCQs.
 */
export function getCNMcqQuestions(rawTopicId) {
  if (!rawTopicId) return CN_MCQ_QUESTIONS;
  const canonicalId = resolveCNTopicId(rawTopicId);
  const filtered = CN_MCQ_QUESTIONS.filter(q => q.topicId === canonicalId);
  return filtered.length > 0 ? filtered : CN_MCQ_QUESTIONS;
}

/**
 * Returns Diagram & Scenario questions scoped to the current canonical topic.
 */
export function getCNDiagramQuestions(rawTopicId) {
  if (!rawTopicId) return CN_DIAGRAM_QUESTIONS;
  const canonicalId = resolveCNTopicId(rawTopicId);
  const filtered = CN_DIAGRAM_QUESTIONS.filter(q => q.topicId === canonicalId);
  return filtered.length > 0 ? filtered : CN_DIAGRAM_QUESTIONS;
}

/**
 * Returns combined practice statistics for a topic.
 */
export function getCNPracticeStats(rawTopicId) {
  const mcqs = getCNMcqQuestions(rawTopicId);
  const diagrams = getCNDiagramQuestions(rawTopicId);
  return {
    totalQuestions: mcqs.length + diagrams.length,
    mcqCount: mcqs.length,
    diagramCount: diagrams.length
  };
}
