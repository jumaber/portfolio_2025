import { useEffect, useState } from "react";

export function NavBar() {
  const [show, setShow] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShow(true);
      } else {
        setShow(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-row justify-between md:justify-end p-4 md:px-8 lg:px-16">
        <a href="#work" className="text-h5 p-2 blue">
          Work
        </a>
        <a href="#about" className="text-h5 p-2 blue">
          About
        </a>
        <a href="#experience" className="text-h5 p-2 blue">
          Experience
        </a>
        <a href="#contact" className="text-h5 p-2 blue">
          Contact
        </a>
      </div>
    </div>
  );
}
