import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="flex flex-row justify-center p-4 md:px-8 lg:px-16 w-screen bg-[var(--color-cream)] ">
        <NavLink to="/imprint" className="text-h5 p-2 blue">
          Imprint
        </NavLink>
        <NavLink to="/" className="text-h5 p-2 blue">
          Log in
        </NavLink>
        <div className="text-h5 p-2 blue">
          © 2025 Júlia. All rights reserved.
        </div>
      </div>
    </>
  );
}
