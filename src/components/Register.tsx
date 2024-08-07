'use client';
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

export default function Register() {
    const {register , handleSubmit} = useForm();

    async function submitForm(data:any){
        console.log(data)
       try{
        const r = await fetch('/api/register',{
          method:"POST",
          body: JSON.stringify(data)
        })

        const response = await r.json()
        toast.success(response.message)
        console.log(response)
       }catch(e){
        toast.warning('try again')
       }
        return
        
    }
  return (
    <>
      <main className="w-[600px] h-[550px] border border-green-300 m-2 rounded-3xl bg-green-200">
        <div className="rounded-3xl">
          <div className="h-16 bg-gradient-to-r from-green-500 from-10% via-green-300 via-30% to-green-100 to-90% rounded-t-3xl flex justify-center align-middle pt-3">
            <p className="text-2xl">Register here</p>
          </div>
<form onSubmit={handleSubmit(submitForm)}>
          <div className="md:flex justify-between md:p-8 space-x-3 px-4">
            <div className="w-full">
              <p>First Name</p>
              <Input {...register('firstName')} placeholder="Enter first name" />
            </div>
            <div className="w-full">
              <p>Last Name</p>
              <Input {...register('lastName')} placeholder="Enter last name" />
            </div>
          </div>
          <div className="md:flex justify-between md:p-8 space-x-3">
            <div className="w-full">
              <p>Mobile Number</p>
              <Input {...register('mobileNo')} placeholder="Enter 10 digit mobile number" />
            </div>
            <div className="w-full">
              <p>Email ID</p>
              <Input {...register('email')} placeholder="Enter email ID" />
            </div>
          </div>
          <div className="md:flex justify-between md:p-8 space-x-3">
            <div className="w-full">
              <p>Age</p>
              <Input {...register('age')} placeholder="Enter you age" />
            </div>
            <div className="w-full">
              <p>Place</p>
              <Input {...register('place')} placeholder="Enter Place" />
            </div>
            </div>
            <div className="w-full flex justify-center rounded-3xl">
            <button type="submit" className="text-white bg-green-500 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
