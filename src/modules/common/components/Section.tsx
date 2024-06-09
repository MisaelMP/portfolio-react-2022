import { ReactElement, JSXElementConstructor, ReactPortal } from 'react'
import styles from '../../../styles/objects/section.module.css';

interface SectionProps {
	title?: string;
	section: string;
	children?:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| ReactPortal
		| null
		| undefined;
	style?: React.CSSProperties;
}

const Section = ({ title, children, section }: SectionProps) => {

  return (
    <section className={`${styles.section} o-section--${section}`}>
        {title ? <h2>{ title }</h2> : null}
        { children }
    </section>
  )
}

export default Section;
