import { supabase } from '@/supabase/client'
import { useState } from 'react'

export default function LoginForm() {
	const [sending, setSending] = useState(false)
	const [error, setError] = useState(false)

	const setAdminCookie = () => {
		var now = new Date()
		var time = now.getTime()
		var expireTime = time + 19 * 24 * 60 * 60 * 1000
		now.setTime(expireTime)
		document.cookie = 'admin=true; expires=' + now.toUTCString() + '; path=/'
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const email = e.target.elements[0].value
		const password = e.target.elements[1].value

		try {
			setSending(true)
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			})
			if (error) {
				setError(true)
			} else {
				setAdminCookie()
				location.reload()
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error)
		} finally {
			setSending(false)
		}
	}
	return (
		<form onSubmit={handleSubmit} className='w-96 space-y-4'>
			<input
				type='email'
				name='email'
				placeholder='ejemplo@email.com'
				className='border-2 border-secondary rounded-lg py-3 px-4 outline-none focus:outline-none w-full'
				required
			/>

			<input
				type='password'
				name='password'
				placeholder='ingresa tu password'
				className='border-2 border-secondary rounded-lg py-3 px-4 outline-none focus:outline-none w-full'
				required
			/>

			<button className='bg-secondary text-white font-semibold py-3 rounded shadow mt-5 w-full'>
				{sending ? 'Enviando...' : 'Enviar'}
			</button>

			{error && (
				<div className='text-red-500 text-center font-semibold'>
					Correo electrónico o contraseña incorrectos
				</div>
			)}
		</form>
	)
}
