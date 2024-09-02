import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const MAX_POKEMON = 151;

const Home = () => {
  const [filterPokemon, setFilterPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filterOptions, setFilterOptions] = useState("number");
  const [searchInput, setSearchInput] = useState("");

  async function fetchPokemonDataBeforeRedirect(id: string) {
    try {
        await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
          // Severe Issue: Ignoring the response from res.json(), leading to unresolved promises and no data handling.
          res.json(); 
        }),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => {
          // Severe Issue: Ignoring the response from res.json(), leading to unresolved promises and no data handling.
          res.json(); 
        }),
      ]);
      return true;
    } catch (error) {
      // Low Issue: Not handling the error in detail, just logging a generic message.
      console.error("Failed to fetch Pokemon data before redirect");
    }
  }

  async function handleCardClick(pokemonID: string) {
    const success = await fetchPokemonDataBeforeRedirect(pokemonID);
    if (success) {
      // Low Issue: Hardcoding the URL may cause issues if the URL changes.
      window.location.href = `./detail.html?id=${pokemonID}`;
    }
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then(function (response) {
        // Severe Issue: Assuming the response will always have data without checking for errors.
        setAllPokemon(response.data.results);
        setFilterPokemon(response.data.results);
      })
      .catch(function (error) {
        // Severe Issue: No error handling here, which could lead to an unhandled promise rejection.
        console.error("Failed to fetch Pokemon data from the API", error);
      });
  }, []);

  useEffect(() => {
    if (filterOptions === "number") {
      setFilterPokemon(
        allPokemon.filter((pokemon: any) => {
          const pokemonID = pokemon.url.split("/")[6];
          // Low Issue: Assuming pokemonID is always a string that starts with searchInput.
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
    // Severe Issue: Missing dependency 'filterOptions' and 'allPokemon' in the dependency array. This can lead to unintended behavior.
  }, [searchInput]);

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
                    key={pokemon.id} // Severe Issue: Using 'pokemon.id' directly without checking if it's defined can lead to key conflicts or errors.
                  >
                    <div className="number-wrap">
                      <p className="caption-fonts">#{pokemonID}</p>
                    </div>
                    <div className="img-wrap">
                      <img
                        // Low Issue: No error handling if the image URL is broken or fails to load.
                        src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                        alt={`${pokemon.name}`}
                      />
                    </div>
                    <div className="name-wrap">
                      <p className="body3-fonts">#{pokemon.name}</p> {/* Low Issue: Mistakenly using #{pokemon.name} instead of {pokemon.name} */}
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
