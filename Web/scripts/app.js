const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const marvelApiUrl = 'https://gateway.marvel.com';
const marvelEndpoints = {
  characters: {
    list: '/v1/public/characters',
    detail: '/v1/public/characters/{characterId}'
  },
  events: {
    list:"/v1/public/events"
  }
};

const template = (src, name, id, modified, available, stories, series) => `
  <div class="card" data-id="${id}">
    <img class="hero" src="${src}" alt="">
    <div class="intro">
      <h1>${name}</h1>
      <h2>${id}</h2>
      <h2>${modified}</h3>
      <span title="stories" id ="daire2">${stories}</span>
      <span title="series" id = "daire3">${series}</span>
      <span title="comics" id ="daire1">${available}</span>    
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("container");

  const getHeroes = () => {
    fetch(`${marvelApiUrl}${marvelEndpoints.characters.list}?apikey=${apikey.public}`)
      .then(response => response.json())
      .then(response => {
        response.data.results.forEach((hero) => {
          createCard(hero);
        });
      })
      .catch(err => console.log(err));
  };
  const getEvents = () => {
    fetch(`${marvelApiUrl}${}`)
  }
  const createCard = (hero) => {
    const series = `${hero.series.available}`;
    const stories = `${hero.stories.available}`;
    const available = `${hero.comics.available}`;
    const date = new Date(hero.modified);
    const src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    const heroCard = template(src, hero.name, hero.id, date.toLocaleDateString(), available, stories, series);
    container.innerHTML = container.innerHTML + heroCard;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        window.location.href = `hero.html?characterId=${id}`;
      });
    });
  };

  getHeroes();
});
