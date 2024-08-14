import NavLinks from './nav-links'
import { PowerIcon } from '@heroicons/react/24/outline'
import { supabase } from '../../../supabase/client'

export function SideNav() {
	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) console.log(error)

			location.reload()
		} catch (error) {
			console.log('🚀 ~ file: sidenav.tsx:11 ~ handleLogout ~ error:', error)
		}
	}

	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			<a
				className='mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40'
				href='/'
			>
				<div className='w-32 text-white md:w-40'>
					<img src='/logo-koala-blanco.png' alt='Logo de koala' />
				</div>
			</a>
			<div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<NavLinks />
				<div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
				<button
					onClick={handleLogout}
					className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-orange-200 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3'
				>
					<PowerIcon className='w-6' />
					<div className='hidden md:block'>Cerrar sesión</div>
				</button>
			</div>
		</div>
	)
}
