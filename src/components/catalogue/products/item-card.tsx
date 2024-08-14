import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { DeliveryIcon, WhatsAppIcon } from '@/components/icons/icons'
import AddCartButton from './add-cart-button'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Product } from '@/types/database'

interface Props {
	product: Product
}

export function ItemCard({ product }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const [image, setImage] = useState(product.image_url_1)
	const [finalPrice, setFinalPrice] = useState(product.price)
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		if (product.discount) {
			const priceWithDiscount =
				product.price - product.price * (product.discount / 100)

			setFinalPrice(priceWithDiscount)
		}
	}, [])

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='group w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center relative'
			>
				<div>
					<img
						className='p-8 rounded-t-lg w-64 aspect-[350/550]'
						src={product.image_url_1}
						alt='product image'
						loading='lazy'
					/>
				</div>
				<div className='px-5 pb-5 space-y-4 w-full'>
					<div className='text-start'>
						<h5 className='text-sm sm:text-base font-bold text-zinc-600 group-hover:text-primary'>
							{product.name}
						</h5>
						<span className='text-gray-400 font-medium capitalize text-xs'>
							{product.brand}
						</span>
					</div>
					<div className='flex items-center justify-between'>
						{product.stock > 0 ? (
							<div>
								{product.discount !== undefined && product.discount > 0 ? (
									<>
										<span className='font-semibold text-gray-900 text-xl'>
											${product.price - product.price * (product.discount / 100)}
										</span>
										<span className='font-semibold text-gray-400 ml-2 line-through'>
											${product.price}
										</span>
									</>
								) : (
									<span className='font-semibold text-gray-900 text-xl'>
										${product.price}
									</span>
								)}
							</div>
						) : (
							<div>
								<span className='font-bold text-primary text-sm'>
									Fuera de Stock
								</span>
							</div>
						)}
					</div>
				</div>
				{product.discount && product.discount > 0 ? (
					<span className='bg-primary text-white font-medium px-1.5 py-3 absolute right-0 rounded-tr-md'>
						- {product.discount}%
					</span>
				) : (
					''
				)}
			</button>

			{/* Modal */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-40' onClose={() => setIsOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black/25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all'>
									<div className='flex flex-col items-center'>
										<button
											className='absolute right-4 top-4'
											onClick={() => setIsOpen(false)}
										>
											<XMarkIcon className='w-7 h-7' />
										</button>
										<img
											className=' lg:w-4/5 max-w-[180px] lg:max-w-[240px] aspect-[350/550]'
											src={image}
											alt='product image'
											loading='lazy'
										/>
										<div className='flex justify-around lg:justify-start items-center gap-x-3 w-full'>
											<button onClick={() => setImage(product.image_url_1)}>
												<img
													src={product.image_url_1}
													alt=''
													className='w-28 md:w-[100px]'
													loading='lazy'
												/>
											</button>
											<button onClick={() => setImage(product.image_url_2)}>
												<img
													src={product.image_url_2}
													alt=''
													className='w-28 md:w-[100px]'
												/>
											</button>
										</div>
									</div>
									<div className='flex flex-col gap-y-4 items-start mt-4'>
										<div className='text-left'>
											<Dialog.Title
												as='h3'
												className='text-xl font-bold leading-6 text-gray-900'
											>
												{product.name}
											</Dialog.Title>
											<div className=''>
												<span className='text-sm text-gray-500 capitalize'>
													{product.brand}
												</span>
											</div>
										</div>

										<div>
											{product.discount !== undefined && product.discount > 0 ? (
												<>
													<span className='font-medium text-3xl'>${finalPrice}</span>
													<span className='font-medium text-gray-400 ml-2 line-through'>
														${product.price}
													</span>
												</>
											) : (
												<span className='font-medium text-2xl'>${finalPrice}</span>
											)}
										</div>

										<Dialog.Description className='text-left text-sm'>
											{product.description}
										</Dialog.Description>

										<div className='mt-4 text-left space-y-4'>
											<h4 className='text-sm font-medium text-zinc-400'>
												Cantidad:
											</h4>
											<div className='flex item-center gap-x-2 text-lg'>
												<button
													onClick={() => setQuantity(quantity - 1)}
													disabled={quantity === 1}
													className='border-2 border-zinc-400 text-zinc-400 active:text-secondary lg:hover:text-secondary active:border-secondary lg:hover:border-secondary py-1 px-1.5 rounded-md'
												>
													<MinusIcon className='w-5 h-5' />
												</button>
												{quantity}
												<button
													onClick={() => setQuantity(quantity + 1)}
													className='border-2 border-zinc-400 text-zinc-400 active:text-secondary lg:hover:text-secondary active:border-secondary lg:hover:border-secondary py-1 px-1.5 rounded-md'
												>
													<PlusIcon className='w-5 h-5' />
												</button>
											</div>
										</div>

										<div className='mt-4 flex items-center gap-x-5'>
											<a
												href={`https://wa.me/+584244354773/?text=Hola!%20me%20interesa%20la%20${product.name}`}
												className='text-sm inline-flex items-center justify-center gap-x-1.5 rounded-md border border-transparent bg-green-500 px-4 py-2 font-medium text-white active:bg-green-700 lg:hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												target='_blank'
											>
												<WhatsAppIcon styles='w-6 h-6' />
												Escribir por WhatsApp
											</a>
											{product.stock > 0 && (
												<AddCartButton
													id={product.id}
													name={product.name}
													image_url={product.image_url_1}
													brand={product.brand}
													price={finalPrice * quantity}
													qty={quantity}
												/>
											)}
										</div>

										<div className='mt-4 text-left'>
											<h4 className='text-sm font-medium text-zinc-400'>
												Busca tu oficina de envíos:
											</h4>
											<div className='flex flex-wrap items-center gap-5 mt-4'>
												<a
													href='https://mrwve.com/'
													target='_blank'
													className='w-40 inline-flex items-center justify-center gap-x-1.5 rounded-md border border-transparent bg-red-500 px-4 py-2 font-medium text-white active:bg-red-700 lg:hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												>
													<DeliveryIcon />
													MRW
												</a>
												<a
													href='https://zoom.red/consulta-de-oficinas-personas/'
													target='_blank'
													className='w-40 inline-flex items-center justify-center gap-x-1.5 rounded-md border border-transparent bg-sky-500 px-4 py-2 font-medium text-white active:bg-sky-700 lg:hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												>
													<DeliveryIcon />
													Zoom
												</a>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
