import { Product } from "./product"

export interface Article {
    id: string
    code: string
    product: Product
    // quantity: number         // WOULD LIKE TO ADD QUANTITY FIELD
    selling_price: number
    total: number
    created: Date
}
