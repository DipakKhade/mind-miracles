import { Input } from "./ui/input";

export default function Contact() {
  return (
    <>
      <main className="w-[600px] h-[550px] border border-green-300 m-2 rounded-3xl bg-green-200">
        <div className="rounded-3xl">
          <div className="h-16 bg-gradient-to-r from-green-500 from-10% via-green-300 via-30% to-green-100 to-90% rounded-t-3xl flex justify-center align-middle pt-3">
            <p className="text-2xl">Request a callback</p>
          </div>
<div>
          <div className="md:flex justify-between md:p-8 space-x-3 px-4">
            <div className="w-full">
              <p>First Name</p>
              <Input placeholder="Enter first name" />
            </div>
            <div className="w-full">
              <p>Last Name</p>
              <Input placeholder="Enter last name" />
            </div>
          </div>
          <div className="md:flex justify-between md:p-8 space-x-3">
            <div className="w-full">
              <p>Mobile Number</p>
              <Input placeholder="Enter 10 digit mobile number" />
            </div>
            <div className="w-full">
              <p>Email ID</p>
              <Input placeholder="Enter email ID" />
            </div>
          </div>
          <div className="md:flex justify-between md:p-8 space-x-3">
            <div className="w-full">
              <p>Age</p>
              <Input placeholder="Enter you age" />
            </div>
            <div className="w-full">
              <p>Subject</p>
              <Input placeholder="Enter subject" />
            </div>
            </div>
            <div className="w-full flex justify-center rounded-3xl">
            <button type="button" className="text-white bg-green-500 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
