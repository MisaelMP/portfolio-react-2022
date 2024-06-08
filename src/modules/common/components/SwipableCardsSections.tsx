import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import Section from './Section';
import About from '../../sections/components/About';
import Contact from '../../sections/components/Contact';
import Projects from '../../sections/components/Projects';
import Skillset from '../../sections/components/Skillset';
import styles from '../../../styles/layout.module.css';

// Define a type for our card data
interface CardData {
	title: string;
	section: string;
	children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
	style?: React.CSSProperties;
}

// Define card data to display in the stack
const cards: CardData[] = [
	{
		title: 'About',
		section: 'about',
		children: <About />,
	},
	{
		title: 'Skillset',
		section: 'skillset',
		children: <Skillset />,
	},
	{
		title: 'Projects',
		section: 'projects',
		children: <Projects />,
	},
	{
		title: 'Contact',
		section: 'contact',
		children: <Contact />,
	},
];

const to = (i: number) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r: number, s: number) =>
	`perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const SwipableCardsSections = () => {
	const [gone, setGone] = useState(new Set<number>());
	const [props, api] = useSprings(cards.length, (i) => ({
		...to(i),
		from: from(i),
	}));

	const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
		const trigger = vx > 0.2;
		const dir = xDir < 0 ? -1 : 1;
		if (!down && trigger) gone.add(index);
		api.start((i) => {
			if (index !== i) return;
			const isGone = gone.has(index);
			const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
			const rot = mx / 100 + (isGone ? dir * 10 * vx : 0);
			const scale = down ? 1.1 : 1;
			return {
				x,
				rot,
				scale,
				delay: undefined,
				config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
			};
		});
		if (!down && gone.size === cards.length)
			setTimeout(() => {
				gone.clear();
				api.start((i) => to(i));
			}, 600);
	});

	return (
		<>
			{props.map(({ x, y, rot, scale }, i) => (
				<animated.div
					className={styles.deck}
					key={i}
					style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`) }}
				>
					<animated.div
						{...bind(i)}
						style={{
							transform: interpolate([rot, scale], trans),
						}}
					>
						<Section {...cards[i]} />
					</animated.div>
				</animated.div>
			))}
		</>
	);
};

export default SwipableCardsSections;
