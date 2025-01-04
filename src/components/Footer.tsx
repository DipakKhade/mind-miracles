import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="h-24 bg-[#B6ECD5]">
        <div className="h-16 md:h-10 md:flex p-2 justify-around bg-gradient-to-r from-[#B6ECD5] to-green-500 rounded-md">
          <div className="md:pt-1 text-sm md:pr-48 indent-6">
            <span className="mt-1">&copy;</span> <span className="font-semibold">
              <Link href={'/admin'}>
                2024 Mind Miracles
              </Link>
            </span> - All rights
            reserved
          </div>
          <div className="md:pt-1 text-sm indent-16">
            Developed by{" "}
            <span>
              <a href="https://github.com/DipakKhade/" target="_blank">
                Dipak Khade
              </a>{" "}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
