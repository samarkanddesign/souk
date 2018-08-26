import * as React from 'react';
import { Button } from './';

// interface State {}

interface Props {
  saveCard: (token: string) => void;
}

export class CardForm extends React.Component<Props, any> {
  state = {
    handler: (window as any).StripeCheckout.configure({
      key: 'pk_test_CrdIYtIuU9RU1ZCkezeHLQVF',
      locale: 'auto',
      name: 'Samarkand Design',
      zipCode: true,
      panelLabel: 'Save card',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.props.saveCard(token.id);
      },
    }),
  };

  render() {
    return (
      <Button onClick={() => this.state.handler.open()} type="button">
        Add Card
      </Button>
    );
  }
}
