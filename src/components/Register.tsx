"use client";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();

  async function submitForm(data: any) {
    console.log(data);
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const response = await r.json();
      toast.success(response.message);
      console.log(response);
    } catch (e) {
      toast.warning("try again");
    }
    return;
  }
  return (
    <>
      {/* <main className="w-[600px] h-[550px] border border-green-300 m-2 rounded-3xl bg-green-200">
        <div className="rounded-3xl">
          <div className="h-16 bg-gradient-to-r from-green-500 from-10% via-green-300 via-30% to-green-100 to-90% rounded-t-3xl flex justify-center align-middle pt-3">
            <p className="text-2xl">Register here</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="md:flex justify-between md:p-8 space-x-3 px-4">
              <div className="w-full">
                <p>First Name</p>
                <Input
                  {...register("firstName")}
                  placeholder="Enter first name"
                />
              </div>
              <div className="w-full">
                <p>Last Name</p>
                <Input
                  {...register("lastName")}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="md:flex justify-between md:p-8 space-x-3">
              <div className="w-full">
                <p>Mobile Number</p>
                <Input
                  {...register("mobileNo")}
                  placeholder="Enter 10 digit mobile number"
                />
              </div>
              <div className="w-full">
                <p>Email ID</p>
                <Input {...register("email")} placeholder="Enter email ID" />
              </div>
            </div>
            <div className="md:flex justify-between md:p-8 space-x-3">
              <div className="w-full">
                <p>Age</p>
                <Input {...register("age")} placeholder="Enter you age" />
              </div>
              <div className="w-full">
                <p>Place</p>
                <Input {...register("place")} placeholder="Enter Place" />
              </div>
            </div>
            <div className="w-full flex justify-center rounded-3xl">
              <button
                type="submit"
                className="text-white bg-green-500 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main> */}

<div className="flex h-screen bg-gray-100">
   <div className="m-auto">
      <div>
         <button type="button" className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-green-500 rounded-md hover:bg-green-700 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
               <g>
                  <rect fill="none" height="24" width="24"></rect>
               </g>
               <g>
                  <g>
                     <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
               </g>
            </svg>
            <span className="pl-2 mx-1">Register here</span>
         </button>

         <form onSubmit={handleSubmit(submitForm)}>
         <div className="mt-5 bg-white rounded-lg shadow">
       
            <div className="px-5 pb-5">
               <div className="md:flex justify-between md:p-8 space-x-3 px-4">
                  <div className="w-full">
                     <p>First Name</p>
                     <input  {...register("firstName")} placeholder="Enter first name" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"/>
                  </div>
                  <div className="w-full">
                     <p>Last Name</p>
                     <input {...register("lastName")} placeholder="Enter last name" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"/>
                  </div>
               </div>
               <div className="md:flex justify-between md:p-8 space-x-3">
                  <div className="w-full">
                     <p>Mobile Number</p>
                     <input  {...register("mobileNo")} placeholder="Enter 10 digit mobile number" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"/>
                  </div>
                  <div className="w-full">
                     <p>Email ID</p>
                     <input {...register("email")} placeholder="Enter email ID" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                  </div>
               </div>
               <div className="md:flex justify-between md:p-8 space-x-3">
                  <div className="w-full">
                     <p>Age</p>
                     <input {...register("age")} placeholder="Enter your age" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"/>
                  </div>
                  <div className="w-full">
                     <p>Place</p>
                     <input {...register("place")} placeholder="Enter Place" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"/>
                  </div>
               </div>
              
            </div>
           
            <div className="w-full flex justify-center rounded-3xl">
              <button
                type="submit"
                className="text-white bg-green-500 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Submit
              </button>
            </div>
         </div>
         </form>
      </div>
   </div>
</div>

    </>
  );
}
