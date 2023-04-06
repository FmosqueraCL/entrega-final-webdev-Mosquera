// Define your API key and query parameters as constants
const apiKey = 'pub_20091e4f68b41cd8e76526a46b76355a46b8c';
const query = 'TI OR tecnología OR informática OR software OR hardware language:spanish';

// Encode the query for URL
const encodedQuery = encodeURIComponent(query);

// Build the API URL using a template literal
const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_20091e4f68b41cd8e76526a46b76355a46b8c&q=IA&country=ar,cl,mx,es&language=es&category=technology `;

// Define an async function to fetch the data from the API
async function fetchData(url) {
  try {
    // Use async/await syntax to wait for the response and data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.log('Error fetching news:', error);
  }
}

async function displayNews() {
  // Select the element with class news-section using document.querySelector()
  const newsSection = document.querySelector('.news-section');
  const newsArticlesContainer = newsSection.querySelector('.news-articles');

  if (newsSection) {
    const data = await fetchData(apiUrl);
    console.log(data);
    const newsArticles = data.results;
    if (newsArticles) {
      const newsGrid = document.createElement('div');
      newsGrid.classList.add('news-grid');
      newsArticles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        const newsImage = document.createElement('img');
        newsImage.setAttribute('src', article.image_url);
        newsImage.setAttribute('alt', article.title);
        const newsTitle = document.createElement('h3');
        newsTitle.textContent = article.title;
        const newsDescription = document.createElement('p');
        newsDescription.textContent = article.summary;
        const newsLink = document.createElement('a');
        newsLink.setAttribute('href', article.url);
        newsLink.setAttribute('target', '_blank');
        newsLink.textContent = 'Leer más';
        newsArticle.appendChild(newsImage);
        newsArticle.appendChild(newsTitle);
        newsArticle.appendChild(newsDescription);
        newsArticle.appendChild(newsLink);
        newsGrid.appendChild(newsArticle);
      });
      newsArticlesContainer.appendChild(newsGrid);
    } else {
      console.log('No articles found');
    }
  }
}

// Call the displayNews function when the window loads
window.onload = displayNews;

