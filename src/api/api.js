const API_KEY = 'AIzaSyB0Hi1KNph95QBxq5LeEKtCl14cAJdw6Ps'; // Replace with your actual API key

export const searchVideos = (query) => {
  //return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=football full match ${query}&key=${API_KEY}&maxResults=10`)
  return fetch(`/test.json`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};