import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import OSection from '../styles/objects/section'

interface SectionProps {
    title: string;
    section: string
    children?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined
  }

function Section(props: SectionProps) {

  return (
    <OSection className={`o-section o-section--${props.section}`}>
        <h2>{ props.title }</h2>
        { props.children }
    </OSection>
  )
}

export default Section
