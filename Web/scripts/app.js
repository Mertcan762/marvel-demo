const apikey = {
  "public": "5e75c9eafd6e5879b788b29bca630e88",
  "private": "2d73d2aa6d7deea4b6944c4291305a0051b10a0f"
}
const marvelApiUrl = 'https://gateway.marvel.com';
const marvelEndpoints = {
  characters: {
    list: '/v1/public/characters',
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  fetch(`${marvelApiUrl}${marvelEndpoints.characters.list}?apikey=${apikey.public}`)
});


