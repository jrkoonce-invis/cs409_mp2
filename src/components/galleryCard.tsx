import { Link } from "react-router";

// Type imports
import type { PokemonSprite } from '../types';

const GalleryCard = ({ name, sprite, type, id }: PokemonSprite) => {
    return (
        <Link to={`/pokemon/${id}`} id="gallery-card-link">
            <div id="gallery-card" key={name}>
                {sprite ? <img src={sprite} alt={name} /> : <div>No image</div>}
                <p>{name}</p>
            </div>
        </Link>
    )
};

export default GalleryCard;