"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema definition with zod
const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  currency: z.enum(["MWK", "USD"], {
    message: "Please select a valid currency.",
  }),
  amount: z.number().int().positive({
    message: "Please enter a valid amount.",
  }),
  callbackUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  returnUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

export default function PaymentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      amount: 50,
      currency: "MWK",
      callbackUrl: "",
      returnUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="space-y-8">
          {/* Currency */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MWK">Malawi Kwacha (MWK)</SelectItem>
                    <SelectItem value="USD">US Dollars ($)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Set the currency for the payment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Firstname */}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Timothy" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Lastname */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Miamba" {...field} />
                </FormControl>
                <FormDescription>Your lastname name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="timal0361@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-8">
          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="50" {...field} />
                </FormControl>
                <FormDescription>
                  The amount you&apos;d like to pay.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Callback URL */}
          <FormField
            control={form.control}
            name="callbackUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Callback URL</FormLabel>
                <FormControl>
                  <Input placeholder="timmy@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  The url PayChangu will send feedback to when a transaction is
                  complete. You can use{" "}
                  <a
                    href="https://webhook.site/"
                    className="text-red-500 underline"
                  >
                    webhook.site
                  </a>{" "}
                  for testing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Return URL */}
          <FormField
            control={form.control}
            name="returnUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return URL</FormLabel>
                <FormControl>
                  <Input placeholder="timmy@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  The URL paychangu will redirect to after a transaction is
                  complete. Note that a flaw in the implementation makes it so
                  that the callback URL acts aslo as the return URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="md:col-span-2"
          disabled={form.formState.isSubmitting}
        >
          Get Checkout URL
        </Button>
      </form>
    </Form>
  );
}