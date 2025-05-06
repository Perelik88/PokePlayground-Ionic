export interface PokemonDetails {
    id: number;
    name: string;
    sprites: Sprite;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Ability[];
}

export interface Sprite {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
}

export interface Ability {
    ability: AbilityDetails;
    is_hidden: boolean;
    slot: number;
}
export interface AbilityDetails {
    name: string;
    url: string;
}
