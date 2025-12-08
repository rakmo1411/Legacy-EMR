import React from 'react';

interface LegacyHeaderProps {
  title: string;
}

export const LegacyHeader: React.FC<LegacyHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#3c8dbc] text-white px-4 py-3 rounded-t flex justify-between items-center shadow-sm">
      <span className="font-semibold text-lg tracking-wide">{title}</span>
      <div className="flex gap-2">
        {/* Simple window controls simulation, modern flat style */}
        <span className="opacity-50 cursor-pointer hover:opacity-100">_</span>
        <span className="opacity-50 cursor-pointer hover:opacity-100">✕</span>
      </div>
    </div>
  );
};