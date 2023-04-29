import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import SectionStyled from '../../../styles/objects/section';

interface CardSectionProps {
  title?: string;
  section: string;
  children?:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  style?: React.CSSProperties;
}

const CardSection = ({ title, children, section }: CardSectionProps) => {

  return (
    <SectionStyled className={`o-section o-section--${section}`}>
        <h2>{ title }</h2>
        { children }
    </SectionStyled>
  )
}

export default CardSection;
