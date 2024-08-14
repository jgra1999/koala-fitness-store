import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types/cart'

interface State {
	cart: CartItem[]
	totalToPay: number
}

interface Actions {
	addToShoppingCart: (item: CartItem) => void
	removeToShoppingCart: (item: CartItem) => void
	addItemPrice: (price: number) => void
	removeItemPrice: (price: number) => void
}

export const useCartStore = create<State & Actions>()(
	persist(
		(set) => ({
			cart: [],
			totalToPay: 0,
			addToShoppingCart: (item: CartItem) => {
				// const totalPriceByItem = item.price * item.qty
				set((state) => ({
					cart: [...state.cart, item]
					// totalToPay: state.totalToPay + totalPriceByItem
				}))
			},
			removeToShoppingCart: (item: CartItem) =>
				set((state) => ({
					cart: state.cart.filter((i) => i !== item)
				})),

			addItemPrice: (price) =>
				set((state) => ({
					totalToPay: state.totalToPay + price
				})),

			removeItemPrice: (price) =>
				set((state) => ({
					totalToPay: state.totalToPay - price
				}))
		}),
		{ name: 'shopping-cart' }
	)
)
