interface Order {
  id: number,
  userId: number,
  productsId?: number[],
}

export default Order;