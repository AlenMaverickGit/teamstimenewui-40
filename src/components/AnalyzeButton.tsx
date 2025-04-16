
import React from 'react';
import { Loader2 } from 'lucide-react';

interface AnalyzeButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const AnalyzeButton = ({ onClick, isLoading, disabled }: AnalyzeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative px-8 py-3 text-lg font-medium text-white 
        rounded-lg transition-all duration-300 
        bg-gradient-to-r from-primary to-[#8b5cf6]
        hover:from-primary-hover hover:to-[#7c3aed]
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        animate-scale-in
      `}
    >
      <span className={`${isLoading ? 'invisible' : ''}`}>
        Analyze Now
      </span>
      {isLoading && (
        <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-spin" />
      )}
    </button>
  );
};

export default AnalyzeButton;
