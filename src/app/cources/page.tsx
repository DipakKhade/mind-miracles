"use client";

import { Calendar, Clock, MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [quantity, setQuantity] = useState(0);
  const pricePerTicket = 280.0;
  const totalPrice = quantity * pricePerTicket;
  const currency = "INR";

  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId(pricePerTicket);
      const options = {
        key: process.env.key_id! || "",
        amount: totalPrice,
        currency: currency,
        name: "name",
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) alert("payment succeed");
          else {
            alert(res.message);
          }
        },
        prefill: {
          name: "Dipak Khade",
          email: "dipakhade214@gmail.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
      //@ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto p-6 space-y-8 ">
      {/* Event Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <Calendar className="text-white h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Event Date:</div>
              <div>December 6, 2024</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <Clock className="text-white h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Event Time:</div>
              <div>2:00 pm</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <MapPin className="text-white h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Event Location:
              </div>
              <div>Online</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Description */}
      <div className="space-y-6 bg-white/80 backdrop-blur rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          Addiction might not be the primary diagnosis for the clients you
          treat, but it often surfaces during therapy or clinic sessions. In
          this discussion, we explore how to support clients who exhibit signs
          of addiction.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Who Should Attend?</h2>
          <p className="text-gray-700">
            This webinar is designed for health and mental health practitioners
            interested in enhancing their understanding and approach to
            addiction-related concerns and practice predominantly with Hindi
            speaking communities.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Meet the experts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">R MANOJ SHARMA,</h3>
              <p className="text-gray-600">
                PROFESSOR AT THE DEPARTMENT OF CLINICAL PSYCHOLOGY, NIMHANS
              </p>
            </div>
            <div>
              <h3 className="font-semibold">MODERATED BY</h3>
              <p className="text-gray-600">DR ASHLESHA BAGADIA</p>
              <p className="text-gray-600">PSYCHIATRIST AND PSYCHOTHERAPIST</p>
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Register Now:</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket type:</TableHead>
                <TableHead>Ticket Qty:</TableHead>
                <TableHead>Per Ticket Price:</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Registration</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(0, quantity - 1))}
                      className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>₹{pricePerTicket.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 p-4 bg-green-400 rounded-lg flex justify-between items-center">
            <div>
              <p>Quantity: {quantity}</p>
              <p className="text-lg font-semibold">
                Total ₹{totalPrice.toFixed(2)}
              </p>
            </div>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-balck"
              disabled={quantity === 0}
              onClick={() => processPayment()}
            >
              Register
            </Button>
          </div>
        </div>

        {/* Event Schedule */}
        <Card className="mt-8 bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Event Schedule Details
            </h2>
            <p className="text-gray-700">December 6, 2024 2:00 pm - 3:30 pm</p>
          </CardContent>
        </Card>

        {/* Share Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Share This Event</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#c8e6d0] hover:bg-[#a5d4aa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const createOrderId = async (amount: any) => {
  try {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount) * 100,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};
