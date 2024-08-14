import type { Product } from '@/types/database'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteData } from '@/utils/db'

export function ProductsTable({ products }: { products: Product[] }) {
	return (
		<table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
			<thead className='text-xs text-white uppercase bg-primary'>
				<tr>
					<th scope='col' className='px-6 py-3'>
						Productos
					</th>
					<th scope='col' className='px-6 py-3'>
						imagen
					</th>
					<th scope='col' className='px-6 py-3'>
						stock
					</th>
					<th scope='col' className='px-6 py-3'>
						Categoría
					</th>
					<th scope='col' className='px-6 py-3'>
						Precio
					</th>
					<th scope='col' className='px-6 py-3'>
						<span className='sr-only'>Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product: Product) => (
					<tr key={product.id}>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{product.name}
						</th>
						<td className='px-6 py-4'>
							<img src={product.image_url_1} alt='' loading='lazy' className='w-8' />
						</td>
						<td className='px-6 py-4'>{product.stock}</td>
						<td className='px-6 py-4'>{product.category}</td>
						<td className='px-6 py-4'>${product.price}</td>
						<td className='px-6 py-4 text-right'>
							<div className='flex gap-x-4'>
								<a href={`/dashboard/productos/${product.id}`}>
									<EyeIcon className='w-5 h-5 hover:stroke-primary' />
								</a>
								<a href={`/dashboard/productos/editar/${product.id}`}>
									<PencilIcon className='w-5 h-5 hover:stroke-primary' />
								</a>
								<button onClick={() => deleteData('products', product.id)}>
									<TrashIcon className='w-5 h-5 hover:stroke-primary' />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
