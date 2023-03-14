const marvelApiUrl = "https://gateway.marvel.com/v1/public/";
const marvelEndpoints = {
  characters: {
    stories: "characters/{characterId}/stories"
  }
};
const apikey = {
  "public": "806b81d4cced1d3c9786e1f650404534",
  "private": "276d812b63c4b7a29d961ce0aa150a6db084d678"
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get('characterId');

const getStories = () => {
  fetch(`${marvelApiUrl}${marvelEndpoints.characters.stories.replace('{characterId}', characterId)}?apikey=${apikey.public}`)
    .then(response => response.json())
    .then(response => {
      const stories = response.data.results;
      createStoryCards(stories);
    })
    .catch(err => console.log(err));
};

const createStoryCards = (stories) => {
  const storyCardsContainer = document.getElementById("storyCardsContainer");

  stories.forEach(story => {
    let src = "";
    if (story.thumbnail && story.thumbnail.path && story.thumbnail.extension) {
      src = `${story.thumbnail.path}.${story.thumbnail.extension}`;
    } else {
      src = "https://via.placeholder.com/150?text=Not+Found";
    }
    const storyCard = `
      <div class="card">
        <img class="story" src="${src}" alt="">
        <div class="story-intro">
          <h1>${story.title}</h1>
          <p>${story.description}</p>
          <h3>Characters</h3>
          <ul>
            ${story.characters.items.map(character => `<li>${character.name}</li>`).join("")}
          </ul>
          <h3>Creators</h3>
          <ul>
            ${story.creators.items.map(creator => `<li>${creator.name}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    storyCardsContainer.innerHTML += storyCard;
  });
};


getStories();
