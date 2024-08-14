import { useEffect, useRef, useState } from 'react'
import type { Item, Product } from '@/types/database'
import { supabase } from '@/supabase/client'
import axios from 'axios'

export function ProductForm({ id }: { id?: string }) {
	const cloudName = 'ddhmvrzqf'
	const preset_key = 'zokammna'

	const [file1, setFile1] = useState<File | null>(null)
	const [file2, setFile2] = useState<File | null>(null)
	const [brands, setBrands] = useState<Item[]>([])
	const [categories, setCategories] = useState<Item[]>([])
	const [product, setProduct] = useState<Product>({
		image_url_1: '',
		image_url_2: '',
		name: '',
		brand: '',
		category: '',
		price: 0,
		discount: 0,
		stock: 0,
		description: ''
	})

	const form = useRef<HTMLFormElement>(null)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const imageData = new FormData()

		if (file1) {
			const formData = new FormData()
			formData.append('file', file1)
			formData.append('upload_preset', preset_key)
			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
					formData
				)

				imageData.append('image_url_1', res.data.secure_url)
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:57 ~ handleSubmit ~ error:', error)
			}
		}

		if (file2) {
			const formData = new FormData()
			formData.append('file', file2)
			formData.append('upload_preset', preset_key)
			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
					formData
				)

				imageData.append('image_url_2', res.data.secure_url)
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:82 ~ handleSubmit ~ error:', error)
			}
		}

		if (id) {
			const { data, error } = await supabase
				.from('products')
				.update({
					image_url_1: imageData.get('image_url_1')
						? imageData.get('image_url_1')
						: product.image_url_1,
					image_url_2: imageData.get('image_url_2')
						? imageData.get('image_url_2')
						: product.image_url_2,
					name: product.name,
					brand: product.brand,
					category: product.category,
					price: product.price,
					discount: product.discount,
					stock: product.stock,
					description: product.description
				})
				.eq('id', id)

			if (error) console.log(error)
			if (data) console.log(data)
		} else {
			try {
				const { data, error } = await supabase.from('products').insert([
					{
						image_url_1: imageData.get('image_url_1'),
						image_url_2: imageData.get('image_url_2'),
						name: product.name,
						brand: product.brand,
						category: product.category,
						price: product.price,
						discount: product.discount,
						stock: product.stock,
						description: product.description
					}
				])

				if (error) console.log(error)
				if (data) console.log(data)
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:76 ~ handleSubmit ~ error:', error)
			}
		}

		form.current?.reset()
		window.location.href = '/dashboard'
	}

	const fetchBrands = async () => {
		try {
			const { data: brands, error } = await supabase.from('brands').select('*')

			if (error) console.log(error)
			if (brands) setBrands(brands)
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:19 ~ fetchBrands ~ error:', error)
			return Response.json(
				{
					message: error
				},
				{
					status: 500
				}
			)
		}
	}

	const fetchCategories = async () => {
		try {
			const { data: categories, error } = await supabase
				.from('categories')
				.select('*')

			if (error) console.log(error)
			if (categories) setCategories(categories)
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:19 ~ fetchBrands ~ error:', error)
			return Response.json(
				{
					message: error
				},
				{
					status: 500
				}
			)
		}
	}

	const getProduct = async () => {
		const { data, error } = await supabase.from('products').select('*').eq('id', id)

		if (error) console.log(error)

		if (data) setProduct(data[0])
	}

	useEffect(() => {
		if (id) {
			getProduct()
		}
		fetchBrands()
		fetchCategories()
	}, [id])

	return (
		<>
			<h1 className='text-4xl md:text-5xl font-medium'>
				{id ? 'Editar' : 'Agregar'} Producto
			</h1>
			<form
				onSubmit={handleSubmit}
				className='md:grid md:grid-cols-2 mt-20 space-y-5 gap-x-4 px-5 md:px-10'
				ref={form}
			>
				<div className='grid md:grid-cols-2 col-span-2 gap-4'>
					<div>
						{!file1 && (
							<img
								src={product.image_url_1}
								alt=''
								className='w-40 object-contain'
							/>
						)}
						{file1 && (
							<img
								src={URL.createObjectURL(file1)}
								alt=''
								className='w-40 object-contain'
							/>
						)}
						<span className='text-sm font-medium text-gray-900'>Imagen 1</span>

						<label className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-orange-500 hover:border-orange-500 block w-full p-2.5 mt-2'>
							Seleccionar imagen
							<input
								className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-2.5 mt-2'
								aria-describedby='user_avatar_help'
								type='file'
								name='image_url_1'
								onChange={(e) => {
									if (e.target.files) {
										setFile1(e.target.files[0])
									}
								}}
							/>
						</label>
					</div>
					<div>
						{!file2 && (
							<img
								src={product.image_url_2}
								alt=''
								className='w-40 object-contain'
							/>
						)}
						{file2 && (
							<img
								src={URL.createObjectURL(file2)}
								alt=''
								className='w-40 object-contain'
							/>
						)}
						<span className='text-sm font-medium text-gray-900'>Imagen 2</span>
						<label className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-orange-500 hover:border-orange-500 block w-full p-2.5 mt-2'>
							Seleccionar imagen
							<input
								className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-2.5 mt-2'
								aria-describedby='user_avatar_help'
								type='file'
								name='image'
								onChange={(e) => {
									if (e.target.files) {
										setFile2(e.target.files[0])
									}
								}}
							/>
						</label>
					</div>
				</div>

				<label className='block text-sm font-medium text-gray-900'>
					Nombre
					<input
						name='name'
						aria-describedby='helper-text-explanation'
						onChange={handleChange}
						value={product.name}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
					/>
				</label>
				<label className='block text-sm font-medium text-gray-900'>
					Marca
					<select
						name='brand'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={product.brand}
					>
						<option>Seleccionar</option>
						{brands.map((brand) => (
							<option key={brand.id}>{brand.name}</option>
						))}
					</select>
				</label>
				<label className='block text-sm font-medium text-gray-900'>
					Categoría
					<select
						name='category'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={product.category}
					>
						<option>Seleccionar</option>
						{categories.map((category) => (
							<option key={category.id}>{category.name}</option>
						))}
					</select>
				</label>
				<label className='block text-sm font-medium text-gray-900'>
					Stock
					<input
						name='stock'
						type='number'
						onChange={handleChange}
						value={product.stock}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
					/>
				</label>
				<label className='block mb-2 text-sm font-medium text-gray-900'>
					Precio
					<input
						name='price'
						type='number'
						step={0.01}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={product.price}
					/>
				</label>
				<label className='block mb-2 text-sm font-medium text-gray-900'>
					Descuento
					<input
						name='discount'
						type='number'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={product.discount}
					/>
				</label>

				<label className='block text-sm font-medium text-gray-900 col-span-2'>
					Descripción
					<textarea
						name='description'
						rows={4}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={product.description}
					></textarea>
				</label>

				<button className='text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none'>
					{id ? 'Editar Producto' : 'Agregar Producto'}
				</button>
			</form>
		</>
	)
}
