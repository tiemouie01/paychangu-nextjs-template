import { formSchema } from "./form-schemas";
import { z } from "zod";

// You can change the type of the data parameter to any type that will match the LevelData
// type defined in src/types/paychangu.ts

// I used this inferred type because I was using a React Hook Form to collect the data

export async function getCheckoutUrl(
  data: z.infer<typeof formSchema>,
): Promise<string> {
  const response = await fetch("https://api.paychangu.com/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  const checkoutUrl = JSON.parse(text).data.checkout_url;

  return checkoutUrl;
}
