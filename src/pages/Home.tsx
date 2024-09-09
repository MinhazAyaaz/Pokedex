import { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MAX_POKEMON = 151;

const Home = () => {
  const [filterPokemon, setFilterPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filterOptions, setFilterOptions] = useState("name");
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
    <div className="m-0 p-0 bg-identity-primary h-screen w-screen flex flex-col items-center gap-4">
      <HomeHeader
        filterOptions={filterOptions}
        searchInput={searchInput}
        setFilterOptions={setFilterOptions}
        setSearchInput={setSearchInput}
      />
      <section className="bg-grayscale-white shadow-drop-inner rounded-[0.75rem] h-[90vh] flex w-[95%] overflow-y-auto">
        {filterPokemon.length !== 0 ? (
          <div className="w-full p-8">
            <div className="w-full mx-0 my-4 flex justify-center items-center flex-wrap gap-4">
              {filterPokemon.map((pokemon: any) => {
                const pokemonID = pokemon.url.split("/")[6];
                return (
                  <button
                    className="rounded-[8px] shadow-drop w-[8.85rem] h-[8.85rem] bg-grayscale-white text-center cursor-pointer no-underline hover:scale-105 duration-200"
                    onClick={() => handleCardClick(pokemonID)}
                    key={pokemon.id}
                  >
                    <div className="min-h-4 text-right px-2 py-0 text-grayscale-medium">
                      <p className="text-caption">#{pokemonID}</p>
                    </div>
                    <div className="w-[72px] h-[72px] m-auto">
                      <img
                        className="w-full h-full"
                        src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                        alt={`${pokemon.name}`}
                      />
                    </div>
                    <div className="border-[7px] bg-gray-100 py-6 pr-2 pb-1 pl-2 text-grayscale-dark border-gray-100 -mt-[18px]">
                      <p className="text-body3">#{pokemon.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div id="not-found-message" className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">Pokemon not found</div>
        )}
      </section>
    </div>
  );
};

export default Home;
