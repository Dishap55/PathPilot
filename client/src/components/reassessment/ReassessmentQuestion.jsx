import React from 'react';
import MCQQuestion from '../assessment/MCQQuestion';

export default function ReassessmentQuestion({ question, selectedOption, onSelect }) {
  return <MCQQuestion question={question} selectedOption={selectedOption} onSelect={onSelect} />;
}
