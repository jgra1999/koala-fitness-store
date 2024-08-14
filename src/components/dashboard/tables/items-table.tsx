import type { Item } from '@/types/database'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteData } from '@/utils/db'

interface Props {
	data?: Item[]
	header: string[]
	tableName: string
	name: string
}

export function ItemTable({ data, header, tableName, name }: Props) {
	const handleDelete = async (tableName: string, id: number | undefined) => {
		await deleteData(tableName, id)
	}
	return (
		<table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
			<thead className='text-xs text-white uppercase bg-primary w-full'>
				<tr className='w-full'>
					{header.map((name, index) => (
						<th key={index} scope='col' className='px-6 py-3'>
							{name}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data?.map((item: Item) => (
					<tr key={item.id}>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{item.name}
						</th>
						<td className='px-6 py-4'>{item.link}</td>

						<td>
							<div className='flex gap-x-4'>
								<a href={`${name}/editar/${item.id}`}>
									<PencilIcon className='w-5 h-5 hover:stroke-primary' />
								</a>
								<button onClick={() => handleDelete(tableName, item.id)}>
									<TrashIcon className='w-5 h-5 hover:stroke-primary' />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
