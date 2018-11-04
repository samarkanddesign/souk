import * as React from 'react';
import { SaveCardMutation, SAVE_CARD } from '../../graphql/mutations';
import { StripeCardForm } from './StripeCardForm';

interface Props {
  refetchCards: () => void;
}

export const CardForm = ({ refetchCards }: Props) => {
  return (
    <SaveCardMutation mutation={SAVE_CARD}>
      {saveCard => {
        return (
          <div>
            <StripeCardForm
              saveCard={token => {
                saveCard({
                  variables: { token },
                }).then(r => {
                  if (r && r.data && r.data.saveCard.error) {
                    alert(r.data.saveCard.error);
                    return;
                  }

                  refetchCards();
                });
              }}
            />
          </div>
        );
      }}
    </SaveCardMutation>
  );
};

export default CardForm;
