"use client";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import f1 from "../../public/footer-image-0.png";
import f2 from "../../public/footer-image-1.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Footer } from "./Footer";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, SetLoading] = useState<boolean>(false);
  async function submitForm(data: any) {
    SetLoading(true);
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const response = await r.json();
      SetLoading(false);
      toast.success(response.message,{
        description:'thanks for connecting'
      });
    } catch (e) {
      SetLoading(false);
      toast.warning("try again");
    }
    return;
  }
  return (
    <>
   
      <div id="contact" className="flex-none md:flex md:justify-around pt-12 md:pt-16 mt-12 md:mt-24 bg-[#B6ECD5] rounded-sm p-3">
        <div>
          <div className="pb-6">
            <h2 className="text-4xl md:text-6xl font-bold">CONTACT US</h2>
            <div className="pt-8">
              <span className="font-bold text-lg">Address 1: &nbsp;</span>{" "}
              <span className="font-medium">
                Pansare Dream City, MIDC, Jalochi Road, Baramati
              </span>
            </div>
            <div className="pt-8">
              <span className="font-bold text-lg">Contact No: &nbsp;</span>{" "}
              <span className="font-medium">+91-779-808-2219</span>
            </div>
            <div className="pt-8">
              <span className="font-bold text-lg">Email id: &nbsp;</span>{" "}
              <span className="font-medium">mindmiracles1707@gmail.com</span>
            </div>
          </div>
          <div className="flex text-3xl space-x-4 pb-12">
          <FaLinkedinIn />
          <IoLogoFacebook />
          <FaInstagram />
          <FaYoutube />
          <FaWhatsapp />
          </div>

          <FooterAnimationImages />
        </div>

        <div className="pr-4 ml-3">
          <form
            className="md:w-[600px] p-0"
            onSubmit={handleSubmit(submitForm)}
          >
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-green-700 rounded-md hover:bg-green-700 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
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
            <div className="mt-5 bg-white rounded-lg shadow">
              <div className="px-5 pb-5">
                <div className="pt-2 pb-4">
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      {...register("firstName")}
                      placeholder="Enter first name"
                      type="text"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                  <div className="w-full">
                    <p>Last Name</p>
                    <input
                      {...register("lastName")}
                      placeholder="Enter last name"
                      type="text"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="w-full">
                    <p>Mobile Number</p>
                    <input
                      {...register("mobileNo")}
                      type="number"
                      placeholder="Enter 10 digit mobile number"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                  <div className="w-full">
                    <p>Email ID</p>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter email ID"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="w-full">
                    <p>Age</p>
                    <input
                      {...register("age")}
                      type="number"
                      placeholder="Enter your age"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                  <div className="w-full">
                    <p>Place</p>
                    <input
                      {...register("place")}
                      placeholder="Enter Place"
                      type="text"
                      className="text-black placeholder-green-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-green-200 focus:border-bluegreen-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-green-400"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center rounded-3xl">
                {loading ? (
                  <button
                    type="submit"
                    className="text-white bg-green-500 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-green-700 w-36 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

      </div>

    </>
  );
}

function FooterAnimationImages() {
  return (
    <>
      <div className="hidden md:block">
        {/* larg screen */}
        <div style={{ position: "relative", width: "400px", height: "400px" }}>
          <Image src={f1} alt="" width={400} height={400} />
          <motion.div
            style={{ position: "absolute", top: 42, left: 32 }}
            animate={{
              y: [0, -20, 0], // Moves the image up by 20px and back
            }}
            transition={{
              duration: 8, // 10 seconds for one complete cycle
              ease: "easeInOut",
              repeat: Infinity, // Repeats the animation infinitely
            }}
          >
            <Image src={f2} alt="" width={300} height={300} />
          </motion.div>
        </div>
      </div>

      <div className="md:hidden">
        {/* mobile */}
        <div style={{ position: "relative", width: "300px", height: "300px" }}>
          <Image src={f1} alt="" width={400} height={400} />
          <motion.div
            style={{ position: "absolute", top: 56, left: 40 }}
            animate={{
              y: [0, -20, 0], // Moves the image up by 20px and back
            }}
            transition={{
              duration: 8, // 10 seconds for one complete cycle
              ease: "easeInOut",
              repeat: Infinity, // Repeats the animation infinitely
            }}
          >
            <Image src={f2} alt="" width={200} height={200} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
