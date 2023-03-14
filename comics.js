const marvelApiUrl = "https://gateway.marvel.com/v1/public/";
const marvelEndpoints = {
  characters: {
    comics: "characters/{characterId}/comics"
  }
};
const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get('characterId');

const getComics = () => {
  fetch(`${marvelApiUrl}${marvelEndpoints.characters.comics.replace('{characterId}', characterId)}?apikey=${apikey.public}`)
    .then(response => response.json())
    .then(response => {
      const comics = response.data.results;
      createComicCards(comics);
    })
    .catch(err => console.log(err));
};

const createComicCards = (comics) => {
  const comicCardsContainer = document.getElementById("comicCardsContainer");

  comics.forEach(comic => {
    const src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    const comicCard = `
      <div class="card">
        <img class="comic" src="${src}" alt="">
        <div class="comic-intro">
          <h1>${comic.title}</h1>
          <p>${comic.description}</p>
          <p>Price: ${comic.prices[0].price}</p>
          <p>Page count: ${comic.pageCount}</p>
          <h3>Characters</h3>
          <ul>
            ${comic.characters.items.map(character => `<li>${character.name}</li>`).join("")}
          </ul>
          <h3>Creators</h3>
          <ul>
            ${comic.creators.items.map(creator => `<li>${creator.name}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    comicCardsContainer.innerHTML += comicCard;
  });
};

getComics();


