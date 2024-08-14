/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useCartStore } from '@/store'
/* icons */
import {
	BanknotesIcon,
	CurrencyEuroIcon,
	DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'
import { BinanceIcon, ZelleIcon } from '../icons/icons'

import ShoppingCartItem from '../catalogue/cart/shopping-cart-item'

export function CheckCart() {
	const { cart } = useCartStore()

	const [paymentMethod, setPaymentMethod] = useState('')
	const [clientInfo, setClientInfo] = useState({
		name: '',
		last_name: '',
		city: '',
		address: ''
	})

	const methods = [
		{
			name: 'Efectivo',
			icon: <BanknotesIcon className='w-6 h-6' />
		},
		{
			name: 'Zelle',
			icon: <ZelleIcon />
		},
		{
			name: 'Euros',
			icon: <CurrencyEuroIcon className='w-6 h-6' />
		},
		{
			name: 'Binance',
			icon: <BinanceIcon />
		},
		{
			name: 'Pago Móvil',
			icon: <DevicePhoneMobileIcon className='w-6 h-6' />
		}
	]

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setClientInfo({ ...clientInfo, [name]: value })
	}

	const handlePaymentMethod = (e: any) => {
		setPaymentMethod(e.target.innerText)
	}

	const handleSendOrder = () => {
		const order = cart.map((item) => ' ' + item.name + ' x' + item.qty + ' ')
		const totalToPay = cart.reduce(
			(acumulado, product) => acumulado + product.price,
			0
		)
		const { name, last_name, city, address } = clientInfo

		const full_name = name + ' ' + last_name

		const url =
			'https://wa.me/+584244354773?text=*CLIENTE*: ' +
			full_name +
			'%0A *MÉTODO DE PAGO*: ' +
			paymentMethod +
			'%0A *DIRECCIÓN*: ' +
			address +
			'%0A *CIUDAD*: ' +
			city +
			'%0A *PEDIDO*: ' +
			order +
			'%0A *TOTAL A PAGAR*: ' +
			totalToPay +
			'$'

		window.open(url)
	}

	return (
		<div className='mt-10 mb-20 px-8 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10'>
			<div>
				<h2 className='text-2xl md:text-3xl font-bold'>Información del contacto</h2>

				<form className='mt-10 space-y-5'>
					<div>
						<label htmlFor='name' className='font-medium text-zinc-500'>
							Nombre
						</label>
						<input
							onChange={handleChange}
							type='text'
							name='name'
							id='name'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						/>
					</div>
					<div>
						<label htmlFor='last_name' className='font-medium text-zinc-500'>
							Apellido
						</label>
						<input
							onChange={handleChange}
							type='text'
							name='last_name'
							id='last_name'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						/>
					</div>
					<div>
						<label htmlFor='city' className='font-medium text-zinc-500'>
							Ciudad
						</label>
						<input
							onChange={handleChange}
							type='text'
							name='city'
							id='city'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						/>
					</div>
					<div>
						<label htmlFor='address' className='font-medium text-zinc-500'>
							Dirección
						</label>
						<textarea
							onChange={handleChange}
							name='address'
							id='address'
							rows={3}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2 resize-none'
						></textarea>
					</div>

					<div className='space-y-5'>
						<h2 className='text-2xl md:text-3xl font-bold mb-8'>Método de pago</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
							{methods.map((method, index) => (
								<button
									key={index}
									type='button'
									onClick={handlePaymentMethod}
									className={`bg-white border border-gray-300 ${
										paymentMethod.toLowerCase() === method.name.toLowerCase()
											? 'border-primary text-primary'
											: 'border-gray-300 text-zinc-600'
									} rounded-lg  text-xl font-medium flex items-center justify-center py-4 gap-x-2`}
								>
									{method.icon}
									{method.name}
								</button>
							))}
						</div>
					</div>
				</form>
			</div>

			<div>
				<h2 className='text-2xl md:text-3xl font-bold'>Lista de productos</h2>
				<div className='bg-white rounded-lg shadow-md py-5 pl-5 mt-8'>
					{cart.length > 0 ? (
						<>
							<ul
								role='list'
								className='-my-6 divide-y divide-gray-200 max-h-[550px] overflow-y-auto pr-5'
							>
								{cart.map((product) => (
									<ShoppingCartItem key={product.id} product={product} />
								))}
							</ul>

							<div className='border-t border-primary px-4 py-6 sm:px-6 mt-10'>
								<div className='flex justify-between text-base font-medium'>
									<p>Subtotal</p>
									<p>
										$
										{cart.reduce(
											(acumulado, product) => acumulado + product.price,
											0
										)}
									</p>
								</div>
								<div className='mt-6'>
									<button
										onClick={handleSendOrder}
										className='flex items-center justify-center rounded py-3 px-4 text-white font-semibold bg-primary active:bg-orange-600 lg:hover:bg-orange-600 w-full'
									>
										Realizar Pedido
									</button>
								</div>
							</div>
						</>
					) : (
						<div className='w-full text-center'>
							<h3 className='font-bold text-xl'>No hay productos en el carrito</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
