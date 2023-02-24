import { CardDefinition, cardDefinitions } from './CardDefinitions';

export class Card {
    private readonly id: string;
    private readonly type: CardDefinition;
    private discarded: boolean = false;

    constructor(type: CardDefinition) {
        this.id = crypto.randomUUID();
        this.type = type;
    }

    getId(): string {
        return this.id;
    }

    getType(): CardDefinition {
        return this.type;
    }

    wasDiscarded(): boolean {
        return this.discarded;
    }

    markAsDiscarded(): void {
        this.discarded = true;
    }
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export function generateCard(): Card {
    const randomCardDefinitionIndex = getRandomInt(cardDefinitions.length);

    const randomCardDefinition = cardDefinitions[randomCardDefinitionIndex];
    if (randomCardDefinition === undefined) {
        throw new Error(`Card definition "${randomCardDefinitionIndex}" not found!`);
    }
    return new Card(randomCardDefinition);
}
