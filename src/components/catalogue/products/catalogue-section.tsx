import { useEffect, useState } from 'react'
import type { Product } from '@/types/database'
import { supabase } from '@/supabase/client'
import { ItemCard } from './item-card'

type Props = {
	title: string
	link: string
}

export function CatalogueSection({ title, link }: Props) {
	const [products, setProducts] = useState<Product[]>([])

	const fetchProducts = async () => {
		const { data: products, error } = await supabase
			.from('products')
			.select('*')
			.eq('category', title)

		if (error) console.log(error)
		if (products) setProducts(products)
	}

	useEffect(() => {
		fetchProducts()
	}, [])
	return (
		<section
			className='lg:container border-b-2 border-secondary px-5 md:px-10 pb-14 mt-14'
			id={link}
		>
			<h2 className='font-bold text-4xl mb-10'>{title}</h2>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{products.map((product) => (
					<ItemCard key={product.id} product={product} />
				))}
			</div>
		</section>
	)
}
