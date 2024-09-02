import { useEffect, useRef } from 'react'

export function PromoBand() {
	const bandContainer = useRef<HTMLDivElement>(null)
	const textAmount = 25

	useEffect(() => {
		const container = bandContainer.current
		if (!container) return

		const textWidth = container.scrollWidth
		const containerWidth = container.clientWidth
		const scrollAmount = textWidth - containerWidth

		const animate = () => {
			container.scrollLeft += 1

			if (container.scrollLeft >= scrollAmount) {
				container.scrollLeft = 0
			}

			requestAnimationFrame(animate)
		}

		animate()
	}, [])
	return (
		<div
			className='bg-[#4c0a19] px-4 py-2 w-full overflow-x-hidden'
			ref={bandContainer}
		>
			<div className='whitespace-nowrap space-x-40 animate-moveLeft'>
				{Array.from({ length: textAmount }).map((_, index) => (
					<span key={index} className='inline-block text-white font-bold capitalize'>
						Mano tengo Fe
					</span>
				))}
			</div>
		</div>
	)
}
