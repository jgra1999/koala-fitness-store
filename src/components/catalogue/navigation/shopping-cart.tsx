import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store'
import ShoppingCartItem from '../cart/shopping-cart-item'
// import ShoppingCartItem from './shopping-cart-item'

export function ShoppingCart() {
	const [open, setOpen] = useState(false)
	const { cart } = useCartStore()

	return (
		<>
			<button
				className='flex  items-center pr-2 gap-x-2 text-bold'
				onClick={() => setOpen(true)}
			>
				<span className='text-secondary'>{cart.length}</span>
				<ShoppingBagIcon className='w-6 h-6 stroke-2' />
			</button>

			<Transition.Root show={open} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter='ease-in-out duration-500'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in-out duration-500'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-darkGray bg-opacity-60 transition-opacity' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-hidden'>
						<div className='absolute inset-0 overflow-hidden'>
							<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
								<Transition.Child
									as={Fragment}
									enter='transform transition ease-in-out duration-500 sm:duration-700'
									enterFrom='translate-x-full'
									enterTo='translate-x-2'
									leave='transform transition ease-in-out duration-500 sm:duration-700'
									leaveFrom='translate-x-0'
									leaveTo='translate-x-full'
								>
									<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
										<div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
											<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
												<div className='flex items-start justify-between'>
													<Dialog.Title className='text-lg font-medium text-black uppercase'>
														Carrito
													</Dialog.Title>
													<div className='ml-3 flex h-7 items-center'>
														<button
															type='button'
															className='relative -m-2 p-2 opacity-50 hover:opacity-100 '
															onClick={() => setOpen(false)}
														>
															<span className='absolute -inset-0.5' />
															<span className='sr-only'>Close panel</span>
															<XMarkIcon className='h-6 w-6' aria-hidden='true' />
														</button>
													</div>
												</div>

												<div className='mt-8'>
													<div className='flow-root'>
														<ul
															role='list'
															className='-my-6 divide-y divide-gray-200'
														>
															{cart.map((product) => (
																<ShoppingCartItem
																	key={product.id}
																	product={product}
																/>
															))}
														</ul>
													</div>
												</div>
											</div>

											<div className='border-t border-primary px-4 py-6 sm:px-6'>
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
													<a
														href='/checkout'
														className='flex items-center justify-center rounded py-3 px-4 text-white font-semibold bg-primary active:bg-orange-600 lg:hover:bg-orange-600 w-full'
													>
														Finalizar Pedido
													</a>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}
