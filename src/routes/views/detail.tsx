import { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from 'axios';

// Type Imports
import type { PokemonDetailedProps } from '../../types';


const DetailView = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [pokemonInfo, setPokemonInfo] = useState<PokemonDetailedProps | null>(null);

    const currentId = id ? Number(id) : 1;
    const prevId = currentId === 1 ? 151 : currentId - 1;
    const nextId = currentId === 151 ? 1 : currentId + 1;

    const fetchPokemonInfo = async (id: number) => {
        const response = await axios.get<PokemonDetailedProps>(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setPokemonInfo(response.data)
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchPokemonInfo(Number(id));
    }, [currentId]);

    return (
        <div id="detail-content">

            <Link to={`/pokemon/${prevId}`} id="left-arrow">
                {"<"}
            </Link>
            <Link to={`/pokemon/${nextId}`} id="right-arrow">
                {">"}
            </Link>

            {loading ? <p>Loading...</p> : 
            
            pokemonInfo &&
            <div id="detail-view">
                <h2>
                    #{pokemonInfo.id} {pokemonInfo.name}
                </h2>
                <img src={pokemonInfo.sprites.other["official-artwork"].front_default} alt={pokemonInfo.name}/>
                {/* <p><strong>Type:</strong>{" "}{pokemonInfo.types[0].type.name}</p> */}
                <p><strong>Height:</strong> {pokemonInfo.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemonInfo.weight / 10} kg</p>
                <div>
                    {pokemonInfo.sprites.front_default && (
                        <img src={pokemonInfo.sprites.front_default} alt="Normal" />
                    )}
                    {pokemonInfo.sprites.front_shiny && (
                        <img src={pokemonInfo.sprites.front_shiny} alt="Shiny" />
                    )}
                </div>
            </div>
            
            }
        </div>
    );
};

export default DetailView;