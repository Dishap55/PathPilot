/**
 * GEMINI ANALYSIS PRESENTATION SERVICE (STEP 3 - SERVER)
 * 
 * Generates encouraging, student-friendly textual interpretations
 * of the deterministic Initial Assessment analysis.
 * 
 * Strict Invariants:
 * 1. Gemini CANNOT change deterministic scores, accuracy, or assessed levels.
 * 2. Gemini CANNOT invent topics, history, or answers.
 * 3. If Gemini fails, deterministic templates provide instant fallback.
 * 4. Zero risk of crash or blank screen.
 */

const geminiClient = require('../../integrations/geminiClient');

/**
 * Generates a deterministic fallback summary if Gemini is offline or fails.
 */
function getDeterministicFeedback(analysis) {
  const { dsaResult, aptitudeResult, overall } = analysis;

  const dsaLevel = dsaResult.assessedLevel;
  const aptLevel = aptitudeResult.assessedLevel;
  const accuracy = overall.accuracy;

  let overallSummary = `You've established a verified baseline with ${accuracy}% overall accuracy across 10 diagnostic questions.`;
  if (accuracy >= 80) {
    overallSummary = `Outstanding work! With ${accuracy}% accuracy, you demonstrated strong analytical intuition and solid technical fundamentals.`;
  } else if (accuracy >= 60) {
    overallSummary = `Great effort! With ${accuracy}% accuracy, you showed consistent performance with clear strengths and actionable growth opportunities.`;
  } else {
    overallSummary = `Good diagnostic start! Your initial assessment highlights key fundamentals to strengthen as you begin your preparation.`;
  }

  const dsaSummary = `DSA Level assessed as ${dsaLevel} (${dsaResult.accuracy}% accuracy). ${dsaResult.reason}`;
  const aptitudeSummary = `Aptitude Level assessed as ${aptLevel} (${aptitudeResult.accuracy}% accuracy). ${aptitudeResult.reason}`;

  const topStrengths = overall.combinedStrengths.slice(0, 3).map(s => s.topicName);
  const strengthsHighlight = topStrengths.length > 0
    ? `Strong performance observed in ${topStrengths.join(', ')}.`
    : 'Demonstrated solid diagnostic engagement across core problem areas.';

  const topFocus = overall.combinedFocusAreas.slice(0, 3).map(f => f.topicName);
  const focusAreasHighlight = topFocus.length > 0
    ? `Recommended focus areas for deliberate practice: ${topFocus.join(', ')}.`
    : 'Continue deliberate practice to transition developing skills into mastery.';

  return {
    source: 'deterministic_fallback',
    summary: overallSummary,
    dsaSummary,
    aptitudeSummary,
    strengthsHighlight,
    focusAreasHighlight,
    recommendations: [
      `Begin your ${dsaLevel} DSA practice challenges.`,
      `Strengthen foundational problem sets in Aptitude (${aptLevel} level).`,
      'Explore DBMS, OS, OOPS, and CN directly from Beginner level at your own pace.'
    ]
  };
}

/**
 * Enriches deterministic assessment result with Gemini AI interpretation.
 */
async function generateAssessmentInterpretation(analysis) {
  const fallback = getDeterministicFeedback(analysis);

  try {
    const prompt = `
You are the PathPilot AI Placement Mentor.
A student just completed their 10-question Initial Skill Assessment (5 DSA questions + 5 Aptitude questions).

Here is the authoritative, verified deterministic assessment data:
- DSA Starting Level: ${analysis.dsaResult.startingLevel}
- DSA Assessed Level: ${analysis.dsaResult.assessedLevel}
- DSA Accuracy: ${analysis.dsaResult.accuracy}% (${analysis.dsaResult.correctAnswers}/${analysis.dsaResult.totalQuestions} correct, ${analysis.dsaResult.skippedQuestions} skipped)
- DSA Evaluated Topics: ${analysis.dsaResult.topicPerformance.map(t => `${t.topicName} (${t.status})`).join(', ')}

- Aptitude Starting Level: ${analysis.aptitudeResult.startingLevel}
- Aptitude Assessed Level: ${analysis.aptitudeResult.assessedLevel}
- Aptitude Accuracy: ${analysis.aptitudeResult.accuracy}% (${analysis.aptitudeResult.correctAnswers}/${analysis.aptitudeResult.totalQuestions} correct, ${analysis.aptitudeResult.skippedQuestions} skipped)
- Aptitude Evaluated Topics: ${analysis.aptitudeResult.topicPerformance.map(t => `${t.topicName} (${t.status})`).join(', ')}

- Overall Accuracy: ${analysis.overall.accuracy}%
- Total Session Time: ${analysis.overallTimeSeconds} seconds

Provide an encouraging, student-friendly interpretation in JSON format:
{
  "summary": "2 sentences summarizing their diagnostic performance constructively",
  "dsaSummary": "1-2 sentences on their DSA performance and why their level is appropriate",
  "aptitudeSummary": "1-2 sentences on their Aptitude performance",
  "strengthsHighlight": "1 sentence celebrating their strong topics",
  "focusAreasHighlight": "1 constructive sentence on topics needing attention (use encouraging language: 'needs more practice')",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}

STRICT CONSTRAINTS:
- DO NOT change the assessed levels (${analysis.dsaResult.assessedLevel} for DSA, ${analysis.aptitudeResult.assessedLevel} for Aptitude).
- DO NOT invent topics that were not listed above.
- Return ONLY valid JSON.
`;

    const res = await geminiClient.generateGuidance(prompt, { assessmentId: analysis.assessmentId });
    if (!res || !res.output) {
      return fallback;
    }

    // Parse JSON
    let text = res.output.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(text);

      if (parsed && parsed.summary && parsed.dsaSummary) {
        return {
          source: 'gemini',
          summary: parsed.summary,
          dsaSummary: parsed.dsaSummary,
          aptitudeSummary: parsed.aptitudeSummary || fallback.aptitudeSummary,
          strengthsHighlight: parsed.strengthsHighlight || fallback.strengthsHighlight,
          focusAreasHighlight: parsed.focusAreasHighlight || fallback.focusAreasHighlight,
          recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : fallback.recommendations
        };
      }
    }

    return fallback;
  } catch (err) {
    return fallback;
  }
}

module.exports = {
  getDeterministicFeedback,
  generateAssessmentInterpretation
};
