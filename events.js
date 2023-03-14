const marvelApiUrl = "https://gateway.marvel.com/v1/public/";
const marvelEndpoints = {
  characters: {
    events: "characters/{characterId}/events"
  }
};
const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get('characterId');

const getEvents = () => {
  fetch(`${marvelApiUrl}${marvelEndpoints.characters.events.replace('{characterId}', characterId)}?apikey=${apikey.public}`)
    .then(response => response.json())
    .then(response => {
      const events = response.data.results;
      createEventsCards(events);
    })
    .catch(err => console.log(err));
};

const createEventsCards = (events) => {
  const eventsCardsContainer = document.getElementById("eventsCardsContainer");

  if (events.length === 0) {
    eventsCardsContainer.innerHTML = "<p>NOT FOUND</p>";
    return;
  }

  events.forEach(events => {
    const src = `${events.thumbnail.path}.${events.thumbnail.extension}`;
    const eventsCard = `
      <div class="card">
        <img class="events" src="${src}" alt="">
        <div class="events-intro">
          <h1>${events.title}</h1>
          <p>${events.description}</p>
          <h3>Characters</h3>
          <ul>
            ${events.characters.items.map(character => `<li>${character.name}</li>`).join("")}
          </ul>
          <h3>Creators</h3>
          <ul>
            ${events.creators.items.map(creator => `<li>${creator.name}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    eventsCardsContainer.innerHTML += eventsCard;
  });
};


getEvents();
