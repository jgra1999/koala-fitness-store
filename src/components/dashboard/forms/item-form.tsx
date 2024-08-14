import { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import type { Item } from '@/types/database'
import { supabase } from '@/supabase/client'

type Props = {
	table: string
	name: string
	id?: string
}

export default function ItemForm({ table, name, id }: Props) {
	const [item, setItem] = useState<Item>({
		name: '',
		link: ''
	})
	const form = useRef<HTMLFormElement>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setItem({ ...item, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (id) {
			try {
				const { data, error } = await supabase
					.from(table)
					.update([item])
					.eq('id', id)

				if (data) console.log(data)
				if (error) console.log(error)

				window.location.href = `/dashboard/${name}`
			} catch (error) {
				console.log('🚀 ~ file: item-form.tsx:29 ~ handleSubmit ~ error:', error)

				return Response.json(
					{
						message: error
					},
					{
						status: 500
					}
				)
			}
		} else {
			try {
				const { data, error } = await supabase.from(table).insert([item])

				if (data) console.log(data)
				if (error) console.log(error)

				window.location.href = `/dashboard/${name}`
			} catch (error) {
				console.log('🚀 ~ file: item-form.tsx:29 ~ handleSubmit ~ error:', error)

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
	}

	const getItem = async () => {
		const { data, error } = await supabase.from(table).select('*').eq('id', id)

		if (error) console.log(error)

		if (data) setItem(data[0])
	}

	useEffect(() => {
		if (id) {
			getItem()
		}
	}, [id])

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
						value={item.name}
					/>
				</div>
				<div className='flex flex-col gap-y-2'>
					<label htmlFor='name' className='text-sm font-medium text-gray-900'>
						link
					</label>
					<input
						type='text'
						name='link'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 mt-2'
						onChange={handleChange}
						value={item.link}
					/>
				</div>
				<Button text={id ? 'Editar' : 'Guardar'} />
			</form>
		</>
	)
}
