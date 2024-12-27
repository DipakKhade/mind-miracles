'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Script from 'next/script'
import { toast } from 'sonner'
// import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f7f5]">
     <Hero/>
      <ProgramInfo/>
      <VideoPreview videolink='https://www.youtube.com/embed/v0cTo4eGAOM?si=ADoHRITZoxuHZAxK'/>
      <FeeInfo/>
    <ProgramRegistration/>
    
    </div>
  )
}

const Hero =() =>{
  return <>
   <section className="bg-green-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            7 Days Life Changing Program
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Transform your life with our comprehensive program designed to help you achieve your full potential
          </p>
        </div>
      </section>
  </>
}

const ProgramInfo = () =>{
  return <>
  <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>About the Program</CardTitle>
              <CardDescription>What you'll learn in 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our intensive 7-day program is designed to help you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Develop powerful mindset strategies</li>
                <li>Create lasting positive habits</li>
                <li>Master emotional intelligence</li>
                <li>Build effective communication skills</li>
                <li>Learn stress management techniques</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
  </>
}
// https://www.youtube.com/watch?v=v0cTo4eGAOM
const VideoPreview = ({videolink}:{
  videolink:string
}) =>{
  return <>
  <section className="py-16 px-4 bg-green-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Program Preview</h2>
          <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
            {/* <iframe
              width="100%"
              height="100%"
              src={videolink}
              title="Program Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            /> */}
            <iframe  width="100%" height="100%" src={videolink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </section>
  </>
}

const FeeInfo =() =>{
  return <>
   <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-green-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Program Fee</CardTitle>
              <CardDescription className="text-white/90">
                Investment in your future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-white mb-4">₹1,499</div>
              <p className="text-white/90">
                One-time payment for complete program access
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
  </>
}

const ProgramRegistration  = () =>{
  const [name , SetName] = useState<string>();
  const [email , SetEmail] = useState<string>();
  const [whatsapp, SetWhatsapp] = useState<any>();
  const [age,SetAge] = useState<any>();
  
  return <>
   
    <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Register Now</CardTitle>
              <CardDescription>
                Fill in your details to join the program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    onChange={(e) => SetName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    onChange={(e) => SetEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    type="number"
                    required
                    onChange={(e) => SetWhatsapp(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    onChange={(e) => SetAge(e.target.value)}
                  />
                </div>
                <PayAndRegisterButton name={name!} age={age} email={email!} whatsapp={whatsapp} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
  </>
}


const PayAndRegisterButton = ({name,email,whatsapp,age}:{
  name:string,
  email:string,
  whatsapp:number,
  age:number
}) =>{

  // const [amount, setAmount] = useState<number>(1499);
  useEffect(()=>{
    // console.log({name,email,whatsapp,age})
  },[name,email,whatsapp,age])
  const amountToPay = 1499 * 100;

  const createOrder = async () => {
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: amountToPay }),
    });
    const data = await res.json();
    const paymentData = {
      key: process.env.key_id,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
        const res = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        if (data.isOk) {
          toast('Registration successfull')
          const response = await fetch(`/api/purchase`,{
            method:"POST",
            body:JSON.stringify({
              name,
              email,
              whatsapp,
              age,
              amountToPay
            })
          })
          const res = await response.json();
          if(res.id){
            toast.success('added to database')
          }else{
            toast.error(`Please Contact to Adminstrator`)
          }
        } else {
          alert("Payment failed");
        }
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };

  return <>
  <Script 
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    <Button onClick={createOrder} type="submit" className="w-full bg-green-700 hover:bg-[#3a5a40]">
                      Pay And Register
    </Button>

  </>
}