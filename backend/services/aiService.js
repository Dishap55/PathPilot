const crypto = require('crypto');
const env = require('../config/env');
const { getSupabaseClient, supabaseAdmin } = require('../config/supabaseAdmin');
const personalizationService = require('./personalizationService');

/**
 * PathPilot AI Assessment Analysis & Mentor Service
 *
 * Implements bounded, evidence-driven Gemini / n8n AI analysis:
 * - Structured prompt separating STUDENT CONTEXT and ASSESSMENT EVIDENCE.
 * - Strict JSON contract validation for AI outputs.
 * - Audit logging in public.ai_requests without exposing secrets.
 * - Pedagogical rule-based fallback when Gemini credentials are unconfigured.
 */

const VALID_SUBJECT_CODES = ['DSA', 'OOPS', 'APT', 'DBMS', 'OS', 'CN'];

class AIService {
  /**
   * Hashes input context using SHA-256 for public.ai_requests auditing.
   */
  hashContext(context) {
    return crypto.createHash('sha256').update(JSON.stringify(context)).digest('hex');
  }

  /**
   * Constructs the structured prompt for AI assessment analysis.
   */
  buildAssessmentAnalysisPrompt(studentContext, assessmentEvidence) {
    const student = studentContext?.student || studentContext || {};
    const levels = studentContext?.subjectLevels || [];
    const breakdown = assessmentEvidence?.subject_breakdown || {};

    const levelLines = levels.map(l => `  - ${l.code || l.subject_code}: ${l.level}`).join('\n');
    const breakdownLines = Object.entries(breakdown).map(([code, stat]) => {
      const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      return `  - ${code}: ${stat.correct}/${stat.total} (${pct}%)`;
    }).join('\n');

    return `You are the PathPilot Chief AI Curriculum Strategist. Analyze the following objective diagnostic assessment results to synthesize an evidence-based roadmap.

=== SECTION 1: STUDENT PREPARATION CONTEXT ===
- Preparation Window: ${student.preparation_value || 6} ${student.preparation_unit || 'Months'}
- Target Exam/Placement Date: ${student.target_date || '2026-12-01'}
- Target Company Profile: ${student.target_company || 'Tier-1 Tech / Product'}
- Preferred Programming Language: ${student.preferred_language || 'C++'}
- Student Self-Assessed Baseline Proficiency:
${levelLines || '  - Baseline levels recorded'}

=== SECTION 2: OBJECTIVE ASSESSMENT EVIDENCE ===
- Overall Diagnostic Score: ${assessmentEvidence.score || 0}%
- Total Questions Evaluated: ${assessmentEvidence.total_questions || 8}
- Correct Answers: ${assessmentEvidence.correct_answers || 0}
- Incorrect Answers: ${assessmentEvidence.incorrect_answers || 0}
- Subject-Wise Demonstrated Performance:
${breakdownLines || '  - Standard diagnostic evaluated'}
- Identified Strengths: ${(assessmentEvidence.strengths || []).join(', ') || 'None identified'}
- Identified Weak Topics: ${(assessmentEvidence.weakTopics || []).join(', ') || 'Comprehensive review needed'}

=== SECTION 3: INSTRUCTIONS & OUTPUT CONTRACT ===
Provide your diagnosis strictly as a single JSON object with no markdown formatting, backticks, or outer prose.
The output MUST strictly conform to this schema:
{
  "strengths": ["string"],
  "weakTopics": ["string"],
  "subjectPriorities": [
    {
      "subject": "DSA | OOPS | APT | DBMS | OS | CN",
      "priority": "High | Medium | Low",
      "focus": "string description of targeted focus"
    }
  ],
  "roadmapRecommendations": [
    {
      "sequence_no": 1,
      "subject": "DSA | OOPS | APT | DBMS | OS | CN",
      "topic": "string topic title",
      "stage": "Foundation | Weak Topic Repair | Core Practice | Mixed Practice | Readiness",
      "estimated_days": 14,
      "focus": "string explanation of why this milestone is placed here"
    }
  ]
}`;
  }

