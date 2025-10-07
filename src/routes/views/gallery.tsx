import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
import GalleryCard from '../../components/galleryCard';

// Type Imports
import type { PokemonListEntry, PokemonDetail, PokemonSprite } from '../../types';

const GalleryView = () => {
    const [pokemonSprites, setPokemonSprites] = useState<PokemonSprite[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedType, setSelectedType] = useState<string>("all");    

    const fetchPokemonSprites = async () => {
        const response = await axios.get<{ results: PokemonListEntry[] }>(
            'https://pokeapi.co/api/v2/pokemon?limit=151'
        );
        const pokemonList = response.data.results;

        // For each pokemon url, axios get its details
        const details = await Promise.all(
            pokemonList.map(entry => axios.get<PokemonDetail>(entry.url))
        );

        const sprites: PokemonSprite[] = details.map(detail => ({
            name: detail.data.name,
            sprite: detail.data.sprites.front_default,
            type: detail.data.types[0]?.type.name || "unknown",
            id: detail.data.id,
        }));

        setPokemonSprites(sprites);
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemonSprites();
    }, []);

    if (loading) return <p>Loading Pokémon...</p>;

    return (
        <div id="main-content">

            <div id="gallery-filter-buttons">
                <button onClick={() => {setSelectedType("all")}}>All</button>
                <button onClick={() => {setSelectedType("fire")}}>Fire</button>
                <button onClick={() => {setSelectedType("water")}}>Water</button>
                <button onClick={() => {setSelectedType("grass")}}>Grass</button>
                <button onClick={() => {setSelectedType("electric")}}>Electric</button>
                <button onClick={() => {setSelectedType("ice")}}>Ice</button>
                <button onClick={() => {setSelectedType("fighting")}}>Fighting</button>
                <button onClick={() => {setSelectedType("poison")}}>Poison</button>
                <button onClick={() => {setSelectedType("ground")}}>Ground</button>
                <button onClick={() => {setSelectedType("psychic")}}>Psychic</button>
                <button onClick={() => {setSelectedType("bug")}}>Bug</button>
                <button onClick={() => {setSelectedType("rock")}}>Rock</button>
                <button onClick={() => {setSelectedType("ghost")}}>Ghost</button>
                <button onClick={() => {setSelectedType("dragon")}}>Dragon</button>
                <button onClick={() => {setSelectedType("normal")}}>Normal</button>
            </div>

            <div id="pokemon-gallery">
                {pokemonSprites.map(({ name, sprite, type, id }: PokemonSprite) =>
                    (selectedType !== "all" && type !== selectedType)
                        ? null
                        : <GalleryCard key={name} name={name} sprite={sprite} id={id} type={type} />
                )}
            </div>
        </div>
    );
};

export default GalleryView;