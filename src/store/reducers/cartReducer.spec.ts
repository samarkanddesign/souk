import cart, { AddProductToCart, RemoveProductFromCart } from './cartReducer';

describe('CartReducer', () => {
  it('adds a product to an empty cart', () => {
    const newState = cart(undefined, AddProductToCart('99'));
    expect(newState.items).toEqual([{ id: '99', quantity: 1 }]);
  });

  it('increases the quantity of a product already in the cart', () => {
    const newState = cart(
      { items: [{ id: '99', quantity: 2 }, { id: '101', quantity: 5 }] },
      AddProductToCart('99'),
    );
    expect(newState.items).toEqual([
      { id: '99', quantity: 3 },
      { id: '101', quantity: 5 },
    ]);
  });

  it('removes a product from the cart', () => {
    const newState = cart(
      { items: [{ id: '99', quantity: 2 }, { id: '101', quantity: 5 }] },
      RemoveProductFromCart('99'),
    );
    expect(newState.items).toEqual([{ id: '101', quantity: 5 }]);
  });
});
