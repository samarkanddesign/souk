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
}

export type BasketAction = SetBasketId;

export function basketReducer(
  state: BasketState = {},
  action: BasketAction,
): BasketState {
  switch (action.type) {
    case 'SetBasketId': {
      return { ...state, basketId: action.basketId };
    }

    default: {
      return state;
    }
  }
}
