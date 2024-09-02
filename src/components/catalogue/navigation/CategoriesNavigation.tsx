import { supabase } from '@/supabase/client'
import type { Item } from '@/types/database'
import { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export function CategoriesNavigation() {
	const [categories, setCategories] = useState<Item[]>([])
	const fetchCategories = async () => {
		const { data, error } = await supabase.from('categories').select('*')

		if (error) console.log(error)
		if (data) setCategories(data)
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	return (
		<Swiper
			slidesPerView={3}
			// loop={true}
			pagination={{
				clickable: true
			}}
			navigation={true}
			modules={[Navigation]}
			breakpoints={{
				640: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 4
				},
				1024: {
					slidesPerView: 5
				}
			}}
			id='categories__carrousel'
		>
			{categories.map((category) => (
				<SwiperSlide key={category.id}>
					<p className='text-xs md:text-base font-semibold text-primary md:text-center max-w-20 md:max-w-none'>
						{category.name}
					</p>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
