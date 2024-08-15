import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import slide1 from '../assets/img/slide1.jpg';
import slide2 from '../assets/img/slide2.jpg';

const ImageSlider = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	const images = [slide1, slide2];

	return (
		<div className='slider-container'>
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index}>
						<img
							src={image}
							alt={`Slide ${index + 1}`}
							className='object-cover w-full h-full'
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ImageSlider;
