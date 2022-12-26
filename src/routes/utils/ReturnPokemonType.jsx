import bug from '../../assets/typesPokemon/Bug.png'
import dark from '../../assets/typesPokemon/Dark.png'
import dragon from '../../assets/typesPokemon/Dragon.png'
import electric from '../../assets/typesPokemon/Electric.png'
import fairy from '../../assets/typesPokemon/Fairy.png'
import fighting from '../../assets/typesPokemon/Fighting.png'
import fire from '../../assets/typesPokemon/Fire.png'
import flying from '../../assets/typesPokemon/Flying.png'
import ghost from '../../assets/typesPokemon/Ghost.png'
import grass from '../../assets/typesPokemon/Grass.png'
import ground from '../../assets/typesPokemon/Ground.png'
import ice from '../../assets/typesPokemon/Ice.png'
import normal from '../../assets/typesPokemon/Normal.png'
import poison from '../../assets/typesPokemon/Poison.png'
import psychic from '../../assets/typesPokemon/Psychic.png'
import rock from '../../assets/typesPokemon/Rock.png'
import steel from '../../assets/typesPokemon/Steel.png'
import water from '../../assets/typesPokemon/Water.png'



export const getTypes = (type) => {
    switch (type) {
        case "bug":
            return bug;
        case "dark":
            return dark;
        case "dragon":
            return dragon;
        case "electric":
            return electric;
        case "fairy":
            return fairy;
        case "fighting":
            return fighting;
        case "fire":
            return fire;
        case "flying":
            return flying;
        case "ghost":
            return ghost;
        case "grass":
            return grass;
        case "ground":
            return ground;
        case "ice":
            return ice;
        case "normal":
            return normal;
        case "poison":
            return poison;
        case "psychic":
            return psychic;
        case "rock":
            return rock;
        case "steel":
            return steel;
        case "water":
            return water;
        default:
            return water;
    }
}