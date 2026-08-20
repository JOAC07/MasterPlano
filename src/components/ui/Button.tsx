import type { ComponentPropsWithoutRef, ElementType } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-brand-950 hover:bg-accent-400 shadow-lg shadow-accent-500/20',
  secondary:
    'bg-white text-brand-900 hover:bg-brand-50 border border-brand-100',
  ghost: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur',
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
