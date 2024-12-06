import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyP(props: Props) {
  return <p className={cn('leading-7', props.className)}>{props.children}</p>
}
