const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {

    let specialClass = '';
    if (pokemon.number === 1) {
        specialClass = 'bulbasaur-highlight';
    }

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function displayBulbasaurDetails() {
    pokeApi.getPokemonDetail({ url: 'https://pokeapi.co/api/v2/pokemon/1/' }).then((bulbasaur) => {
        const bulbasaurDetails = `
            <div class="bulbasaur-details">
                <img src="${bulbasaur.photo}" alt="${bulbasaur.name}" class="bulbasaur-icon">
                <h2>${bulbasaur.name}</h2>
                <p>Number: #${bulbasaur.number}</p>
                <p>Type: ${bulbasaur.type}</p>
                <p>Special Traits: Grass & Poison</p>
                <p>Evolution: Ivysaur </p>
                <p>Weight: 6.9kg</p>
                <!-- Adicione mais informações conforme necessário -->
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', bulbasaurDetails);
    });
}

displayBulbasaurDetails();
loadPokemonItens(offset, limit);





loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})