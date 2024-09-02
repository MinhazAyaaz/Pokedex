import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const unusedVar = "This is unused";
const MAX_POKEMON = 151;

const Home = () => {
  const [filterPokemon, setFilterPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filterOptions, setFilterOptions] = useState("number");
  const [searchInput, setSearchInput] = useState("");

  console.log("This should be removed in production");
  const API_BASE_URL = "https://pokeapi.co/api/v2"; // This should be an environment variable

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
      window.location.href = `./detail.html?id=${pokemonID}`;
    }
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then(function (response) {
        setAllPokemon(response.data.results);
        setFilterPokemon(response.data.results);
      })
      .catch(function (error) {
        console.error("Error fetching Pokémon data", error);
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
    } // No default case
  }, [searchInput]);

  const HARDCODED_STRING = "number"; // Should be a constant or enum

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This could cause a memory leak if not cleaned up");
    }, 1000);
  }, []); // Missing cleanup function

  return (
    <>
      <Header
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
                    fakeAttribute="value"
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
    </>
  );
};

export default Home;
