import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Section from './Section';
import styles from '../../../styles/layout.module.css';
import projects from '../../../data/projects.json'; // import your projects.json file
import { CardData } from '../../../ts/interfaces/card.interfaces';
// Define a type for our card data
const cards: CardData[] = projects.map((project) => ({
	title: project.title,
	description: project.description,
	img: project.src,
	link: project.href,
}));

const SwipableCards = () => {
	return (
		<Swiper
			className={styles.swiper}
			spaceBetween={50}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
		>
			{cards.map((card, index) => (
				<SwiperSlide key={index}>
					<a href={card.link}>
						<h1>{card.title}</h1>
						<p>{card.description}</p>
						<img src={card.img} alt='' />
					</a>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwipableCards;
