"use server";

import { formSchema } from "@/lib/form-schemas";
import { LevelData } from "@/types/paychangu";
import { redirect } from "next/navigation";
import { z } from "zod";

// You can change the type of the data parameter to any type that will match the LevelData
// type defined in src/types/paychangu.ts

// The inferred type is used here because this implementation used a React Hook Form

export async function checkout(values: z.infer<typeof formSchema>) {
  // Generate a random transaction reference to be used to identify the transaction.
  // Store in db to be used to verify the transaction later.
  const tx_ref = crypto.randomUUID();

  // Clean data to match the Level Config requirements
  const data: LevelData = {
    amount: values.amount,
    currency: values.currency,
    email: values.email,
    first_name: values.firstname,
    last_name: values.lastname,
    callback_url: values.callbackUrl,
    return_url: values.returnUrl,
    tx_ref,
  };

  // Send a fetch request to the PayChangu API using your secret key and the data
  const response = await fetch(`${process.env.CHECKOUT_URL!}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
    },
    body: JSON.stringify(data),
  });

  // Get the checkout URL from the response and redirect to it
  const text = await response.text();
  const checkoutUrl = JSON.parse(text).data.checkout_url;

  redirect(checkoutUrl);
}
