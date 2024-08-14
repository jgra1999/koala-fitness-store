import type { Banner } from '@/types/database'
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline'

export function BannersTable({ data }: { data?: Banner[] }) {
	return (
		<table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
			<thead className='text-xs text-white uppercase bg-primary w-full'>
				<tr className='w-full'>
					<th scope='col' className='px-6 py-3'>
						Nombre del Banner
					</th>
					<th scope='col' className='px-6 py-3'>
						imagen
					</th>
					<th scope='col' className='px-6 py-3'>
						Cloudinary url
					</th>
					<th scope='col' className='px-6 py-3'>
						<span className='sr-only'>Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{data?.map((banner: Banner) => (
					<tr key={banner.id}>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{banner.name}
						</th>
						<td className='px-6 py-4'>
							<img src={banner.banner_url} alt='' className='w-20' />
						</td>
						<td className='px-6 py-4'>{banner.banner_url}</td>

						<td>
							<div className='flex gap-x-4'>
								<a href={`banners/${banner.id}`}>
									<EyeIcon className='w-5 h-5 hover:stroke-primary' />
								</a>
								<a href={`/dashboard/banners/actualizar/${banner.id}`}>
									<PencilIcon className='w-5 h-5 hover:stroke-primary' />
								</a>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
