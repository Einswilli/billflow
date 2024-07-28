import { Client } from "./client"
import { Article } from "./article"

export interface Bill {
    id: string
    code: string
    client: Client
    articles: Article[]
    total: number
    is_validated: boolean
    is_paid: boolean
    created: Date
}
