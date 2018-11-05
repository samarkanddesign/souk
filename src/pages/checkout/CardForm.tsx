import * as React from 'react';
import { Option } from 'catling';

import { SaveCardMutation, SAVE_CARD } from '../../graphql/mutations';
import { StripeCardForm } from './StripeCardForm';

interface Props {
  refetchCards: () => void;
  onSaveCard?: (cardId: string) => void;
}

export const CardForm = ({ refetchCards, onSaveCard = () => null }: Props) => {
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
                  if (r && r.data) {
                    if (r.data.saveCard.error) {
                      alert(r.data.saveCard.error);
                      return;
                    }
                    // TODO: find a better way to set the newly added card
                    Option(r.data.saveCard.cards)
                      .flatMap(cards => Option(cards.reverse()[0]))
                      .map(card => card.id)
                      .forEach(onSaveCard);
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
