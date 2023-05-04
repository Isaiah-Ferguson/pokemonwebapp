
let pokeCall = ""
let PokeFav = ""
let PokeData = ""


async function PokemonApiCall(pokemon) {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    console.log(data)
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

async function FavoritesPokemonApiCall(pokemon) {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    PokeData = data;
    PokeFav = PokeData.name;
    let PokeHeight = data.height;
    let PokeWeight = data.weight;
    let PokeOrder = data.order;

    let pokiObject = {
        Weight: PokeHeight,
        Height: PokeWeight,
        Order: PokeOrder,
        sprite: data.sprites.other['official-artwork'].front_default,

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



export { PokeLocationCall, PokemonApiCall, PokeEvoCall, PokeDescriptionCall, FavoritesPokemonApiCall }