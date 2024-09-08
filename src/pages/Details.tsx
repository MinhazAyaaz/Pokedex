import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BackToHome from "../assets/back-to-home.svg";
import ChevronLeft from "../assets/chevron_left.svg";
import ChevronRight from "../assets/chevron_right.svg";
import Weight from "../assets/weight.svg";
import Height from "../assets/height.svg";
import Pokedex from "../assets/pokedex.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  capitalizeFirstLetter,
  getEnglishFlavorText,
  getTypeColor,
  rgbaFromHex,
} from "../utils/helperFunctions";

const MAX_POKEMONS = 151;

const Details = () => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null); // Error 1: pokemon is initialized with 'null' instead of '{}'
  const [pokemonSpecies, setPokemonSpecies] = useState(null); // Error 2: The state type is not specified.
  const navigate = useNavigate();
  const pokemonId = useSearchParams()[0].get("id");
  const id = parseInt(pokemonId || "", 10);

  useEffect(() => {
    if (id < 1 || id >= MAX_POKEMONS) { // Error 3: The condition should be "id > MAX_POKEMONS" instead of "id >= MAX_POKEMONS"
      navigate("/"); 
      return;
    }

    setCurrentPokemonId(id);

    // Fetch Pokemon data and handle updates
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`), // Error 4: Extra slash at the end of the URL
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);

        setPokemon(pokemonRes.data);
        setPokemonSpecies(speciesRes.data);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error.message); // Error 5: 'error.message' should be 'error'
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    if (!loading && pokemon) {
      const rgbaColor = rgbaFromHex(
        getTypeColor(pokemon?.types?.[0]?.type?.name)
      );
      const color = getTypeColor(pokemon?.types?.[0]?.type?.name);

      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        .stats-wrap .progress-bar::-webkit-progress-bar {
            background-color: rgba(${rgbaColor}, 0.5); // Error 6: rgbaColor should be destructured into R, G, B components for this to work
        }
        .stats-wrap .progress-bar::-webkit-progress-value {
            background-color: ${color};
        }
      `;
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag); // Clean up when component unmounts or rerenders
      };
    }
  }, [loading, pokemon]);

  return (
    <>
      <div
        className="detail-main main"
        style={{
          backgroundColor: getTypeColor(pokemon?.types?.[0]?.type?.name),
          borderColor: getTypeColor(pokemon?.types?.[0]?.type?.name),
        }}
      >
        <header className="header">
          <div className="header-wrapper">
            <div className="header-wrap">
              <Link to="/" className="back-btn-wrap">
                <img
                  src={BackToHome}
                  alt="Back to Home"
                  className="back-btn"
                  id="back-btn"
                />
              </Link>
              <div className="name-wrap">
                <h1 className="name">{capitalizeFirstLetter(pokemon.name)}</h1> {/* Error 7: Accessing pokemon.name without null check */}
              </div>
            </div>
            <div className="pokemon-id-wrap">
              <p className="body2-fonts">`#${String(id).padStart(3, "0")}`</p> {/* Error 8: Backticks are not needed within JSX */}
            </div>
          </div>
        </header>
        <div className="featured-img">
          <Link
            to={`/details?id=${Math.max(1, currentPokemonId - 1)}`}
            className="arrow left-arrow"
            id="leftArrow"
          >
            <img src={ChevronLeft} alt="back" />
          </Link>
          <div className="detail-img-wrapper">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={pokemon.name} // Error 9: Accessing pokemon.name without null check
            />
          </div>
          <Link
            to={`/details?id=${Math.min(MAX_POKEMONS, currentPokemonId + 1)}`}
            className="arrow right-arrow"
            id="rightArrow"
          >
            <img src={ChevronRight} alt="forward" />
          </Link>
        </div>
        <div className="detail-card-detail-wrapper">
          <div className=" w-[50vw] flex flex-col gap-4">
          <div className="power-wrapper">
            {pokemon?.types?.map((type: any, index: number) => (
              <p
                key={index}
                className={`body3-fonts type`}
                style={{ backgroundColor: getTypeColor(type?.type?.name) }} // Error 10: type and type.name should be checked for null/undefined before access
              >
                {type?.type?.name}
              </p>
            ))}
          </div>
          <p className="body2-fonts about-text">About</p>
          <div className="pokemon-detail-wrapper">
            <div className="pokemon-detail-wrap">
              <div className="pokemon-detail">
                <img src={Weight} alt="weight" />
                <p className="body3-fonts weight">{pokemon?.weight / 10} kg</p>
              </div>
              <p className="caption-fonts">Weight</p>
            </div>
            <div className="pokemon-detail-wrap">
              <div className="pokemon-detail">
                <img src={Height} alt="height" />
                <p className="body3-fonts height">{pokemon?.height / 10} m</p>
              </div>
              <p className="caption-fonts">Height</p>
            </div>
            <div className="pokemon-detail-wrap">
              <div className="pokemon-detail move">
                {pokemon?.abilities?.map((ability: any, index: number) => (
                  <div key={index} className="body3-fonts">
                    {ability?.ability?.name}
                  </div>
                ))}
              </div>
              <p className="caption-fonts">Move</p>
            </div>
          </div>
          <p className="body3-fonts pokemon-description">
            {getEnglishFlavorText(pokemonSpecies)}
          </p>
          <p className="body2-fonts about-text">Base Stats</p>
          <div className="stats-wrapper">
            <div className="stats-wrap" data-stat="HP">
              <p
                className="body3-fonts stats"
                style={{ color: getTypeColor(pokemon?.types?.[0]?.type?.name) }}
              >
                HP
              </p>
              <p className="body3-fonts"></p>
              <progress
                value={pokemon?.stats?.[0]?.base_stat}
                max="100"
                className="progress-bar"
              ></progress>
            </div>
            <div className="stats-wrap" data-stat="ATK">
              <p
                className="body3-fonts stats"
                style={{ color: getTypeColor(pokemon?.types?.[0]?.type?.name) }}
              >
                ATK
              </p>
              <p className="body3-fonts"></p>
              <progress
                value={pokemon?.stats?.[1]?.base_stat}
                max="100"
                className="progress-bar"
              ></progress>
            </div>
            <div className="stats-wrap" data-stat="DEF">
              <p
                className="body3-fonts stats"
                style={{ color: getTypeColor(pokemon?.types?.[0]?.type?.name) }}
              >
                DEF
              </p>
              <p className="body3-fonts"></p>
              <progress
                value={pokemon?.stats?.[2]?.base_stat}
                max="100"
                className="progress-bar"
              ></progress>
            </div>
            <div className="stats-wrap" data-stat="SATK">
              <p
                className="body3-fonts stats"
                style={{ color: getTypeColor(pokemon?.types?.[0]?.type?.name) }}
              >
                SATK
              </p>
              <p className="body3-fonts"></p>
              <progress
                value={pokemon?.stats?.[3]?.base_stat}
                max="100"
                className="progress-bar"
              ></progress>
            </div>
          </div>
          </div>
        </div>
        <img src={Pokedex} alt="pokedex" className="detail-bg" />
      </div>
    </>
  );
};

export default Details;
