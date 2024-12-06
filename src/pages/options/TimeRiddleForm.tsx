import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { local } from '@/lib/storage'

const formSchema = z.object({
  riddleCooldown: z.coerce.number().min(1, {
    message: 'Время должно быть не менее 1 минуты',
  }),
})

export default function TimeRiddleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const RIDDLE_COOLDOWN = await local.get('RIDDLE_COOLDOWN')

      const riddleCooldown = Math.floor(Number(RIDDLE_COOLDOWN) / 1000 / 60)

      return {
        riddleCooldown,
      }
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const riddleCooldown = values.riddleCooldown * 1000 * 60
    local.set('RIDDLE_COOLDOWN', riddleCooldown)

    // work with blackDomains
    const storageBlackDomains = await local.get('blackDomains')
    Object.entries(storageBlackDomains).map(([domain]) => {
      storageBlackDomains[domain].lastAnsweredAt =
        new Date().getTime() - riddleCooldown
    })
    await local.set('blackDomains', storageBlackDomains)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="riddleCooldown"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Время до загадки</FormLabel>

              <div className="flex gap-2">
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <Button type="submit">Submit</Button>
              </div>

              <FormDescription>Укажите время в минутах</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
