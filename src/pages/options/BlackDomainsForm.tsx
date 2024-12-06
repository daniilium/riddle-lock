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
  blackDomains: z.array(z.string()).min(1),
  newBlackDomain: z.string().url(),
})

export default function BlackDomainsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const blackDomains = await local.get('blackDomains')
      console.log('blackDomains', blackDomains)

      return {
        blackDomains: Object.keys(blackDomains) as string[],
        newBlackDomain: '',
      }
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit values', values)
  }

  async function handleRemoveDomain(domain: string) {
    const updateBlackDomains = form
      .getValues('blackDomains')
      .filter((item) => item !== domain)

    form.setValue('blackDomains', updateBlackDomains)

    // work with extension storage
    const storageBlackDomains = await local.get('blackDomains')
    delete storageBlackDomains[domain]
    await local.set('blackDomains', storageBlackDomains)
  }

  async function handleAddDomain() {
    const isValid = await form.trigger('newBlackDomain')
    if (!isValid) return

    const domain = form.getValues('newBlackDomain')
    const updateBlackDomains = [...form.getValues('blackDomains'), domain]

    form.setValue('blackDomains', updateBlackDomains)
    form.setValue('newBlackDomain', '')

    // work with extension storage
    const riddleCooldown = await local.get('RIDDLE_COOLDOWN')
    const storageBlackDomains = await local.get('blackDomains')
    storageBlackDomains[domain] = {
      lastAnsweredAt: new Date().getTime() - riddleCooldown,
      questionId: 0,
    }
    await local.set('blackDomains', storageBlackDomains)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="blackDomains"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel>Black Domains</FormLabel>
              {field.value?.map((domain) => (
                <div
                  className="flex justify-between items-center gap-2"
                  key={domain}
                >
                  <Input value={domain} disabled />

                  <Button
                    type="button"
                    onClick={() => handleRemoveDomain(domain)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="newBlackDomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Black Domain</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="http://example.com"
                    {...field}
                  />
                </FormControl>

                <Button type="button" onClick={handleAddDomain}>
                  Add
                </Button>
              </div>

              <FormDescription>Site starts with https://</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
