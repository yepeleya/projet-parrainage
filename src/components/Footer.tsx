import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 text-gray-600 flex items-center justify-center gap-1">
      developed with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by{' '}
      <span className="font-medium">Tenena</span> and{' '}
      <span className="font-medium">baby desiigner</span>
    </footer>
  );
};