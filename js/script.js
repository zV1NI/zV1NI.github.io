const pokemonName = document.querySelector('.pokemon_name');
const pokemonNum = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');


let searchPokemon = 1;


const fetchPokemon = async (pokemon) =>{

    const  APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonNum.innerHTML = '';


    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display='block';
    pokemonName.innerHTML = data.name;
    pokemonNum.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
     input.value='';
    searchPokemon = data.id;
}
    else{
        pokemonImg.style.display='none';
        pokemonName.innerHTML = 'Not Found';
    }

}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log('enviando formulario...')
    renderPokemon(input.value.toLowerCase());
    input.value = '';
}
)

btnPrev.addEventListener('click', () =>{

    if(searchPokemon > 1)
    {searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
  
}
)

btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
  )

  renderPokemon(searchPokemon);