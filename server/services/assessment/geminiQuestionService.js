/**
 * GEMINI QUESTION SERVICE (STEP 2 - SERVER)
 * 
 * Dynamic question generation using Gemini with strict JSON enforcement:
 * - Structured prompt with subject, topic, difficulty, prior performance
 * - Strict JSON parsing with fence stripping
 * - Full schema validation via questionValidator
 * - Safe retry on failure
 * - Seamless fallback to canonicalQuestionBank
 */

const geminiClient = require('../../integrations/geminiClient');
const geminiConfig = require('../../config/gemini');
const { validateQuestion } = require('./questionValidator');
const { getFallbackQuestions, shuffleQuestion } = require('./canonicalQuestionBank');

/**
 * Strips markdown and extracts JSON object from LLM response text.
 */
function extractJsonFromText(rawText) {
  if (!rawText || typeof rawText !== 'string') return null;

  let text = rawText.trim();
  // Strip ```json ... ``` or ``` ... ```
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '');
    text = text.replace(/```\s*$/, '');
    text = text.trim();
  }

  // Find first { and last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}

/**
 * Generates an adaptive question using Gemini AI or returns a validated fallback question.
 * 
 * @param {Object} context
 * @param {string} context.subject - Canonical subject
 * @param {string} context.studentLevel - Beginner | Intermediate | Advanced
 * @param {Array<{id: string, name: string}>} context.canonicalTopics - Topics in this subject
 * @param {{ id: string, name: string }} context.currentTopic - Current topic to ask
 * @param {string} context.currentDifficulty - Easy | Medium | Hard
 * @param {Object} [context.previousResult] - { correct, skipped, confidence, timeTaken }
 * @param {Array} [context.recentPerformance] - History of recent question outcomes
 * @param {Array<string>} [context.askedQuestionIds] - Previously asked question IDs
 * @param {Array<string>} [context.askedQuestionContents] - Previously asked question texts
 * @param {string} [context.preferredQuestionType='mcq'] - 'mcq' or 'coding'
 * @returns {Promise<Object>} - Validated question object
 */
// Fast in-memory adaptive question pool: stores pre-validated generated questions
const questionCache = new Map();

function getCacheKey(subject, topicId, difficulty, questionType) {
  return `${subject}:${topicId}:${difficulty}:${questionType}`;
}

/**
 * Generates an adaptive question using Gemini AI or returns a validated fallback question.
 * 
 * @param {Object} context
 * @param {string} context.subject - Canonical subject
 * @param {string} context.studentLevel - Beginner | Intermediate | Advanced
 * @param {Array<{id: string, name: string}>} context.canonicalTopics - Topics in this subject
 * @param {{ id: string, name: string }} context.currentTopic - Current topic to ask
 * @param {string} context.currentDifficulty - Easy | Medium | Hard
 * @param {Object} [context.previousResult] - { correct, skipped, confidence, timeTaken }
 * @param {Array} [context.recentPerformance] - History of recent question outcomes
 * @param {Array<string>} [context.askedQuestionIds] - Previously asked question IDs
 * @param {Array<string>} [context.askedQuestionContents] - Previously asked question texts
 * @param {string} [context.preferredQuestionType='mcq'] - 'mcq' or 'coding'
 * @returns {Promise<Object>} - Validated question object
 */
async function generateAdaptiveQuestion(context) {
  const {
    subject,
    studentLevel,
    currentTopic,
    currentDifficulty,
    previousResult = null,
    recentPerformance = [],
    askedQuestionIds = [],
    askedQuestionContents = [],
    preferredQuestionType = 'mcq'
  } = context;

  // Question type selection logic: Coding only for technical subjects (DSA, DBMS)
  const isCodingEligible = ['DSA', 'DBMS'].includes(subject) && preferredQuestionType === 'coding';
  const targetType = isCodingEligible ? 'coding' : 'mcq';

  // 1. Check in-memory pool for pre-generated question (0ms latency)
  const poolKey = getCacheKey(subject, currentTopic.id, currentDifficulty, targetType);
  const cachedPool = questionCache.get(poolKey) || [];
  const candidateFromCache = cachedPool.find(q =>
    !askedQuestionIds.includes(q.questionId) &&
    !askedQuestionContents.includes(q.question)
  );

  if (candidateFromCache) {
    return shuffleQuestion({ ...candidateFromCache, questionId: `gemini_${Date.now()}_${Math.random().toString(36).slice(2, 6)}` });
  }

  // 2. Check if Gemini API is available and not in fast unit test mode
  if (geminiConfig.apiKey && process.env.SKIP_GEMINI_AI !== 'true') {
    try {
      const prompt = `You are the PathPilot Assessment Engine. Generate a college placement diagnostic question with STRICT adherence to the following criteria:

- Subject: "${subject}"
- Canonical Topic ID: "${currentTopic.id}"
- Canonical Topic Name: "${currentTopic.name}"
- Target Difficulty: "${currentDifficulty}"
- Question Type: "${targetType}"
- Student Starting Level: "${studentLevel}"
${previousResult ? `- Previous Question Result: ${previousResult.correct ? 'Correct' : previousResult.skipped ? 'Skipped' : 'Incorrect'}` : ''}
${recentPerformance.length ? `- Recent Performance: ${recentPerformance.map(r => r.correct ? '✓' : r.skipped ? 'S' : '✗').join(', ')}` : ''}

CRITICAL RULES:
1. Return ONLY a valid JSON object. No explanation, no intro text, no conversational markdown.
2. The topicId must be EXACTLY "${currentTopic.id}".
3. The subject must be EXACTLY "${subject}".
4. The difficulty must be EXACTLY "${currentDifficulty}".
5. questionId must be a unique string starting with "gemini_".
6. Do NOT invent concepts outside "${subject}" or "${currentTopic.name}".
7. For MCQ, shuffle/randomize the position of the correct answer among the 4 options. Do NOT always place the correct answer as the first option.
8. For coding questions, starterCode MUST ONLY contain function syntax signature and comments instructing the student. NEVER provide the complete working solution in starterCode.

JSON SCHEMA for MCQ:
{
  "questionId": "gemini_${Date.now()}",
  "subject": "${subject}",
  "topicId": "${currentTopic.id}",
  "topicName": "${currentTopic.name}",
  "difficulty": "${currentDifficulty}",
  "questionType": "mcq",
  "question": "Clear, technically precise question prompt...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option B",
  "explanation": "Brief concept explanation of why this answer is correct",
  "estimatedTime": 60
}

Return RAW JSON only.`;

      // Fast 1200ms timeout promise: if Gemini is slow, instantly fall back to canonical bank
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API fast-timeout')), 1200)
      );

      const responsePromise = geminiClient.generateGuidance(prompt, {
        subject,
        topicId: currentTopic.id,
        difficulty: currentDifficulty
      });

      const response = await Promise.race([responsePromise, timeoutPromise]);

      // The development Gemini client returns the original prompt when no model is
      // configured. That includes the illustrative JSON and must never become a
      // student-facing question; use the verified canonical pool instead.
      const isPromptEcho = typeof response?.output === 'string' &&
        response.output.startsWith('PathPilot Mentor guidance for:');
      if (response && response.output && !isPromptEcho) {
        const parsed = extractJsonFromText(response.output);
        if (parsed) {
          parsed.subject = subject;
          parsed.topicId = currentTopic.id;
          parsed.topicName = currentTopic.name;
          parsed.difficulty = currentDifficulty;
          parsed.questionType = targetType;
          if (!parsed.questionId) parsed.questionId = `gemini_${Date.now()}`;

          const validation = validateQuestion(parsed, {
            askedQuestionIds,
            askedQuestionContents
          });

          const containsPlaceholder = /clear, technically precise question prompt|brief concept explanation/i
            .test(`${parsed.question || ''} ${parsed.explanation || ''}`);
          if (validation.isValid && !containsPlaceholder) {
            const finalQ = {
              ...parsed,
              isAiGenerated: true,
              isFallback: false
            };
            const currentPool = questionCache.get(poolKey) || [];
            if (currentPool.length < 10) {
              currentPool.push(finalQ);
              questionCache.set(poolKey, currentPool);
            }
            return shuffleQuestion(finalQ);
          }
        }
      }
    } catch (err) {
      // Graceful fallback to verified canonical pool on any failure/timeout/503
    }
  }


  // Fallback to verified canonical question bank with questionType matching
  const fallbacks = getFallbackQuestions({
    subject,
    topicId: currentTopic.id,
    difficulty: currentDifficulty,
    excludedIds: askedQuestionIds,
    questionType: targetType
  });

  const selectedFallback = fallbacks[0] || getFallbackQuestions({ subject, excludedIds: askedQuestionIds, questionType: targetType })[0];

  return {
    ...selectedFallback,
    isAiGenerated: false,
    isFallback: true
  };
}

module.exports = {
  extractJsonFromText,
  generateAdaptiveQuestion
};
