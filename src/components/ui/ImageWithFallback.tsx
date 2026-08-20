import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, label, className = '' }: ImageWithFallbackProps) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-100 text-center font-[var(--font-display)] font-bold text-brand-700 ${className}`}
      >
        {label}
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={() => setBroken(true)} />
  );
}
