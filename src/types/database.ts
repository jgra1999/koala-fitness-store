export type Product = {
	id?: number
	image_url_1: string
	image_url_2: string
	name: string
	brand: string
	category: string
	price: number
	discount?: number
	stock: number
	description: string
}

export type Item = {
	id?: number
	name: string
	link: string
}

export type Banner = {
	id?: number
	name: string
	banner_url: string
}
