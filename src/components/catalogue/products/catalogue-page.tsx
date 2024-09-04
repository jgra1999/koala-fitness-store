import { useEffect, useState } from 'react'
import { CatalogueSection } from './catalogue-section'
import type { Item } from '@/types/database'
import { supabase } from '@/supabase/client'

export function CataloguePage() {
	const [categories, setCategories] = useState<Item[]>([])
	const fetchCategories = async () => {
		const { data: categories, error } = await supabase.from('categories').select('*')

		if (error) console.log(error)
		if (categories) setCategories(categories)
	}

	useEffect(() => {
		fetchCategories()
	}, [])
	return (
		<>
			{categories.map((category) => (
				<CatalogueSection
					key={category.id}
					title={category.name}
					link={category.link}
				/>
			))}
		</>
	)
}
