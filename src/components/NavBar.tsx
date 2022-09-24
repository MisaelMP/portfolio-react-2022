import navbarItems from "../data/navbarItems.json";
import NavBarStyled from "../styles/elements/navbar";
import { useEffect, useState } from "react";

interface NavItemProps {
  title: string;
  href: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Navbar() {
  const mediaQuery: string = "(min-width: 768px)";
  const mediaQueryMatch = window.matchMedia(mediaQuery);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleClassByMediaQuery = (event: { matches: any }) => {
      const isMobile = event.matches;

      return setIsMobile(isMobile);
    };
    mediaQueryMatch.addEventListener("change", handleClassByMediaQuery);

    return () => {
      mediaQueryMatch.removeEventListener("change", handleClassByMediaQuery);
    };
  }, [isMobile, mediaQueryMatch]);
  return (
    <NavBarStyled className={`${isMobile ? 'w-3/4' : 'w-full'}`}>
      <ul>
        {navbarItems &&
          navbarItems?.map((item: NavItemProps, index: number) => (
            <li key={index}>
              <a href="{item.href }}">{item.title}</a>
            </li>
          ))}
      </ul>
    </NavBarStyled>
  );
}
