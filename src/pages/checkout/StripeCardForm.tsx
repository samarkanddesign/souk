import * as React from 'react';
import { Button } from '../../components';

interface Props {
  saveCard: (token: string) => void;
}

interface State {
  handler: { open: () => void };
}

export class StripeCardForm extends React.Component<Props, State> {
  readonly state: State = {
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
      // this handler needs to be called from an anonymous function to ensure
      // stripe allows showing the checkout page
      <Button onClick={() => this.state.handler.open()} type="button">
        Add Card
      </Button>
    );
  }
}
