interface Order {
  order_?: number,
  id: number,
  userId: number,
  orderId?: number,
  productsId?: number[],
}

export default Order;