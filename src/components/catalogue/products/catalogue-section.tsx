import { useEffect, useState } from 'react'
import type { Product } from '@/types/database'
import { supabase } from '@/supabase/client'
import { ItemCard } from './item-card'
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/outline'

type Props = {
	title: string
	link: string
}

export function CatalogueSection({ title, link }: Props) {
	const [products, setProducts] = useState<Product[]>([])
	const [isAscending, setIsAscending] = useState(true)

	const fetchProducts = async () => {
		const { data: products, error } = await supabase
			.from('products')
			.select('*')
			.eq('category', title)
			.order('price', { ascending: isAscending })

		if (error) console.log(error)
		if (products) setProducts(products)
	}

	useEffect(() => {
		fetchProducts()
	}, [isAscending])
	return (
		<section
			className='lg:container border-b-2 border-secondary px-2 md:px-10 pb-14 mt-14'
			id={link}
		>
			<div className='w-full flex-col md:flex-row justify-between mb-10 space-y-4'>
				<h2 className='font-bold text-4xl'>{title}</h2>
				<div className='flex gap-x-5'>
					<button
						className={`flex items-center text-sm ${
							isAscending === false ? 'text-primary' : 'text-gray-500'
						}`}
						onClick={() => setIsAscending(false)}
					>
						<ArrowLongUpIcon className='w-4 h-4' />
						Mayor a Menor
					</button>
					<button
						className={`flex items-center text-sm ${
							isAscending === true ? 'text-primary' : 'text-gray-500'
						}`}
						onClick={() => setIsAscending(true)}
					>
						<ArrowLongDownIcon className='w-4 h-4' />
						Menor a Mayor
					</button>
				</div>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
				{products.map((product) => (
					<ItemCard key={product.id} product={product} />
				))}
			</div>
		</section>
	)
}
