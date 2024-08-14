/* icons */
import {
	BuildingStorefrontIcon,
	TagIcon,
	PhotoIcon,
	Square2StackIcon
} from '@heroicons/react/24/outline'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: 'Productos', href: '/dashboard', icon: BuildingStorefrontIcon },
	{ name: 'Banners', href: '/dashboard/banners', icon: PhotoIcon },
	{ name: 'Categorías', href: '/dashboard/categorias', icon: TagIcon },
	{ name: 'Marcas', href: '/dashboard/marcas', icon: Square2StackIcon }
]

export default function NavLinks() {
	// const location = Location()
	// ${location.pathname === link.href ? 'bg-orange-200 text-primary' : ''}
	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon
				return (
					<a
						key={link.name}
						href={link.href}
						className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-orange-200 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3`}
					>
						<LinkIcon className='w-6' />
						<p className='hidden md:block'>{link.name}</p>
					</a>
				)
			})}
		</>
	)
}
