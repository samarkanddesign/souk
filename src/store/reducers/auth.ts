interface SetToken {
  type: 'SetToken';
  token: string;
}

export function SetToken(token: string): SetToken {
  return {
    type: 'SetToken',
    token,
  };
}

export interface AuthState {
  token?: string;
}

interface UnsetToken {
  type: 'UnsetToken';
}

export function UnsetToken(): UnsetToken {
  return {
    type: 'UnsetToken',
  };
}

export type AuthAction = SetToken | UnsetToken;

export const authReducer = (
  state: AuthState = { token: undefined },
  action: AuthAction,
) => {
  switch (action.type) {
    case 'SetToken': {
      return { ...state, token: action.token };
    }
    case 'UnsetToken': {
      return { ...state, token: undefined };
    }

    default: {
      return state;
    }
  }
};
