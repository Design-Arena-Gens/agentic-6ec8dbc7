import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        'h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white shadow-inner shadow-black/20 transition focus-visible:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/40',
        'bg-[url("data:image/svg+xml,%3Csvg%20fill%3D%22white%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2216%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[position:calc(100%-0.9rem)_center] bg-no-repeat pr-10',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
