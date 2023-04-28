import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import SectionStyled from '../../../styles/objects/section';

interface SectionProps {
    title?: string;
    section: string
    children?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined
  }

const Section = ({ title, children, section }: SectionProps) => {

  return (
    <SectionStyled className={`o-section o-section--${section}`}>
        <h2>{ title }</h2>
        { children }
    </SectionStyled>
  )
}

export default Section;
