import navbarItems from '../data/navbarItems.json';
import ENavbar from '../styles/elements/navbar';

interface NavItemProps {
  title: string;
  href: string
  children?: JSX.Element|JSX.Element[]
}

export default function Navbar(

) {
  return (
    <ENavbar>
      <ul>
      {
        navbarItems && navbarItems?.map((item: NavItemProps, index: number) => 
          <li key={index}>
            <a href="{item.href }}">
              { item.title }
            </a>
          </li>
        )
      }
      </ul>
    </ENavbar>
  )
}