import React from 'react';
import MCQQuestion from './MCQQuestion';
import CodingQuestion from './CodingQuestion';
import SQLQuestion from './SQLQuestion';

export default function QuestionRenderer({ question, answer, onAnswerChange, preferredLanguage }) {
  if (!question) return null;

  switch (question.type) {
    case 'coding':
      return (
        <CodingQuestion
          question={question}
          code={answer}
          onChange={onAnswerChange}
          preferredLanguage={preferredLanguage}
        />
      );
    case 'sql':
      return (
        <SQLQuestion
          question={question}
          query={answer}
          onChange={onAnswerChange}
        />
      );
    case 'mcq':
    default:
      return (
        <MCQQuestion
          question={question}
          selectedOption={answer}
          onSelect={onAnswerChange}
        />
      );
  }
}
