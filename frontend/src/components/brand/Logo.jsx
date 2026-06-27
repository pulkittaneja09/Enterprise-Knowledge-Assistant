import { cn } from '@/utils/cn'

export function LogoMark({ className, size = 'md' }) {
  const sizes = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-14 w-14',
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center',
        sizes[size],
        className
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-full w-full"
        aria-hidden
      >
        <rect x="4" y="4" width="13" height="13" rx="3" fill="#3b82f6" opacity="0.95" />
        <rect x="13" y="13" width="13" height="13" rx="3" fill="#3b82f6" opacity="0.45" />
        <circle cx="25" cy="7" r="4" fill="#60a5fa" opacity="0.8" />
        <rect x="4" y="20" width="7" height="7" rx="2" fill="#60a5fa" opacity="0.25" />
      </svg>
    </div>
  )
}

export function Logo({ showTagline = false, size = 'md', className }) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-[15px]',
    lg: 'text-lg',
    xl: 'text-2xl',
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      <div className="min-w-0">
        <p className={cn('font-display font-semibold tracking-tight text-[#ececee]', textSizes[size])}>
          KnowledgeHub <span className="text-[#8b8b96] font-medium">AI</span>
        </p>
        {showTagline && (
          <p className="text-[11px] text-[#5c5c66] leading-snug mt-0.5 truncate">
            Enterprise Document Intelligence
          </p>
        )}
      </div>
    </div>
  )
}
