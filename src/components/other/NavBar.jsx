import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo  from "/src/assets/logo.png";

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen px-4 md:px-8 lg:px-48 bg-[#FFF6F6] shadow-[0_2px_6px_rgba(0,0,0,0.06)] md:shadow-none transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center py-4 w-full max-w-[800px] mx-auto">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="JMB Design"
            className="w-8 h-8 transition-transform duration-200 hover:scale-105"
          />
        </Link>
        {/* Hamburger Toggle */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`absolute w-6 h-0.75 bg-indigo-800 rounded-sm transition-transform duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          ></span>
          <span
            className={`absolute w-6 h-0.75 bg-indigo-800 rounded-sm transition-transform duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          ></span>
        </button>

        {/* Desktop Menu */}
        <DesktopMenu handleNavClick={handleNavClick} />
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu handleNavClick={handleNavClick} />}
    </div>
  );
}

function DesktopMenu({ handleNavClick }) {
  return (
    <div className="hidden md:flex gap-4 ">
      {["work", "about", "experience", "contact"].map((id) => (
        <button
          key={id}
          onClick={() => handleNavClick(id)}
          className="text-h5 blue cursor-pointer relative transition-all duration-200 hover:bg-[var(--color-yellow)] hover:text-white px-1 box-decoration-clone"
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
    </div>
  );
}

function MobileMenu({ handleNavClick }) {
  return (
    <div className="md:hidden flex flex-col items-end pr-4 gap-2 pb-6 pt-4 bg-[#FFF6F6] ">
      {["work", "about", "experience", "contact"].map((id) => (
        <button
          key={id}
          onClick={() => handleNavClick(id)}
          className="text-h2 blue cursor-pointer"
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
    </div>
  );
}
