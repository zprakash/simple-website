const sections = [
    { id: "home", title: "Home" },
    { id: "about", title: "About" },
    { id: "services", title: "Services" },
    { id: "contact", title: "Contact" },
  ];
  
  const Navbar = () => (
    <nav>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="hover:underline">
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
  
  export default Navbar;
  