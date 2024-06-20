import skillset from '../../../data/skillset.json';
import { Skill } from '../../../ts/interfaces/skill.interfaces';

const skillIcons: Skill[] = skillset.map((skill: Skill) => ({
	icon: skill.icon,
}));

const Skillset: React.FC = () => {
	return (
		<>
			<div className='flex flex-col gap-4 justify-center items-center w-clamp text-center'>
				<h2 className='font-montserrat text-3xl font-bold'>Skillset</h2>
				<p>
					I have been working with different languages, frameworks and libraries as part of my jurney as an independent
					psychonaut and autodidact. I find myself enjoying the plethora of possibilities and the variations of
					programming, joyful and always eager to learn new technologies. There is a pleasant aesthetic beauty sometimes
					overlooked in programming, but now I am here to denounce it.
				</p>
				<div className='grid grid-cols-3 md:grid-cols-5 gap-12 mt-16 justify-center items-center'>
					{skillIcons.map((skill, index) => (
						<i key={index} className={`devicon-${skill.icon}-plain text-6xl`}></i>
					))}
				</div>
			</div>
		</>
	);
};

export default Skillset;
