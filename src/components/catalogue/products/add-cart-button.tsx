import { useEffect, useState } from 'react'
import type { CartItem } from '@/types/cart'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast'
import { useCartStore } from '@/store'

export default function AddCartButton({
	id,
	name,
	image_url,
	brand,
	price,
	qty
}: CartItem) {
	const { addToShoppingCart, cart } = useCartStore()

	const [isAdded, setIsAdded] = useState(false)
	const item: CartItem = { id, name, image_url, brand, price, qty }

	const handleAddToCart = () => {
		addToShoppingCart(item)
		toast.success('Producto Agregado')
	}

	useEffect(() => {
		const searchItem = cart.find((i: CartItem) => i.id === id)
		if (searchItem !== undefined) setIsAdded(true)
	}, [])

	return (
		<>
			<button
				onClick={handleAddToCart}
				disabled={isAdded}
				className='disabled:cursor-not-allowed disabled:hover:bg-purple-500 inline-flex items-center justify-center gap-x-1.5 rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium text-white active:bg-purple-700 lg:hover:bg-purple-700'
			>
				<ShoppingBagIcon className='stroke-current stroke-2 w-6 h-6' />
			</button>
			<Toaster position='bottom-center' />
		</>
	)
}
