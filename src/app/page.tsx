import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaymentForm from "@/components/payment-form";

export default function Home() {
  return (
    <div className="grid items-center justify-center p-2 md:px-32 md:py-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment with PayChangu</CardTitle>
          <CardDescription>
            Use this form to enter the details you need to use the level
            implementation of PayChangu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentForm />
        </CardContent>
      </Card>
    </div>
  );
}
