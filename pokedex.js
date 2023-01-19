const pokeContainer$$ = document.querySelector("#pokedex");

const getPokemons = async () => { 
    const finalPokemons = [];
    for (let i = 1; i < 151; i++) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`);
    const res = await response.json();
    finalPokemons.push(res);
    }
    return finalPokemons
};

const mapPokemons = (pokemons) => {
    return pokemons.map((pokemon) => ({
        name : pokemon.name,
        image: pokemon.sprites['front_default'],
        type: pokemon.types[0].type.name,
        ability: pokemon.abilities[0].ability.name,
    }));
};

const pokeListado$$ = document.querySelector("ol");

const drawPokemons = (pokemons) => {
pokeContainer$$.innerHTML = "";  

    for (const pokemon of pokemons) {
        
        let pokemonFigure = document.createElement("li");
        pokemonFigure.className = "box";

        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", pokemon.image);
        pokemonImage.setAttribute("alt", pokemon.name);

        let pokemonName = document.createElement("h2");
        pokemonName.textContent = pokemon.name;

        let pokemonType = document.createElement("h5");
        pokemonType.textContent = pokemon.type;

        let pokemonAbility = document.createElement("h5");
        pokemonAbility.textContent = pokemon.ability;
    
        pokemonFigure.appendChild(pokemonImage);
        pokemonFigure.appendChild(pokemonName);
        pokemonFigure.appendChild(pokemonType);
        pokemonFigure.appendChild(pokemonAbility);
        pokeContainer$$.appendChild(pokemonFigure);
    }
};

const drawInput = (pokemons) => {
const input$$ = document.querySelector("input");
input$$.addEventListener("input", ()=>
    searchPokemons(input$$.value, pokemons)
    );
};

searchPokemons = (filtro, array) => {
    let filteredPokemons = array.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
    );
    drawPokemons(filteredPokemons);
};

const init = async () => {
    const pokemons = await getPokemons();
    const mappedPokemons = mapPokemons(pokemons);
    drawPokemons (mappedPokemons);
    drawInput(mappedPokemons);
}
init()