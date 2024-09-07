import { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MAX_POKEMON = 151;

const Home = () => {
  const [filterPokemon, setFilterPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filterOptions, setFilterOptions] = useState("number");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  async function fetchPokemonDataBeforeRedirect(id: string) {
    try {
        await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
          res.json();
        }),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => {
          res.json();
        }),
      ]);
      return true;
    } catch (error) {
      console.error("Failed to fetch Pokemon data before redirect");
    }
  }

  async function handleCardClick(pokemonID: string) {
    const success = await fetchPokemonDataBeforeRedirect(pokemonID);
    if (success) {
      navigate(`./details?id=${pokemonID}`);
    }
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then(function (response) {
        setAllPokemon(response.data.results);
        setFilterPokemon(response.data.results);
      });
  }, []);

  useEffect(() => {
    if (filterOptions === "number") {
      setFilterPokemon(
        allPokemon.filter((pokemon: any) => {
          const pokemonID = pokemon.url.split("/")[6];
          return pokemonID.startsWith(searchInput);
        })
      );
    } else if (filterOptions === "name") {
      setFilterPokemon(
        allPokemon.filter((pokemon: any) =>
          pokemon.name.toLowerCase().startsWith(searchInput)
        )
      );
    } else {
      setFilterPokemon(allPokemon);
    }
  }, [searchInput]);

  return (
    <div className="main">
      <HomeHeader
        filterOptions={filterOptions}
        searchInput={searchInput}
        setFilterOptions={setFilterOptions}
        setSearchInput={setSearchInput}
      />
      <section className="pokemon-list">
        {filterPokemon.length !== 0 ? (
          <div className="container">
            <div className="list-wrapper">
              {filterPokemon.map((pokemon: any) => {
                const pokemonID = pokemon.url.split("/")[6];
                return (
                  <button
                    className="list-item"
                    onClick={() => handleCardClick(pokemonID)}
                    key={pokemon.id}
                  >
                    <div className="number-wrap">
                      <p className="caption-fonts">#{pokemonID}</p>
                    </div>
                    <div className="img-wrap">
                      <img
                        src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                        alt={`${pokemon.name}`}
                      />
                    </div>
                    <div className="name-wrap">
                      <p className="body3-fonts">#{pokemon.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div id="not-found-message">Pokemon not found</div>
        )}
      </section>
    </div>
  );
};

export default Home;
