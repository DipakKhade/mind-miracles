import Link from "next/link";
export default function Appbar() {
  return (
    <>
      <nav className="">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link href={'/'}>
            <span className="text-black text-xl">Mindmiracles</span>
          </Link>

          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute top-5 right-7 cursor-pointer md:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col font-medium items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="md:mr-12 hover:text-green-600">
                <a href="/#">Home</a>
              </li>
              <li className="md:mr-12 hover:text-green-600">
                <a href="/#about">About</a>
              </li>
              <li className="md:mr-12 hover:text-green-600">
                <a href="/#">Our Work</a>
              </li>
              <li className="md:mr-12 hover:text-green-600">
                <Link href="/cources">Cources</Link>
              </li>

              <li className="md:mr-12 hover:text-green-600">
                <a href="/#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}
