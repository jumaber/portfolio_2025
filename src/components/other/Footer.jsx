import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-2 md:gap-x-10 py-4 md:px-6 lg:px-16 w-full bg-[var(--color-cream)]">
        <div className="text-h5 p-2 blue">
          © 2025 Júlia Marí Bernaus. All rights reserved.
        </div>
        <NavLink
          to="/imprint"
          aria-label="Imprint page"
          className="text-h5 blue cursor-pointer relative transition-all duration-200 hover:bg-[var(--color-yellow)] hover:text-white px-1 box-decoration-clone"
        >
          Imprint
        </NavLink>
      </div>
    </>
  );
}
