/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { GrNext, GrPrevious } from 'react-icons/gr';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Carousel = ({ items }) => {
	const { i18n } = useTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerPage = 3;
	const autoPlayDelay = 3000; // Auto-play delay in milliseconds

	const nextSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + itemsPerPage) % items.length
		);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - itemsPerPage + items.length) % items.length
		);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, autoPlayDelay);
		return () => clearInterval(interval); // Clear the interval on component unmount
	}, [currentIndex]);

	const getJudul = (item) => {
		const mapper = {
			en: item.judul_en,
			id: item.judul_id,
			sasak: item.judul_sasak,
		};

		return mapper[i18n.language];
	};

	return (
		<div className='relative w-full mx-auto overflow-hidden'>
			<div
				className='flex transition-transform duration-500 ease-in-out'
				style={{
					transform: `translateX(-${
						currentIndex * (100 / itemsPerPage)
					}%)`,
				}}>
				{items.map((item, index) => (
					<div key={index} className='flex-shrink-0 w-1/3 p-2'>
						<img
							src={item.image}
							alt={`Slide ${index}`}
							className='bg-cover w-full max-h-[350px] object-cover'
						/>
						<div className='p-4 text-center'>
							<Link
								to={`/collection/${item._id}`}
								className='text-lg font-bold hover:no-underline hover:text-orange-400'>
								{getJudul(item)}
							</Link>
							<p className='text-sm'>{item.kategori}</p>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={prevSlide}
				className='absolute p-2 text-white transform -translate-y-1/2 bg-gray-200 rounded-full top-44 left-5 bg-opacity-55'>
				<GrPrevious />
			</button>
			<button
				onClick={nextSlide}
				className='absolute p-2 text-white transform -translate-y-1/2 bg-gray-200 rounded-full top-44 right-5 bg-opacity-55'>
				<GrNext />
			</button>
		</div>
	);
};

export default Carousel;
