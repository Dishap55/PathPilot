/**
 * TOPIC SELECTION ENGINE (STEP 2 - SERVER)
 * 
 * Selects canonical topics deterministically for question generation:
 * - Uses ONLY canonical topic IDs supplied by Step 1 Assessment Input
 * - Never invents topic IDs
 * - Ensures broad topic coverage across the ~7 questions of each subject
 * - Distributes questions fairly without clustering on a single topic
 */

const { getCanonicalTopics, resolveSubject } = require('../../constants/canonicalTopicRegistry');

/**
 * Selects the next topic to test for a given subject.
 * 
 * @param {Object} params
 * @param {string} params.subject - Canonical subject name (e.g. 'DBMS', 'DSA')
 * @param {Array<{id: string, name: string}>} params.canonicalTopics - Canonical topics array from Step 1
 * @param {Array<string>} [params.askedTopicIds=[]] - Array of topic IDs already asked in current session
 * @param {string} [params.focusedTopicId=null] - Optional specific topic ID if additional evidence is requested
 * @returns {{ id: string, name: string }} - The selected canonical topic
 */
function selectNextTopic({
  subject,
  canonicalTopics,
  askedTopicIds = [],
  focusedTopicId = null
}) {
  const canonicalSubject = resolveSubject(subject);
  if (!canonicalSubject) {
    throw new Error(`Cannot select topic: Invalid subject "${subject}".`);
  }

  // Fallback to registry if canonicalTopics list not supplied
  const topicPool = (Array.isArray(canonicalTopics) && canonicalTopics.length > 0)
    ? canonicalTopics
    : getCanonicalTopics(canonicalSubject);

  if (topicPool.length === 0) {
    throw new Error(`Cannot select topic: No canonical topics found for subject "${canonicalSubject}".`);
  }

  // 1. If a valid focused topic is explicitly requested, verify and return it
  if (focusedTopicId) {
    const matched = topicPool.find(t => t.id === focusedTopicId);
    if (matched) return { id: matched.id, name: matched.name };
  }

  // 2. Count occurrences of each canonical topic in askedTopicIds
  const topicCounts = new Map();
  topicPool.forEach(t => topicCounts.set(t.id, 0));

  askedTopicIds.forEach(id => {
    if (topicCounts.has(id)) {
      topicCounts.set(id, topicCounts.get(id) + 1);
    }
  });

  // 3. Find topics with minimal ask count
  let minCount = Infinity;
  topicPool.forEach(t => {
    const c = topicCounts.get(t.id);
    if (c < minCount) minCount = c;
  });

  // Filter candidates with minimum count
  const candidateTopics = topicPool.filter(t => topicCounts.get(t.id) === minCount);

  // Return a randomly selected candidate among those with minimal ask count for varied assessment coverage
  const randomIndex = Math.floor(Math.random() * candidateTopics.length);
  const selected = candidateTopics[randomIndex] || topicPool[0];
  return { id: selected.id, name: selected.name };
}

module.exports = {
  selectNextTopic
};
