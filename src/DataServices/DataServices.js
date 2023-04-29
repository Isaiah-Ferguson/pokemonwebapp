import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

let pokeCall = ""
let PokeFav = ""
let PokeData = ""


// pokeInput.addEventListener('keydown', function (event) {
//     if (event.key === "Enter") {
//         pokeInput.value=pokeInput.value.toLowerCase();
//         if (/(\d)+/.test(pokeInput.value)) {
            
//             PokemonApiCall(pokeInput.value);
//         } else {
//             PokemonApiCall(pokeInput.value);
//         }
//     }
// });

// Btn.addEventListener('click', function () {
//     let rndNum = Math.floor(Math.random() * 649);
//     PokemonApiCall(rndNum);
// });

// favoriteBtn.addEventListener('click', function () {
//     if (PokeFav === '') {
//     } else {
//         saveToLocalStorageByName(PokeFav);
//         CreateElements();
//     }
// });

async function PokemonApiCall(pokemon) {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    PokeData = data;
    PokeFav = PokeData.name;
    
    let PokemoneName = PokeData.name.charAt(0).toUpperCase() + PokeData.name.slice(1) + ', #' + PokeData.order;
    let PokemonType = "Type: " + PokeData.types.map(element => " " + element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1));
    let PokemonAbility = "Abilities: " + PokeData.abilities.map(element => " " + element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1));
    let PokemonMoves = PokeData.moves.map(element => " " + element.move.name);

    let pokiObject = {
        sprite: data.sprites.other['official-artwork'].front_default,
        Evo: PokeFav,
        Name: PokemoneName,
        Type: PokemonType,
        Ability: PokemonAbility,
        Moves: PokemonMoves,
        ID: PokeData.id,
        Location: PokeData.location_area_encounters
    }
    return pokiObject;
};

async function PokeLocationCall(location) {
    const promise = await fetch(location);
    const data = await promise.json();
    PokeData = data;
    let pokemonLocation = "";
    if (PokeData.length === 0) {
        pokemonLocation = "Location: N/A"
    } else {
        pokemonLocation = "Location: " + PokeData[0].location_area.name.charAt(0).toUpperCase() + PokeData[0].location_area.name.slice(1);
    }
    return pokemonLocation;
};


async function PokeEvoCall(pokemon) {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon);
    const data = await promise.json();
    const promise1 = await fetch(data.evolution_chain.url);
    const data2 = await promise1.json();

    PokeData = data2;
     let pokemonEvo1 = "";

    if(PokeData.chain.evolves_to.length == 0){
         pokemonEvo1 = "No Evolution";
    }
    else if (PokeData.chain.evolves_to[0].evolves_to.length > 0) {
        let hope = ""
        PokeData.chain.evolves_to.forEach(evolution => hope = evolution.evolves_to[0].species.name);
        pokemonEvo1 = "Evolution: " + PokeData.chain.species.name + ", " + PokeData.chain.evolves_to.map(e => e.species).map(s => s.name) + ", " + hope;
    } else {if(PokeData.chain.evolves_to[0].evolves_to.length <= 0)
        pokemonEvo1 = "Evolution: " + PokeData.chain.species.name.charAt(0).toUpperCase() + PokeData.chain.species.name.slice(1) + ", " + PokeData.chain.evolves_to.map(e => e.species).map(s => s.name.charAt(0).toUpperCase() + s.name.slice(1)).join(", ");
        
    } 
    return pokemonEvo1
};

async function PokeDescriptionCall(pokemon) {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon);
    const data = await promise.json();
    const enFlavorText = data.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
    return enFlavorText;
}


// function CreateElements() {
//     let favorites = getLocalStorage();
//     favoritesHere.innerHTML = "";
//     favoritesBtnHere.innerHTML = "";
//     console.log(favorites)
//     favorites.map(pokemon => {
//         let div = document.createElement('div');
//         let h3 = document.createElement('h3');
//         let div2 = document.createElement('div');
//         let p = document.createElement('p');
//         p.classList = "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";

//         p.style.fontSize = "21px";
//         p.textContent = pokemon;
//         p.value = pokemon;
//         p.addEventListener('click', function () {
//             let pokemon = p.value;
//             PokeFetch(pokemon);
//         });

//         let deletebtn = document.createElement('button');
//         deletebtn.style.fontSize = "21px";
//         deletebtn.classList = "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";
//         deletebtn.textContent = 'Delete';
//         deletebtn.type = 'button';
//         deletebtn.addEventListener('click', function () {
//             removeFromLocalStorage(pokemon);
//             div.remove();
//             h3.remove()
//         });
//         h3.appendChild(deletebtn);
//         div.appendChild(p);
//         favoritesHere.append(div)
//         div2.appendChild(h3);
//         favoritesBtnHere.append(div2);
//     });
// };

export { PokeLocationCall, PokemonApiCall, PokeEvoCall, PokeDescriptionCall }