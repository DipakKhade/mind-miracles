import Image from "next/image";
import logo from "../../public/mind_miracles_logo.png";
import React from "react";

export default function Hero() {
  return (
    <>
      <main className="min-h-[420px] md:flex">
        <div className="flex justify-center ">
          <div>
            <Image
              alt="mindmiracles"
              src={logo}
              className="w-60 h-60 md:w-[700px] md:h-[450px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle">
          <div className="text-2xl md:text-4xl p-12 font-semibold text-center">
            <p className="font-mono">
              We are the healing hand you&apos;ve always yearned for but
              couldn&apos;t catch!
            </p>
          </div>
          <div className="flex justify-end text-2xl font-bold p-2">
            <p>~Mind Miracles</p>
          </div>
        </div>
      </main>
    </>
  );
}
