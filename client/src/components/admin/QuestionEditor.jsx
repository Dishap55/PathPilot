import React, { useState } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';

export default function QuestionEditor({ onSave }) {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('coding');
  const [level, setLevel] = useState('beginner');

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
      <h4 className="text-sm font-bold text-slate-800">Add Question to Question Bank</h4>
      <Textarea label="Question Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Type" options={['mcq', 'coding', 'sql']} value={type} onChange={e => setType(e.target.value)} />
        <Select label="Level" options={['beginner', 'intermediate', 'professional']} value={level} onChange={e => setLevel(e.target.value)} />
      </div>
      <Button size="sm" onClick={() => onSave?.({ prompt, type, level })}>Save Question</Button>
    </div>
  );
}
