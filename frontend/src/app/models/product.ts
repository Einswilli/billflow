import { Category } from "./category"

export interface Product {
    id: string
    code: string
    name: string
    brand: string
    description: string
    category: Category
    price: number
    tva: number
}
