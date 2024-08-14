import type { Banner } from '@/types/database'

export function BannerOverview({ banner }: { banner: Banner }) {
	return (
		<div className='bg-white p-8 shadow-lg rounded-lg'>
			<div className='px-4 sm:px-0'>
				<h3 className='text-2xl font-semibold leading-7 text-gray-900'>
					{banner.name}
				</h3>
				<p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
					{banner.banner_url}
				</p>
			</div>
			<div className='mt-6 border-t border-gray-100'>
				<img src={banner.banner_url} alt='' className='w-full' />
			</div>
		</div>
	)
}
