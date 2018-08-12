interface SetBasketId {
  type: 'SetBasketId';
  basketId: string;
}

export function SetBasketId(basketId: string): SetBasketId {
  return {
    type: 'SetBasketId',
    basketId,
  };
}

export interface BasketState {
  basketId?: string;
  showing: boolean;
}

export interface SetBasketVisibility {
  type: 'SetBasketVisibility';
  showing: boolean;
}

export function SetBasketVisibility(showing: boolean): SetBasketVisibility {
  return {
    type: 'SetBasketVisibility',
    showing,
  };
}

export interface ForgetBasket {
  type: 'ForgetBasket';
}

export function ForgetBasket(): ForgetBasket {
  return {
    type: 'ForgetBasket',
  };
}

export type BasketAction = SetBasketId | SetBasketVisibility | ForgetBasket;

const initialState = (): BasketState => ({ showing: false });

export function basketReducer(
  state: BasketState = initialState(),
  action: BasketAction,
): BasketState {
  switch (action.type) {
    case 'SetBasketId': {
      return { ...state, basketId: action.basketId };
    }
    case 'SetBasketVisibility': {
      return { ...state, showing: action.showing };
    }
    case 'ForgetBasket': {
      return { ...state, basketId: undefined };
    }
    default: {
      return state;
    }
  }
}
