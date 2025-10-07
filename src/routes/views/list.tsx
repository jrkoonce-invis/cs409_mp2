    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    // Component Imports
    import ListCard from '../../components/listCard';

    // Type Imports
    import type { PokemonListEntry, PokemonDetail, PokemonSprite } from '../../types';

    const ListView = () => {
        const [pokemonSprites, setPokemonSprites] = useState<PokemonSprite[]>([]);
        const [loading, setLoading] = useState<boolean>(true);

        const [search, setSearch] = useState<string>("");
        const [sortType, setSortType] = useState<'id' | 'alphabetical'>('id');
        const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

        const fetchPokemonSprites = async () => {
            try {
                // Fetch the first 151 Pokémon
                const response = await axios.get<{ results: PokemonListEntry[] }>(
                'https://pokeapi.co/api/v2/pokemon?limit=151'
                );
                const pokemonList = response.data.results;

                // Fetch details for each Pokémon to get the sprite
                const details = await Promise.all(
                pokemonList.map(entry => axios.get<PokemonDetail>(entry.url))
                );

                // Extract sprite and name for each
                const sprites: PokemonSprite[] = details.map(detail => ({
                    name: detail.data.name,
                    sprite: detail.data.sprites.front_default,
                    type: detail.data.types[0]?.type.name || "unknown",
                    id: detail.data.id,
                }));

                setPokemonSprites(sprites);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon sprites:', error);
                setLoading(false);
            }
            };

        useEffect(() => {
            fetchPokemonSprites();
        }, []);

        if (loading) return <p>Loading Pokémon...</p>;

        // Sorting logic
        const sortedSprites = [...pokemonSprites].sort((a, b) => {
            let result = 0;
            if (sortType === 'id') {
            result = a.id - b.id;
            } else {
            result = a.name.localeCompare(b.name);
            }
            return sortOrder === 'asc' ? result : -result;
        });

        // return pokemon names with search bar input
        const filteredSprites = sortedSprites.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <div id="main-content">
                <div>
                    <div>
                        <label>Search:</label>
                        <input id="search-bar" type="text" placeholder="Enter Pokémon name" value={search} onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="sort-dropdown">Sort:</label>
                        <select id="sort-dropdown" value={sortType} onChange={e => setSortType(e.target.value as 'id' | 'alphabetical')}>
                        <option value="id">By ID</option>
                        <option value="alphabetical">Alphabetically</option>
                    </select>
                    <label>
                        <input type="radio" name="sortOrder" value="asc" checked={sortOrder === 'asc'} onChange={() => setSortOrder('asc')}/> 
                        Ascending
                    </label>
                    <label>
                        <input type="radio" name="sortOrder" value="desc" checked={sortOrder === 'desc'} onChange={() => setSortOrder('desc')}/> 
                        Descending
                    </label>
                    </div>
                </div>
                <div id="pokemon-list">
                    {filteredSprites.map(({ name, sprite, type, id }: PokemonSprite) =>
                        <ListCard key={id} name={name} sprite={sprite} id={id} type={type} />
                    )}
                </div>
            </div>
        );
    };

    export default ListView;