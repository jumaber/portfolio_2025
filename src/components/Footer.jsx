import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-center md:px-6 lg:px-16 w-full bg-[var(--color-cream)] ">
        <div className="text-h5 p-2 blue">
          © 2025 Júlia. All rights reserved.
        </div>
        <NavLink to="/imprint" className="text-h5 p-2 blue">
          Imprint
        </NavLink>
        <NavLink to="/" className="text-h5 p-2 blue">
          Log in
        </NavLink>
      </div>
    </>
  );
}
