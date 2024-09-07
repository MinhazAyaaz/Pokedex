export function capitalizeFirstLetter(string: string) {
if(string === undefined) return "";
  return string?.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function rgbaFromHex(hexColor: string) {
  return [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ].join(", ");
}
export function getEnglishFlavorText(pokemonSpecies: any): string {
    // Check if flavor_text_entries is defined and is an array
    const flavorTextEntries = pokemonSpecies?.flavor_text_entries;
    
    if (Array.isArray(flavorTextEntries)) {
      for (let entry of flavorTextEntries) {
        if (entry.language.name === "en") {
          return entry.flavor_text.replace(/\f/g, " ");
        }
      }
    }
    
    // Return an empty string if no English flavor text is found or if the array is invalid
    return "";
  }


  const typeColors: { [key: string]: string } = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    gray: "#EE99AC",
    fairy: "#ffc3d0",
    default: "#FFFFFF", // Default color for unknown types
  };
  
  export function getTypeColor(type: string): string {
    // Return the color if it exists in typeColors, otherwise return default color
    return typeColors[type] || typeColors.default;
  }
