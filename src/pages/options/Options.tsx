import { Separator } from '@/components/ui/separator'
import TimeRiddleForm from './TimeRiddleForm'
import BlackDomainsForm from './BlackDomainsForm'

export default function Options(): JSX.Element {
  return (
    <div className="p-6 max-w-xl">
      <TimeRiddleForm />

      <Separator className="my-4" />

      <BlackDomainsForm />
    </div>
  )
}
