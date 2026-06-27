import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/utils/cn'

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative h-1 w-full overflow-hidden rounded-full bg-[#1a1a1e]',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-blue-500 transition-all duration-300 ease-out rounded-full"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
