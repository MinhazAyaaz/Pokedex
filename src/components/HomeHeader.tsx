import Pokeball from "../assets/pokeball.svg";
import Search from "../assets/search.svg";
import Cross from "../assets/cross.svg";
import Sorting from "../assets/sorting.svg";

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
  const onFilterChange = (e: any) => {
    setFilterOptions?.(e.target.value);
  };

  return (
    <header className="header-home">
      <div className="container flex gap-16 mt-6">
        <div className="logo-wrapper">
          <img src={Pokeball} alt="Pokeball" />
          <h1>Pokedex</h1>
        </div>
        <div className="search-wrapper">
          <div className="search-wrap w-[350px]">
            <img src={Search} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              id="search-input"
              className="search-input body3-fonts"
              value={searchInput}
              onChange={(event) => {
                setSearchInput?.(event.target.value.toLowerCase());
              }}
            />
            {searchInput !== "" && (
              <button className="search-close-icon" id="search-close-icon" onClick={() => setSearchInput?.("")}>
                <img
                  src={Cross}
                  alt="cross icon"
                />
              </button>
            )}
          </div>
          <div className="sort-wrapper">
            <div className="sort-wrap">
              <img
                src={Sorting}
                alt="Sorting"
                className="sort-icon"
                id="sort-icon"
              />
            </div>
            <div className="filter-wrapper">
              <p className="body2-fonts">Sort by:</p>
              <div className="filter-wrap">
                <div>
                  <input
                    type="radio"
                    id="number"
                    name="filters"
                    value="number"
                    checked={filterOptions === "number"}
                    onChange={onFilterChange}
                  />
                  <label htmlFor="number" className="body3-fonts">
                    Number
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="name"
                    name="filters"
                    value="name"
                    checked={filterOptions === "name"}
                    onChange={onFilterChange}
                  />
                  <label htmlFor="name" className="body3-fonts">
                    Name
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
