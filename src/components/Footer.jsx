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
          className="text-h5 p-2 blue transition-all duration-200 ease-in-out hover:shadow-[8px_8px_0_0_var(--color-pink)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          Imprint
        </NavLink>
      </div>
    </>
  );
}
