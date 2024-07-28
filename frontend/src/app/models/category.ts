export interface Category {
    id: string
    code: string
    name: string
    description: string | null
    icon: string | null
    parent: string | null
    children: Category[]
}
