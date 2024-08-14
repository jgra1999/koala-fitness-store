import { useCartStore } from '@/store'
import type { CartItem } from '@/types/cart'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function ShoppingCartItem({ product }: { product: CartItem }) {
	const { removeToShoppingCart, addToShoppingCart } = useCartStore()

	const handleRemoveItem = (qty: number) => {
		removeToShoppingCart(product)
		const basePrice = product.price / product.qty
		addToShoppingCart({
			id: product.id,
			name: product.name,
			image_url: product.image_url,
			brand: product.brand,
			price: basePrice * qty,
			qty: qty
		})
	}

	const handleAddItem = (qty: number) => {
		// addItemPrice(price)
		removeToShoppingCart(product)
		const basePrice = product.price / product.qty
		addToShoppingCart({
			id: product.id,
			name: product.name,
			image_url: product.image_url,
			brand: product.brand,
			price: basePrice * qty,
			qty: qty
		})
	}
	return (
		<li className='flex py-6'>
			<div className='w-16 flex-shrink-0'>
				<img src={product.image_url} alt='imagen del producto' className='w-full' />
			</div>

			<div className='ml-4 flex flex-1 flex-col'>
				<div>
					<div className='flex justify-between text-base font-medium text-gray-900'>
						<h3>{product.name}</h3>
						<p className='ml-4'>${product.price}</p>
					</div>
					<p className='mt-1 text-sm text-gray-500'>{product.brand}</p>
				</div>
				<div className='flex flex-1 items-end justify-between text-sm'>
					<div className='flex items-center gap-x-2'>
						<p className='text-gray-500'>Cantidad:</p>
						<div className='flex items-center gap-x-2'>
							<button
								onClick={() => handleRemoveItem(product.qty - 1)}
								disabled={product.qty === 1}
								className='border-2 border-zinc-400 text-zinc-400 active:text-secondary lg:hover:text-secondary active:border-secondary lg:hover:border-secondary py-0.5 px-1 rounded-md disabled:cursor-default '
							>
								<MinusIcon className='w-3 h-3 stroke-2' />
							</button>
							<span className='text-lg'>{product.qty}</span>
							<button
								onClick={() => handleAddItem(product.qty + 1)}
								className='border-2 border-zinc-400 text-zinc-400 active:text-secondary lg:hover:text-secondary active:border-secondary lg:hover:border-secondary py-0.5 px-1 rounded-md'
							>
								<PlusIcon className='w-3 h-3 stroke-2' />
							</button>
						</div>
					</div>

					<div className='flex'>
						<button
							onClick={() => removeToShoppingCart(product)}
							className='font-medium text-red-600 hover:text-red-500'
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}
