import { supabase } from '../supabase/client'

/* export const fetchCategories = async () => {
	const { data: categories, error } = await supabase.from('categories').select('*')

	if (error) console.log(error)
	if (categories) return categories
} */

export const deleteData = async (tableName: string, id: number | undefined) => {
	try {
		if (confirm('Estas seguro de eliminar este item')) {
			const { error } = await supabase.from(tableName).delete().eq('id', id)

			if (error !== null) console.log(error)

			window.location.reload()
		}
	} catch (error) {
		console.log('🚀 ~ file: db.ts:17 ~ deleteData ~ error:', error)
	}
}
