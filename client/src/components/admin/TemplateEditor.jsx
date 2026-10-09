import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export default function TemplateEditor({ onSave }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('DSA');
  const [level, setLevel] = useState('beginner');

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
      <h4 className="text-sm font-bold text-slate-800">Create Assessment Template</h4>
      <Input label="Template Title" value={name} onChange={e => setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Subject" options={['DSA', 'DBMS', 'OOPS', 'APT', 'OS', 'CN']} value={subject} onChange={e => setSubject(e.target.value)} />
        <Select label="Level" options={['beginner', 'intermediate', 'professional']} value={level} onChange={e => setLevel(e.target.value)} />
      </div>
      <Button size="sm" onClick={() => onSave?.({ name, subject, level })}>Save Template</Button>
    </div>
  );
}
