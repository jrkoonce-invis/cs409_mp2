
// PokeAPI initial return structure
interface PokemonListEntry {
    name: string;
    url: string;
}

// The sprite data we want to use
interface SpriteData {
    front_default: string | null;
}

// The secondary fetch response structure
interface PokemonDetail {
    name: string;
    sprites: SpriteData;
    types: { type: { name: string } }[];
    id: number;
}

// The working structure
interface PokemonSprite {
    name: string;
    sprite: string | null;
    type: string;
    id: number;
}

// Most of the raw output from PokeAPI for detail view
interface PokemonDetailedProps {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
};

export type { PokemonListEntry, SpriteData, PokemonDetail, PokemonSprite, PokemonDetailedProps };