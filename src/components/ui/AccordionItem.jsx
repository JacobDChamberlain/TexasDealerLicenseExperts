import { useState } from 'react';

export default function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-gray-800 font-bold hover:text-blue-700 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="ml-4 shrink-0 text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pb-4 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}
