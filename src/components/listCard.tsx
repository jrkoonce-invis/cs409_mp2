import { Link } from "react-router";

// Type imports
import type { PokemonSprite } from '../types';

const ListCard = ({ name, sprite, type, id }: PokemonSprite) => {
    return (
        <Link to={`/pokemon/${id}`} id="list-card-link">
            <div id="list-card" key={name}>
                {sprite ? <img src={sprite} alt={name} /> : <div>No image</div>}
                <p>{name}</p>
                <p>ID: {id}</p>
                <p>Type: {type}</p>
            </div>
        </Link>
    )
};

export default ListCard;