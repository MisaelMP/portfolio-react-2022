import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LogoLanding } from '../assets/icons/MISAEL-MLogo.svg';

const LandingPage: React.FC = () => {
	const [init, setInit] = useState(false);
	const location = useLocation();
	const key = location.pathname;
	const [isTransitionComplete, setIsTransitionComplete] = useState(false);

	useEffect(() => {
		const transitionDuration = 200; 
		const timeoutId = setTimeout(() => {
			setIsTransitionComplete(true);
		}, transitionDuration);

		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});

		return () => clearTimeout(timeoutId); // clean up on unmount
	}, [key]);

	const particlesLoaded = async (container?: Container): Promise<void> => {
		console.log(container);
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
	if (init && isTransitionComplete) {
		return (
			<>
				<div key={key} className='flex justify-center items-center h-full'>
					<Particles options={options} particlesLoaded={particlesLoaded} />
					<a
						href='/files/resume.pdf'
						className='group flex justify-center items-center absolute w-[10rem] h-[5rem] hover:animate-bounce'
						download
						title='Download Resume'
					>
						<LogoLanding className='w-full h-full group-hover:fill-[var(--background-white)] transition-colors duration-500 ease-in-out' />
					</a>
				</div>
			</>
		);
	}
	return null;
};

export default LandingPage;
