import type { Product } from '@/types/database'
import React from 'react'

export function ProductOverview({ product }: { product: Product }) {
	return (
		<main className='my-5'>
			<div className='bg-white p-8 shadow-lg rounded-lg'>
				<div className='px-4 sm:px-0'>
					<h3 className='text-2xl font-semibold leading-7 text-gray-900'>
						{product.name}
					</h3>
					<p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
						{product.category}
					</p>
				</div>
				<div className='mt-6 border-t border-gray-100'>
					<dl className='divide-y divide-gray-100'>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>
								Imágenes
							</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex gap-4'>
								<img src={product.image_url_1} alt='' className='w-12' />
								<img src={product.image_url_2} alt='' className='w-12' />
							</dd>
						</div>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>Marca</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
								{product.brand}
							</dd>
						</div>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>Precio</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
								${product.price}
							</dd>
						</div>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>Stock</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
								{product.stock}
							</dd>
						</div>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>
								Salary expectation
							</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
								$120,000
							</dd>
						</div>
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm font-medium leading-6 text-gray-900'>
								Descripción
							</dt>
							<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
								{product.description}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</main>
	)
}
