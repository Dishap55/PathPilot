import React from 'react';
import Select from '../common/Select';

export default function LanguageSelector({ language = 'javascript', onChange }) {
  return (
    <Select
      options={['javascript', 'python', 'cpp', 'java']}
      value={language}
      onChange={e => onChange(e.target.value)}
      className="w-36 text-xs"
    />
  );
}
