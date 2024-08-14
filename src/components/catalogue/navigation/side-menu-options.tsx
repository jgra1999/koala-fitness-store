type Props = {
	link: string
	name: string
}

export default function SideMenuOptions({ link, name }: Props) {
	return (
		<a
			href={link}
			className='font-medium active:text-primary lg:hover:text-primary'
			data-drawer-hide='drawer-navigation'
		>
			<span className='ml-3'>{name}</span>
		</a>
	)
}
