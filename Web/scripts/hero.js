const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const marvelApiUrl = 'https://gateway.marvel.com';
const marvelEndpoints = {
  characters: {
    detail: '/v1/public/characters/{characterId}',
    comics: '/v1/public/characters/{characterId}/comics',
    events: '/v1/public/characters/{characterId}/events',
    series: '/v1/public/characters/{characterId}/series',
    stories: '/v1/public/characters/{characterId}/stories'
  }
};

const template = (src, name, id, description, modified, comics, events, series, stories) => `
  <div class="card">
    <img class="hero" src="${src}" alt="">
    <div class="intro">
      <h1>${name}</h1>
      <h2>${id}</h2>
      <p>${description}</p>
      <h3>Last modified: ${modified}</h3>
      <span id ="daire1">${comics}</span>    
      <span id ="daire2">${events}</span>
      <span id ="daire3">${series}</span>
      <span id ="daire4">${stories}</span>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("container");
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get('characterId');

  const getCharacter = () => {
    fetch(`${marvelApiUrl}${marvelEndpoints.characters.detail.replace('{characterId}', characterId)}?apikey=${apikey.public}`)
      .then(response => response.json())
      .then(response => {
        const character = response.data.results[0];
        createCard(character);
      })
      .catch(err => console.log(err));
  };

  const createCard = (character) => {
    const comics = `${character.comics.available} Comics`;
    const events = `${character.events.available} Events`;
    const series = `${character.series.available} Series`;
    const stories = `${character.stories.available} Stories`;
    const date = new Date(character.modified);
    const src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    const characterCard = template(src, character.name, character.id, character.description, date.toLocaleDateString(), comics, events, series, stories);
    container.innerHTML = characterCard;
  };

  getCharacter();
});
