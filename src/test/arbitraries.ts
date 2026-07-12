import * as fc from 'fast-check'
import type { IMenu, ICart, IOrder } from '../types/order'

export const menuArb: fc.Arbitrary<IMenu> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 0, maxLength: 200 }),
  price: fc.integer({ min: 1000, max: 100000 }),
  image_url: fc.webUrl(),
  category: fc.constantFrom('Coffee', 'Non Coffee', 'Pastries', 'Desserts', 'Sandwiches'),
  isAvailable: fc.boolean(),
})

export const cartItemArb: fc.Arbitrary<ICart> = fc.record({
  menuId: fc.option(fc.uuid(), { nil: undefined }),
  quantity: fc.integer({ min: 1, max: 20 }),
  notes: fc.option(fc.string({ maxLength: 100 }), { nil: undefined }),
  menuItem: fc.option(menuArb, { nil: undefined }),
  name: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
})

export const orderArb: fc.Arbitrary<IOrder> = fc.record({
  id: fc.uuid(),
  customer_name: fc.string({ minLength: 1, maxLength: 50 }),
  table_number: fc.integer({ min: 1, max: 5 }),
  cart: fc.array(cartItemArb, { minLength: 0, maxLength: 10 }),
  status: fc.constantFrom('PENDING', 'PROCESSING', 'COMPLETED') as fc.Arbitrary<
    'PENDING' | 'PROCESSING' | 'COMPLETED'
  >,
  total: fc.integer({ min: 0, max: 10000000 }),
})
