import { useState, useEffect } from 'react'
import type { Product } from '@/types/database'
import { supabase } from '../../supabase/client'
/* components */
import { ProductsTable } from '../../components/dashboard/tables/products-table'

export function ProductData() {
	const [data, setData] = useState<Product[]>([])
	const [searchInput, setSearchInput] = useState('')

	const fetchProducts = async () => {
		if (searchInput) {
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.like('name', `%${searchInput}%`)

			if (error) console.log(error)

			if (data) setData(data)
		} else {
			const { data, error } = await supabase.from('products').select('*')
			if (error) console.log(error)

			if (data) setData(data)
		}
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setSearchInput(value.toUpperCase())
	}

	useEffect(() => {
		fetchProducts()
	}, [searchInput])

	return (
		<>
			<div className='mt-20'>
				<div className='flex justify-between flex-wrap gap-y-2'>
					<a
						href='/dashboard/productos/nuevo'
						className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none'
					>
						Agregar Producto
					</a>

					<div>
						<input
							type='text'
							className='w-80 md:w-96 p-2 bg-white rounded-lg border border-zinc-400 focus:border-primary outline-none focus:outline-none'
							placeholder='Buscar Producto...'
							onChange={handleSearchChange}
						/>
					</div>
				</div>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-8'>
					<ProductsTable products={data} />
					{data.length === 0 && (
						<div className='text-center py-5'>
							<h5 className='text-xl font-semibold'>No hay productos registrados</h5>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