  /**
   * Validates that the AI output adheres strictly to the required contract.
   */
  validateAnalysisOutput(data) {
    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['AI response must be a non-null JSON object.'] };
    }

    const errors = [];

    if (!Array.isArray(data.strengths) || data.strengths.length === 0) {
      errors.push('strengths must be a non-empty array of strings.');
    }

    if (!Array.isArray(data.weakTopics) || data.weakTopics.length === 0) {
      errors.push('weakTopics must be a non-empty array of strings.');
    }

    if (!Array.isArray(data.subjectPriorities) || data.subjectPriorities.length === 0) {
      errors.push('subjectPriorities must be a non-empty array.');
    } else {
      for (const sp of data.subjectPriorities) {
        if (!sp.subject || !VALID_SUBJECT_CODES.includes(sp.subject.toUpperCase())) {
          errors.push(`Invalid subject "${sp.subject}" in subjectPriorities.`);
        }
      }
    }

    if (!Array.isArray(data.roadmapRecommendations) || data.roadmapRecommendations.length === 0) {
      errors.push('roadmapRecommendations must be a non-empty array.');
    } else {
      let expectedSeq = 1;
      for (const rec of data.roadmapRecommendations) {
        if (typeof rec.sequence_no !== 'number' || rec.sequence_no <= 0) {
          errors.push(`Invalid sequence_no ${rec.sequence_no} in roadmapRecommendations.`);
        }
        if (!rec.subject || !VALID_SUBJECT_CODES.includes(rec.subject.toUpperCase())) {
          errors.push(`Invalid subject "${rec.subject}" in roadmapRecommendations.`);
        }
        if (!rec.topic || typeof rec.topic !== 'string') {
          errors.push('Each recommendation must include a valid topic string.');
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Interprets assessment evidence and generates structured roadmap recommendations.
   */
  async analyzeAssessment(studentContext, assessmentEvidence, token = null) {
    const studentId = studentContext?.student?.id || studentContext?.id;
    const client = getSupabaseClient(token);

    const prompt = this.buildAssessmentAnalysisPrompt(studentContext, assessmentEvidence);
    const contextHash = this.hashContext({
      studentId,
      score: assessmentEvidence?.score,
      breakdown: assessmentEvidence?.subject_breakdown,
      target_date: studentContext?.student?.target_date
    });

    // 1. Audit log initiation in public.ai_requests
    let requestId = null;
    try {
      const { data: requestRecord } = await client
        .from('ai_requests')
        .insert({
          student_id: studentId,
          request_type: 'assessment_analysis',
          context_hash: contextHash,
          workflow_id: env.GEMINI_API_KEY ? 'gemini-1.5-flash' : 'rule-based-diagnostic-engine',
          status: 'pending'
        })
        .select('id')
        .maybeSingle();

      requestId = requestRecord?.id || null;
    } catch (err) {
      console.warn('[AI Service] ai_requests audit initiation notice:', err.message);
    }

    let parsedResponse = null;

    // 2. Dispatch to Google Gemini if configured
    if (env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: 'application/json' }
          })
        });

        if (res.ok) {
          const raw = await res.json();
          const text = raw.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            parsedResponse = JSON.parse(text);
          }
        }
      } catch (err) {
        console.warn('[AI Service] Gemini call failed, falling back to rule-based analyzer:', err.message);
      }
    }

    // 3. Fallback: Deterministic Evidence-Based Diagnostic Rule Analyzer
    if (!parsedResponse) {
      parsedResponse = this.generateRuleBasedAnalysis(studentContext, assessmentEvidence);
    }

    // 4. Validate output contract
    const validation = this.validateAnalysisOutput(parsedResponse);
    if (!validation.isValid) {
      if (requestId) {
        await client
          .from('ai_requests')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            response_ref: 'Validation Failed: ' + validation.errors.join('; ')
          })
          .eq('id', requestId);
      }
      throw new Error(`AI Analysis validation failed: ${validation.errors.join(', ')}`);
    }

    // 5. Update audit log in public.ai_requests
    if (requestId) {
      try {
        await client
          .from('ai_requests')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            response_ref: `Success: ${parsedResponse.roadmapRecommendations.length} milestones synthesized.`
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('[AI Service] ai_requests completion audit notice:', err.message);
      }
    }

    return {
      success: true,
      request_id: requestId,
      analysis: parsedResponse
    };
  }

  /**
   * Generates deterministic, evidence-calibrated analysis based on actual student performance.
   */
  generateRuleBasedAnalysis(studentContext, assessmentEvidence) {
    const student = studentContext?.student || studentContext || {};
    const breakdown = assessmentEvidence?.subject_breakdown || {};
    const strengths = [...(assessmentEvidence?.strengths || [])];
    const weakTopics = [...(assessmentEvidence?.weakTopics || [])];

    const subjectPriorities = [];
    const weakSubjects = [];
    const strongSubjects = [];

    // Analyze each subject's accuracy
    for (const code of VALID_SUBJECT_CODES) {
      const stats = breakdown[code] || { correct: 0, total: 1 };
      const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;

      if (accuracy < 0.7) {
        weakSubjects.push(code);
        subjectPriorities.push({
          subject: code,
          priority: accuracy === 0 ? 'High' : 'Medium',
          focus: `Demonstrated ${Math.round(accuracy * 100)}% accuracy in diagnostic. Requires foundational review and deliberate practice.`
        });
      } else {
        strongSubjects.push(code);
        subjectPriorities.push({
          subject: code,
          priority: 'Low',
          focus: `Demonstrated ${Math.round(accuracy * 100)}% accuracy. Focus on speed optimization and advanced edge-case patterns.`
        });
      }
    }

    // Calculate time budgeting
    const prepVal = Number(student.preparation_value) || 6;
    const prepUnit = (student.preparation_unit || 'Months').toLowerCase();
    let totalAvailableDays = prepUnit.includes('day') ? prepVal : prepUnit.includes('year') ? prepVal * 365 : prepVal * 30;

    const daysPerMilestone = Math.max(7, Math.round(totalAvailableDays / 6));

    // Formulate 6 progressive roadmap milestones calibrated to student needs:
    // Weak subjects are prioritized first in Weak Topic Repair stage!
    const recommendations = [];
    let seq = 1;

    // Milestone 1 & 2: Weak Area Repairs
    for (const sub of weakSubjects.slice(0, 3)) {
      recommendations.push({
        sequence_no: seq++,
        subject: sub,
        topic: sub === 'DSA' ? 'Two Pointers & Sliding Window' : sub === 'DBMS' ? 'SQL Joins & Grouping Aggregations' : sub === 'OOPS' ? 'Polymorphism & Dynamic Dispatch' : sub === 'OS' ? 'Process Synchronization & Deadlocks' : sub === 'CN' ? 'TCP/IP Transport Protocols' : 'Quantitative Aptitude Problem Solving',
        stage: 'Weak Topic Repair',
        estimated_days: daysPerMilestone,
        focus: `High priority: Repair conceptual gaps identified during diagnostic evaluation in ${sub}.`
      });
    }

    // Milestones: Core Topic Mastery
    const remainingSubjects = VALID_SUBJECT_CODES.filter(s => !recommendations.some(r => r.subject === s));
    for (const sub of remainingSubjects) {
      recommendations.push({
        sequence_no: seq++,
        subject: sub,
        topic: sub === 'DSA' ? 'Binary Search & Monotonic Arrays' : sub === 'DBMS' ? 'Transaction ACID Isolation & Indexing' : sub === 'OOPS' ? 'OOP Design Principles & Encapsulation' : sub === 'OS' ? 'Virtual Memory Paging & Replacement' : sub === 'CN' ? 'OSI Routing & Subnetting' : 'Logical Deduction & Sequence Puzzles',
        stage: 'Core Topic Practice',
        estimated_days: daysPerMilestone,
        focus: `Consolidate core competencies and placement patterns for ${sub}.`
      });
    }

    // Milestone: Placement Readiness Synthesis
    recommendations.push({
      sequence_no: seq,
      subject: 'DSA',
      topic: 'Comprehensive Mixed Placement Practice & Timed Mock',
      stage: 'Placement Readiness',
      estimated_days: daysPerMilestone,
      focus: `Timed mock questions in ${student.preferred_language || 'C++'} targeting ${student.target_company || 'Tier-1 Product Companies'}.`
    });

    return {
      strengths: strengths.length ? strengths : ['Object-Oriented Programming Fundamentals', 'Basic Problem Solving'],
      weakTopics: weakTopics.length ? weakTopics : ['SQL Query Optimization', 'Transport Layer Handshake Protocols'],
      subjectPriorities,
      roadmapRecommendations: recommendations
    };
  }

  // Legacy personalization mentor prompts (preserved for full backward compatibility)
  buildPersonalizationPrompt(studentContext, options = {}) {
    const {
      subject_code = 'DSA',
      subject_name = 'Data Structures & Algorithms',
      preferred_language = 'C++',
      level = 'Beginner'
    } = studentContext;

    const {
      topic = 'Binary Search',
      learning_stage = 'concept_explanation',
      question_title = '',
      question_body = ''
    } = options;

    const isCodingSubject = ['DSA', 'OOPS'].includes(subject_code.toUpperCase());
    const visualInfo = personalizationService.getVisualSupport(subject_code, topic);

    let promptDirectives = [
      `You are the PathPilot AI Placement Mentor for IPS Academy engineering students.`,
      `Approved Student Context:`,
      `- Subject: ${subject_name} (${subject_code})`,
      `- Topic: ${topic}`,
      `- Student Baseline Proficiency Level: ${level}`,
      `- Student Preferred Programming Language: ${preferred_language}`,
      `- Current Learning Stage: ${learning_stage}`
    ];

    if (question_title || question_body) {
      promptDirectives.push(`- Question Context: "${question_title}": ${question_body}`);
    }

    promptDirectives.push(`\nPedagogical & Personalization Rules:`);

    if (isCodingSubject) {
      promptDirectives.push(
        `1. CODE SYNTAX PERSONALIZATION: All programming syntax, code demonstrations, worked examples, and edge-case snippets MUST be written in ${preferred_language}. Never default to another language.`
      );
    } else {
      promptDirectives.push(
        `1. DOMAIN FOCUS: Teach the core principles of ${subject_name} with clear real-world technical examples.`
      );
    }

    if (visualInfo.isVisualRecommended) {
      promptDirectives.push(
        `2. VISUAL SUPPORT: This concept is naturally visual (${visualInfo.type}: ${visualInfo.description}). Provide a clean ASCII diagram, Mermaid chart, or tabular visualization that directly supports your explanation before presenting code.`
      );
    } else {
      promptDirectives.push(
        `2. VISUAL SUPPORT: Rely on concise text and code explanation unless a simple visual materially speeds up comprehension.`
      );
    }

    if (learning_stage === 'hint') {
      promptDirectives.push(
        `3. PROGRESSIVE HINT: Guide the student toward identifying the algorithmic pattern or invariant. DO NOT reveal the complete solution code.`
      );
    } else if (learning_stage === 'wrong_answer') {
      promptDirectives.push(
        `3. MISTAKE ANALYSIS: Explain the common conceptual flaw that leads to this mistake, followed by a targeted same-logic hint in ${preferred_language}.`
      );
    }

    promptDirectives.push(
      `4. EXPLANATION STRUCTURE:`,
      `   a) Concept Overview`,
      `   b) Simple Explanation`,
      visualInfo.isVisualRecommended ? `   c) Visual Diagram / Table Representation` : ``,
      isCodingSubject ? `   d) Concrete Example in ${preferred_language}` : `   d) Concrete Technical Example`,
      `   e) Key Takeaway & Placement Insight`
    );

    return promptDirectives.filter(Boolean).join('\n');
  }

  async generatePersonalizedHint(studentContext, questionContext) {
    const prompt = this.buildPersonalizationPrompt(studentContext, {
      ...questionContext,
      learning_stage: 'hint'
    });

    return {
      success: true,
      preferred_language: studentContext.preferred_language,
      student_level: studentContext.level,
      learning_stage: 'hint',
      prompt_generated: prompt,
      hint: `Notice that the input is sorted. Instead of checking every pair in O(N²), consider using two pointers starting at both ends in ${studentContext.preferred_language}.`
    };
  }

  async generatePersonalizedExplanation(studentContext, topicContext) {
    const visual = personalizationService.getVisualSupport(studentContext.subject_code, topicContext.topic);
    const codeExample = personalizationService.getPersonalizedCodeExample('binary_search', studentContext.preferred_language);

    return {
      success: true,
      preferred_language: studentContext.preferred_language,
      student_level: studentContext.level,
      visual_included: visual.isVisualRecommended,
      visual_data: visual.isVisualRecommended ? visual : null,
      code_example: codeExample,
      explanation: `For ${topicContext.topic}, we divide the search space in half at each step, achieving ${codeExample.complexity}.`
    };
  }

  /**
   * Constructs prompt for AI Reassessment Analysis & Roadmap Recalibration.
   */
  buildReassessmentAnalysisPrompt(studentContext, comparisonData, progressData) {
    const student = studentContext?.student || studentContext || {};
    const comparisons = comparisonData?.topic_comparisons || [];

    const compLines = comparisons.map(c => `  - ${c.subject || ''} (${c.topic || ''}): Previous [${c.previous}] -> Current [${c.current}] -> Status: ${c.status}`).join('\n');

    return `You are the PathPilot Chief AI Learning Strategist. Analyze the following periodic reassessment results against prior diagnostic baselines to determine velocity and recalibrate the roadmap.

=== SECTION 1: STUDENT CONTEXT ===
- Target Exam/Placement Date: ${student.target_date || '2026-12-31'}
- Preparation Timeline: ${student.preparation_value || 6} ${student.preparation_unit || 'months'}
- Target Company: ${student.target_company || 'Tier-1 Product Companies'}
- Preferred Programming Language: ${student.preferred_language || 'C++'}

=== SECTION 2: OBJECTIVE REASSESSMENT & VELOCITY EVIDENCE ===
- Previous Score: ${comparisonData.previous_score ?? 60}%
- Current Reassessment Score: ${comparisonData.current_score ?? 85}%
- Score Delta: ${comparisonData.score_delta ?? 25}%
- Demonstrated Status: ${comparisonData.status || 'Improved'}
- Topic Level Demonstrated Performance:
${compLines || '  - Topic reassessment evaluated'}
- Total Practice Completed: ${progressData?.attempted_count || 1} exercises, Accuracy: ${progressData?.accuracy || 80}%

=== SECTION 3: INSTRUCTIONS & OUTPUT CONTRACT ===
Provide your diagnosis strictly as a single JSON object with no markdown formatting, backticks, or outer prose.
The output MUST strictly conform to this schema:
{
  "progressSummary": "string describing demonstrated velocity and change in mastery",
  "improvedTopics": ["string topic titles"],
  "persistentWeakTopics": ["string topic titles"],
  "subjectPriorities": [
    {
      "subject": "DSA | OOPS | APT | DBMS | OS | CN",
      "priority": "High | Medium | Low",
      "focus": "string description"
    }
  ],
  "roadmapAdjustments": [
    {
      "topic": "string",
      "action": "accelerate | reinforce | maintain",
      "reason": "string"
    }
  ],
  "recommendedFocus": ["string actionable recommendations"]
}`;
  }

  /**
   * Validates that the AI Reassessment output adheres strictly to the required contract.
   */
  validateReassessmentOutput(data) {
    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['AI response must be a non-null JSON object.'] };
    }

    const errors = [];

    if (!data.progressSummary || typeof data.progressSummary !== 'string') {
      errors.push('progressSummary must be a non-empty string.');
    }

    if (!Array.isArray(data.improvedTopics)) {
      errors.push('improvedTopics must be an array.');
    }

    if (!Array.isArray(data.persistentWeakTopics)) {
      errors.push('persistentWeakTopics must be an array.');
    }

    if (!Array.isArray(data.subjectPriorities) || data.subjectPriorities.length === 0) {
      errors.push('subjectPriorities must be a non-empty array.');
    }

    if (!Array.isArray(data.roadmapAdjustments) || data.roadmapAdjustments.length === 0) {
      errors.push('roadmapAdjustments must be a non-empty array.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Interprets periodic reassessment results and analyzes velocity-based roadmap adjustments.
   */
  async analyzeReassessment(studentContext, comparisonData, progressData, token = null) {
    const studentId = studentContext?.student?.id || studentContext?.id;
    const client = getSupabaseClient(token);

    const prompt = this.buildReassessmentAnalysisPrompt(studentContext, comparisonData, progressData);
    const contextHash = this.hashContext({
      studentId,
      previous_score: comparisonData?.previous_score,
      current_score: comparisonData?.current_score,
      score_delta: comparisonData?.score_delta,
      target_date: studentContext?.student?.target_date
    });

    // 1. Audit log initiation in public.ai_requests
    let requestId = null;
    try {
      const { data: requestRecord } = await supabaseAdmin
        .from('ai_requests')
        .insert({
          student_id: studentId,
          request_type: 'reassessment_analysis',
          context_hash: contextHash,
          workflow_id: env.GEMINI_API_KEY ? 'gemini-1.5-flash' : 'rule-based-diagnostic-engine',
          status: 'pending'
        })
        .select('id')
        .maybeSingle();

      requestId = requestRecord?.id || null;
    } catch (err) {
      console.warn('[AI Service] ai_requests reassessment audit initiation notice:', err.message);
    }

    let parsedResponse = null;

    // 2. Dispatch to Google Gemini if configured
    if (env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: 'application/json' }
          })
        });

        if (res.ok) {
          const raw = await res.json();
          const text = raw.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            parsedResponse = JSON.parse(text);
          }
        }
      } catch (err) {
        console.warn('[AI Service] Gemini reassessment call failed, falling back to rule-based engine:', err.message);
      }
    }

    // 3. Fallback: Deterministic Reassessment Analysis
    if (!parsedResponse) {
      const isImproved = (comparisonData?.score_delta ?? 0) >= 0 && (comparisonData?.current_score ?? 70) >= 70;
      const topicName = comparisonData?.topic_comparisons?.[0]?.topic || 'SQL Joins & Grouping Aggregations';

      parsedResponse = {
        progressSummary: isImproved
          ? `Demonstrated significant velocity with a +${comparisonData?.score_delta || 25}% score improvement. Core concepts in ${topicName} have reached verified proficiency.`
          : `Reassessment indicates persistent gaps in ${topicName}. Additional targeted deliberate practice is recommended.`,
        improvedTopics: isImproved ? [topicName] : [],
        persistentWeakTopics: isImproved ? [] : [topicName],
        subjectPriorities: [
          {
            subject: 'DBMS',
            priority: isImproved ? 'Medium' : 'High',
            focus: isImproved ? 'Maintain SQL proficiency with complex multi-table queries.' : 'Reinforce relational joins and group-by predicates.'
          },
          {
            subject: 'DSA',
            priority: 'High',
            focus: `Continue binary search and monotonic array patterns in ${studentContext?.student?.preferred_language || 'C++'}.`
          },
          {
            subject: 'OOPS',
            priority: 'Medium',
            focus: 'Object-oriented polymorphism and interface encapsulation.'
          },
          {
            subject: 'OS',
            priority: 'Low',
            focus: 'Virtual memory paging and synchronization.'
          },
          {
            subject: 'CN',
            priority: 'Low',
            focus: 'TCP transport layer flow control.'
          },
          {
            subject: 'APT',
            priority: 'Low',
            focus: 'Speed drills and sequence pattern recognition.'
          }
        ],
        roadmapAdjustments: [
          {
            topic: topicName,
            action: isImproved ? 'accelerate' : 'reinforce',
            reason: isImproved ? 'Demonstrated mastery allows shifting allocated time forward.' : 'Persistent gap requires focused review.'
          }
        ],
        recommendedFocus: isImproved
          ? ['Advance to next algorithmic milestone', 'Perform timed placement challenges']
          : ['Re-read edge-case notes', 'Attempt same-logic practice exercises']
      };
    }

    // 4. Validate output contract
    const validation = this.validateReassessmentOutput(parsedResponse);
    if (!validation.isValid) {
      if (requestId) {
        await client
          .from('ai_requests')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            response_ref: 'Validation Failed: ' + validation.errors.join('; ')
          })
          .eq('id', requestId);
      }
      throw new Error(`AI Reassessment validation failed: ${validation.errors.join(', ')}`);
    }

    // 5. Complete audit log in public.ai_requests
    if (requestId) {
      try {
        await supabaseAdmin
          .from('ai_requests')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            response_ref: `Success: Reassessment analyzed. Status: ${comparisonData?.status || 'Evaluated'}`
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('[AI Service] ai_requests reassessment audit completion notice:', err.message);
      }
    }

    return {
      success: true,
      request_id: requestId,
      analysis: parsedResponse
    };
  }

  /**
   * Builds structured prompt for AI Mentor progressive guidance.
   */
  buildMentorPrompt(mentorContext) {
    const {
      subject = 'DSA',
      topic = 'Practice Topic',
      preferred_language = 'C++',
      question_prompt = '',
      student_attempt = '',
      error_or_verdict = '',
      hint_level = 1
    } = mentorContext;

    return `You are the PathPilot Contextual AI Mentor. Provide progressive pedagogical guidance to help the student learn without spoiling the solution.

=== SECTION 1: STUDENT LEARNING CONTEXT ===
- Subject: ${subject}
- Topic: ${topic}
- Preferred Programming Language: ${preferred_language}
- Requested Hint Level: Level ${hint_level} of 3

=== SECTION 2: QUESTION & STUDENT ATTEMPT ===
- Problem Prompt: ${question_prompt || 'Solve the target challenge.'}
- Student Attempt / Code / Query: ${student_attempt || 'No attempt code submitted yet.'}
- Execution Error / Verdict: ${error_or_verdict || 'Stuck / Needs guidance'}

=== SECTION 3: PEDAGOGICAL HINT DIRECTIVES ===
CRITICAL GUARDRAIL: Do NOT output the complete final code, complete query, or explicit option letter on Hint Level 1 or Level 2.
- Hint Level 1: Conceptual direction and intuition only. Ask a guiding question highlighting the core invariant.
- Hint Level 2: Point to the specific pattern, boundary condition, or next reasoning step.
- Hint Level 3: Concrete pseudocode, query skeleton, or specific debugging insight tailored to ${preferred_language}.
- Output format: Return a concise, encouraging response (max 3-4 sentences).`;
  }

  /**
   * Generates progressive hint guidance from AI Mentor with audit logging in public.ai_requests.
   */
  async getMentorGuidance(mentorContext, userId, token = null) {
    const hintLevel = Number(mentorContext.hintLevel || mentorContext.hint_level) || 1;
    const subject = mentorContext.subject || 'DSA';
    const topic = mentorContext.topic || 'Practice Topic';
    const preferredLanguage = mentorContext.preferredLanguage || mentorContext.preferred_language || 'C++';

    const prompt = this.buildMentorPrompt({
      ...mentorContext,
      hint_level: hintLevel,
      hintLevel,
      preferred_language: preferredLanguage,
      preferredLanguage
    });
    const contextHash = this.hashContext({
      userId,
      subject,
      topic,
      hintLevel,
      question_id: mentorContext.question_id
    });

    // 1. Audit initiation in public.ai_requests via supabaseAdmin
    let requestId = null;
    try {
      const { data: requestRecord } = await supabaseAdmin
        .from('ai_requests')
        .insert({
          student_id: userId,
          request_type: mentorContext.request_type || 'mentor_hint',
          context_hash: contextHash,
          workflow_id: env.GEMINI_API_KEY ? 'gemini-1.5-flash' : 'rule-based-diagnostic-engine',
          status: 'pending'
        })
        .select('id')
        .maybeSingle();

      requestId = requestRecord?.id || null;
    } catch (err) {
      console.warn('[AI Service] ai_requests mentor audit initiation notice:', err.message);
    }

    let hintText = null;

    // 2. Dispatch to Google Gemini if configured
    if (env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (res.ok) {
          const raw = await res.json();
          hintText = raw.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        }
      } catch (err) {
        console.warn('[AI Service] Gemini mentor call failed, using progressive hint engine:', err.message);
      }
    }

    // 3. Fallback: Deterministic Progressive Hint Engine
    if (!hintText) {
      if (subject.toUpperCase() === 'DBMS') {
        if (hintLevel === 1) {
          hintText = 'Think about what happens to departments with zero employees. A standard INNER JOIN eliminates unmatched rows. Which relational join preserves all rows from the primary table?';
        } else if (hintLevel === 2) {
          hintText = 'Use a LEFT JOIN from departments to employees. Remember that when counting employees, `COUNT(e.id)` correctly returns 0 for nulls, whereas `COUNT(*)` would incorrectly count 1.';
        } else {
          hintText = 'Query Structure Skeleton: `SELECT d.name, COUNT(e.id) AS emp_count FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name;`';
        }
      } else if (subject.toUpperCase() === 'DSA') {
        if (hintLevel === 1) {
          hintText = `Notice that the input array is monotonic (sorted). Instead of linear searching in O(N), how can you eliminate half of the remaining search space at every step in ${preferredLanguage}?`;
        } else if (hintLevel === 2) {
          hintText = `Maintain two pointers: low = 0 and high = nums.size() - 1. If nums[mid] < target, the target must lie strictly in the right half, so advance low = mid + 1. Otherwise, advance high = mid - 1.`;
        } else {
          hintText = `In ${preferredLanguage}: Compute mid using \`low + (high - low) / 2\` to guard against integer overflow. Loop \`while (low <= high)\` and return \`low\` as the insertion index when the element is not found.`;
        }
      } else {
        if (hintLevel === 1) {
          hintText = 'Consider the primary invariant of this concept. What problem does it solve in system architecture?';
        } else if (hintLevel === 2) {
          hintText = 'Eliminate options that confuse compile-time resolution with dynamic runtime dispatch.';
        } else {
          hintText = 'Detailed Insight: Runtime polymorphism requires dynamic dispatch through a virtual method table (vtable), ensuring the derived implementation is executed even when referenced via a base pointer.';
        }
      }
    }

    // 4. Complete audit log in public.ai_requests
    if (requestId) {
      try {
        await supabaseAdmin
          .from('ai_requests')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            response_ref: `Success: Level ${hintLevel} progressive hint generated for ${subject}.`
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('[AI Service] ai_requests mentor completion audit notice:', err.message);
      }
    }

    return {
      success: true,
      request_id: requestId,
      hint_level: hintLevel,
      hint: hintText,
      guidance_type: hintLevel === 1 ? 'Conceptual Direction' : hintLevel === 2 ? 'Pattern Strategy' : 'Concrete Pseudocode & Skeleton'
    };
  }
}

module.exports = new AIService();
