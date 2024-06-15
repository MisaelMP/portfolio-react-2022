import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
			modules={[Navigation, Pagination, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true, dynamicBullets: true }}
			scrollbar={{ draggable: true }}
		>
			{cards.map((card, index) => (
				<SwiperSlide key={index}>
					<a href={card.link} className="flex flex-col gap-4 mx-auto items-center justify-center w-clamp mb-8 px-5">
						<h1>{card.title}</h1>
						<p>{card.description}</p>
						<img src={card.img} alt={card.title} />
					</a>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwipableCards;
