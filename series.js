const marvelApiUrl = "https://gateway.marvel.com/v1/public/";
const marvelEndpoints = {
  characters: {
    series: "characters/{characterId}/series"
  }
};
const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get('characterId');

const getSeries = () => {
  fetch(`${marvelApiUrl}${marvelEndpoints.characters.series.replace('{characterId}', characterId)}?apikey=${apikey.public}`)
    .then(response => response.json())
    .then(response => {
      const series = response.data.results;
      createSeriesCards(series);
    })
    .catch(err => console.log(err));
};

const createSeriesCards = (series) => {
  const seriesCardsContainer = document.getElementById("seriesCardsContainer");

  series.forEach(series => {
    const src = `${series.thumbnail.path}.${series.thumbnail.extension}`;
    const seriesCard = `
      <div class="card">
        <img class="series" src="${src}" alt="">
        <div class="series-intro">
          <h1>${series.title}</h1>
          <p>${series.description}</p>
          <h3>Characters</h3>
          <ul>
            ${series.characters.items.map(character => `<li>${character.name}</li>`).join("")}
          </ul>
          <h3>Creators</h3>
          <ul>
            ${series.creators.items.map(creator => `<li>${creator.name}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    seriesCardsContainer.innerHTML += seriesCard;
  });
};

getSeries();