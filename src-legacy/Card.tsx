import { CardDefinition, cardDefinitions } from './CardDefinitions';

export interface Card {
    readonly id: string;
    readonly type: CardDefinition;
    discarded: boolean;
}

/**
 * Algorithm taken from the sources of the original game
 */
function getRandomCardDefinitionIndex(): number {
    // non-linear randomness - most of the cards will the ones with lower number
    // CZ orig: nelineární náhodnost karty - nejvíce bude karet s nízkým číslem
    const cardNumber = Math.floor(Math.pow(Math.random(), 1.6) * 30);

    // The cards are grouped by type, the weak ones are starting from 0, from 10 and from 20, so this formula handles
    // choosing from them as if they were sorted by power
    // CZ orig: změna organizace pořadí karet - 3 skupiny od nejslabších po nejsilnější karty
    return Math.floor(cardNumber / 3) + (cardNumber % 3) * 10;
}

export function generateCard(): Card {
    const randomCardDefinitionIndex = getRandomCardDefinitionIndex();

    const randomCardDefinition = cardDefinitions[randomCardDefinitionIndex];
    if (randomCardDefinition === undefined) {
        throw new Error(`Card definition "${randomCardDefinitionIndex}" not found!`);
    }

    return {
        id: crypto.randomUUID(),
        type: randomCardDefinition,
        discarded: false,
    };
}
