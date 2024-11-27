# PayChangu Integration Template for Next.js

This template provides a starting point for integrating [PayChangu](https://paychangu.com/), a payment gateway platform for Malawi, into a Next.js project. It includes essential functionalities such as checkout(), verifyTransaction(), and a finalize payment API route to handle webhook responses from PayChangu upon transaction completion.

## Table of Contents

- Getting Started
  - Prerequisites
  - Installation
- Usage
  - Environment Variables
  - Checkout Function
  - Verify Transaction Function
  - Finalize Payment API Route
- Important Notes
- License

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- [PayChangu Merchant Account](https://paychangu.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://git@github.com:tiemouie01/paychangu-nextjs-template.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd paychangu-nextjs-template
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

### Environment Variables

Create a `.env.local` file in the root of your project and add your PayChangu secret key:

```bash
PAYCHANGU_SECRET_KEY=your_paychangu_secret_key
```

> **Note:** Replace `your_paychangu_secret_key` with your actual PayChangu secret key.

### Checkout Function

The checkout() function initiates a payment by sending a request to PayChangu's Level API and redirects the user to the checkout URL.

**Location:** actions.ts

**Function Signature:**

```typescript
export async function checkout(values: z.infer<typeof formSchema>);
```

**Usage:**

1. **Import the function in your component or page:**

   ```typescript
   import { checkout } from "@/app/actions";
   ```

2. **Call the function with the required payment details:**

   ```typescript
   const paymentDetails = {
     firstname: "John",
     lastname: "Doe",
     email: "john.doe@example.com",
     amount: 100,
     currency: "MWK",
     callbackUrl: "https://yourdomain.com/api/finalize-payment",
     returnUrl: "https://yourdomain.com/payment-success",
   };

   await checkout(paymentDetails);
   ```

**Explanation:**

- Generates a unique transaction reference (tx_ref).

- Prepares the payment data in the format required by PayChangu.
- Makes a POST request to `https://api.paychangu.com/payment` with the payment details.
- Redirects the user to the PayChangu checkout URL.

### Verify Transaction Function

The verifyTransaction() function checks the status of a transaction using the tx_ref.

**Location:** payment-helpers.ts

**Function Signature:**

```typescript
export async function verifyTransaction(tx_ref: string): Promise<string>;
```

**Usage:**

1. **Import the function where you need to verify the transaction:**

   ```typescript
   import { verifyTransaction } from "@/lib/payment-helpers";
   ```

2. **Call the function with the transaction reference:**

   ```typescript
   const status = await verifyTransaction(tx_ref);
   ```

**Explanation:**

- Sends a GET request to `https://api.paychangu.com/verify-payment/${tx_ref}`.
- Parses the response and retrieves the transaction status.
- Returns the status (e.g., `"success"`, `"failed"`).

### Finalize Payment API Route

The finalize payment API route handles webhook callbacks from PayChangu after a transaction is completed.

**Location:** route.ts

**Function Handlers:**

- GET: Redirects to the home page or any desired page.
- POST: Processes the webhook payload.

**Usage:**

1. \*\*Set the callbackUrl in your checkout data to point to this route:\*\*

```typescript
callback_url: "https://yourdomain.com/api/finalize-payment",
```

2. **Implement the route handlers:**

   ```typescript
   import { redirect } from "next/navigation";
   import type { LevelCallbackPayload } from "@/types/paychangu";
   import { verifyTransaction } from "@/lib/payment-helpers";

   export async function GET() {
     redirect("/");
   }

   export async function POST(request: Request) {
     try {
       const payload: LevelCallbackPayload = await request.json();

       // Verify the transaction
       const verifiedStatus = await verifyTransaction(payload.tx_ref);
       if (verifiedStatus !== "success") {
         return new Response("Transaction verification failed", {
           status: 400,
         });
       }

       // Handle successful transaction (e.g., update order status, notify user)
       return new Response("Transaction verified successfully", {
         status: 200,
       });
     } catch (error) {
       return new Response(`Webhook error: ${error}`, { status: 400 });
     }
   }
   ```

**Explanation:**

- **GET Handler:**

  - Redirects to the home page or a specified URL when accessed via a browser.

- **POST Handler:**

  - Parses the webhook payload sent by PayChangu.
  - Verifies the transaction using verifyTransaction() to ensure it's legitimate.

- Upon successful verification, processes the transaction (e.g., update database records).
- Returns appropriate HTTP responses based on the outcome.

### Important Notes

- Ensure that your server is accessible over HTTPS when testing webhooks locally. Tools like [ngrok](https://ngrok.com/) can help expose your local server to the internet securely.
- Store the tx_ref in your database if you need to keep track of transactions for future reference.
- Always verify transactions on your server side to prevent fraudulent activities.

For more information on integrating with PayChangu, refer to the [official documentation](https://paychangu.readme.io).
