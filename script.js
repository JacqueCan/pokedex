const pokedex = document.querySelector('.pokedex');

// Función para cargar y mostrar información de Pokémon
async function fetchAndDisplayPokemon() {
    try {
       //numero de pokemon que desea que aparezca
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
        const data = await response.json();

        // Limpia la sección de la Pokedex
        pokedex.innerHTML = '';

        // Recorre los resultados y muestra la información de los Pokémon
        data.results.forEach(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.innerHTML = `
                <h2>${pokemonData.name}</h2>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>Altura: ${pokemonData.height / 10} m</p>
                <p>Peso: ${pokemonData.weight / 10} kg</p>
            `;

            pokedex.appendChild(pokemonCard);
        });
    } catch (error) {
        console.error('Error al cargar los datos de Pokémon', error);
    }
}

// Llama a la función para cargar y mostrar Pokémon cuando la página se carga
window.addEventListener('load', fetchAndDisplayPokemon);