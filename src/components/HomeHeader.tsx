import Pokeball from "../assets/pokeball.svg";
import Search from "../assets/search.svg";
import Cross from "../assets/cross.svg";
import Sorting from "../assets/sorting.svg";
import { useState } from "react";

interface HeaderProps {
  filterOptions?: string;
  searchInput?: string;
  setSearchInput?: (e: any) => void;
  setFilterOptions?: (e: any) => void;
}

const HomeHeader = ({
  filterOptions,
  searchInput,
  setSearchInput,
  setFilterOptions,
}: HeaderProps) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const onFilterChange = (e: any) => {
    setFilterOptions?.(e.target.value);
  };

  return (
    <header className="w-[90%]">
      <div className="w-full m-0 flex gap-16 mt-6 justify-center">
        <div className="flex items-center">
          <img className="mr-4" src={Pokeball} alt="Pokeball" />
          <h1 className="text-grayscale-white">Pokedex</h1>
        </div>
        <div className="flex items-center gap-4 w-[40%]">
          <div className="flex items-center w-full relative bg-red-100 rounded-[16px] shadow-drop-inner h-8 gap-2">
            <img src={Search} alt="Search" className="ml-4 text-identity-primary" />
            <input
              type="text"
              placeholder="Search"
              id="search-input"
              className="w-[60%] border-none search-input text-xs bg-red-100"
              value={searchInput}
              onChange={(event) => {
                setSearchInput?.(event.target.value.toLowerCase());
              }}
            />
            {searchInput !== "" && (
              <button className="absolute right-4 cursor-pointer" id="search-close-icon" onClick={() => setSearchInput?.("")}>
                <img
                  src={Cross}
                  alt="cross icon"
                />
              </button>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowFilterOptions(!showFilterOptions)} className="bg-grayscale-white rounded-[100%] min-w-8 min-h-8 shadow-drop-inner flex items-center justify-center relative">
              <img
                src={Sorting}
                alt="Sorting"
                className="sort-icon"
                id="sort-icon"
                
              />
            </button>
            {showFilterOptions && <div className="absolute bg-identity-primary border-4 border-solid border-identity-primary border-t-0 rounded-xl px-1 pt-0 pb-1 r-0 shadow-drop-hover min-w-[113px] top-[40px] z-[5000]">
              <p className="text-body2">Sort by:</p>
              <div className="bg-grayscale-white shadow-drop-inner py-4 px-5 rounded-lg flex flex-col gap-4">
                
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="name"
                    name="filters"
                    value="name"
                    className="accent-identity-primary"
                    checked={filterOptions === "name"}
                    onChange={onFilterChange}
                  />
                  <label htmlFor="name" className="text-body3">
                    Name
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="number"
                    name="filters"
                    value="number"
                    className="accent-identity-primary"
                    checked={filterOptions === "number"}
                    onChange={onFilterChange}
                  />
                  <label htmlFor="number" className="text-body3">
                    Number
                  </label>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
