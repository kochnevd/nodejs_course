import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import canonize from "./canonize";

const __DEV__ = true;

const app = express();
app.get('/canonize', function (req, res) {
  return res.json({
    url: req.query.url,
    username: canonize(req.query.url)
  });
});

const baseUrl = 'http://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'weight', 'height'];
// pokemon
// pokemon/1
async function getPokemons(url, i = 0) {
  // console.log('start query: ', url, i);
  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;
  if (__DEV__ && i > 1) {
    return pokemons;
  }
  if (page.next) {
    const pokemons2 = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemons2
    ];
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log('getPokemon', url);
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}

app.get('/', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map(info => {
      return getPokemon(info.url);
    });

    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map(pokemon => {
      return _.pick(pokemon, pokemonFields);
    });

    const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.weight);

    return res.json(sortPokemons);

  } catch (err) {
    console.log(err);
    return res.json({err});
  }

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


//const arr = [
//  "https://vk.com/igor.suvorov",
//  "https://twitter.com/suvorovigor",
//  "https://telegram.me/skillbranch",
//  "Https://Telegram.ME/SkillBranch",
//  "@skillbranch",
//  "https://vk.com/skillbranch?w=wall-117903599_1076"
//];
//
//arr.forEach((url) => {
//  const username = canonize(url);
//  console.log(username);
//});
//
