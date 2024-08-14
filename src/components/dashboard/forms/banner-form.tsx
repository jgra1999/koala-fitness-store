import { useEffect, useRef, useState } from 'react'
import type { Banner } from '@/types/database'
import { Button } from './button'
import { supabase } from '@/supabase/client'
import axios from 'axios'

export function BannerForm({ id }: { id: string }) {
	const cloudName = 'ddhmvrzqf'
	const preset_key = 'zokammna'

	const [file, setFile] = useState<File | null>(null)
	const [banner, setBanner] = useState<Banner>({
		name: '',
		banner_url: ''
	})
	const form = useRef<HTMLFormElement>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const imageData = new FormData()

		if (file) {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', preset_key)
			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
					formData
				)

				imageData.append('banner_url', res.data.secure_url)
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:57 ~ handleSubmit ~ error:', error)
			}
		}

		try {
			const { data, error } = await supabase
				.from('banners')
				.update({
					name: banner.name,
					banner_url: imageData.get('banner_url')
						? imageData.get('banner_url')
						: banner.banner_url
				})
				.eq('id', id)

			if (error) console.log(error)
			if (data) console.log(data)

			form.current?.reset()
			// navigate('/dashboard/banners')
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:57 ~ handleSubmit ~ error:', error)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setBanner({ ...banner, [name]: value })
	}

	const getBanner = async () => {
		const { data, error } = await supabase.from('banners').select('*').eq('id', id)

		if (error) console.log(error)
		if (data) setBanner(data[0])
	}

	useEffect(() => {
		getBanner()
	}, [])

	return (
		<>
			<form
				className='grid grid-cols-1 md:grid-cols-2 mt-20 gap-5 px-5 md:px-10'
				ref={form}
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col gap-y-2'>
					<label htmlFor='name' className='text-sm font-medium text-gray-900'>
						Nombre
					</label>
					<input
						type='text'
						name='name'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={banner.name}
					/>
				</div>
				<div className='flex flex-col gap-y-2'>
					<span className='text-sm font-medium text-gray-900'>Imagen</span>
					<label
						className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-orange-500 hover:border-orange-500 block w-full p-2.5 mt-2'
						htmlFor='banner_url'
					>
						Seleccionar imagen
					</label>

					<input
						className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-4'
						aria-describedby='file_input_help'
						id='banner_url'
						name='banner_url'
						type='file'
						onChange={(e) => {
							if (e.target.files) {
								setFile(e.target.files[0])
							}
						}}
					/>
				</div>
				<Button text='Actualizar' />
			</form>
			{file && (
				<img
					src={URL.createObjectURL(file)}
					alt=''
					className='mt-5 object-contain'
				/>
			)}
		</>
	)
}
