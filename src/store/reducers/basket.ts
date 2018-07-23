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

interface SetBasketVisibility {
  type: 'SetBasketVisibility';
  showing: boolean;
}

export function SetBasketVisibility(showing: boolean): SetBasketVisibility {
  return {
    type: 'SetBasketVisibility',
    showing,
  };
}

export type BasketAction = SetBasketId | SetBasketVisibility;

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
    default: {
      return state;
    }
  }
}
