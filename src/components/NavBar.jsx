export function NavBar() {
  return (
    <div id="navbar" className="fixed top-0 left-0 z-50 w-full bg-white transition-transform duration-300">
      <div className="flex flex-row justify-between md:justify-end p-4 md:px-8 lg:px-16">
        <a href="#work" className="text-h5 p-2 blue">Work</a>
        <a href="#about" className="text-h5 p-2 blue">About</a>
        <a href="#experience" className="text-h5 p-2 blue">Experience</a>
        <a href="#contact" className="text-h5 p-2 blue">Contact</a>
      </div>
    </div>
  );
}
