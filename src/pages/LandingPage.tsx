// import TypoLandPage from "../modules/interaction/components/typoLandPage";
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const LandingPage: React.FC = () => {
	const [init, setInit] = useState(false);
	const location = useLocation();
	const key = location.pathname;

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, [key]);

	const particlesLoaded = async (container?: Container): Promise<void> => {
		console.log(container);
		setInit(true);
	};

	const options: ISourceOptions = useMemo(
		() => ({
			fpsLimit: 60,
			background: {
				color: '#16161d',
			},
			interactivity: {
				events: {
					onClick: { enable: true, mode: 'push' },
					onHover: {
						enable: true,
						mode: 'repulse',
						parallax: { enable: false, force: 60, smooth: 10 },
					},
					resize: { enable: true },
				},
				modes: {
					push: { quantity: 4 },
					repulse: { distance: 200, duration: 0.4 },
				},
			},
			particles: {
				color: { value: '#f8f8ff' },
				move: {
					direction: MoveDirection.none,
					enable: true,
					outModes: { default: OutMode.out },
					random: false,
					speed: 2,
					straight: false,
				},
				number: {
					density: {
						enable: true,
						area: 800,
					},
					value: 80,
				},
				opacity: {
					animation: {
						enable: true,
						speed: 0.05,
						sync: true,
						startValue: 'max',
						count: 1,
						destroy: 'min',
					},
					value: {
						min: 0,
						max: 0.5,
					},
				},
				shape: {
					type: 'circle',
				},
				size: {
					value: { min: 1, max: 5 },
				},
			},
		}),
		[]
	);

	return (
		<>
			<div key={key}>{init && <Particles options={options} particlesLoaded={particlesLoaded} />}</div>
		</>
	);
};

export default LandingPage;
