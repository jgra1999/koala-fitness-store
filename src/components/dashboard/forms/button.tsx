export function Button({ text }: { text: string }) {
	return (
		<button className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none'>
			{text}
		</button>
	)
}
