
export interface Order {
  _id: string
  table: string
  status: 'WAITING' | 'iN_PRODUCTION' | 'DONE'
  products: {
    _id: string
    quantity: number
    product: {
      name: string
      imagePth: string
      price: number
    }
  }[]
}