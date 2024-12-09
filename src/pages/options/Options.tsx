import { Separator } from '@/components/ui/separator'
import TimeRiddleForm from './TimeRiddleForm'
import BlackDomainsForm from './BlackDomainsForm'

export default function Options(): JSX.Element {
  return (
    <div className="bg-zinc-200 flex items-center justify-center min-h-screen">
      <div className="bg-white w-full max-w-2xl border border-gray-300 rounded-lg shadow-md p-6">
        <TimeRiddleForm />

        <Separator className="my-4" />

        <BlackDomainsForm />
      </div>
    </div>
  )
}
