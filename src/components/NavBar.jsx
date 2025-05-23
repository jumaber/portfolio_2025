import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <div className="flex flex-row justify-between md:justify-end p-4 md:px-8 lg:px-16 w-screen">
      <NavLink className="text-h5 p-2 blue">Work</NavLink>
      <NavLink className="text-h5 p-2 blue">About</NavLink>
      <NavLink className="text-h5 p-2 blue">Experience</NavLink>
      <NavLink className="text-h5 p-2 blue">Contact</NavLink>
    </div>
  );
}
