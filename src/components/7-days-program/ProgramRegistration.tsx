'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"
import { PayAndRegisterButton } from "./PayAndRegisterButton";

export const ProgramRegistration  = () =>{
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