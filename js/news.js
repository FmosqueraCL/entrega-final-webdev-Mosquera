const apiKey = 'pub_20091e4f68b41cd8e76526a46b76355a46b8c';
const query = 'TI OR tecnología OR informática OR software OR hardware language:spanish';
const encodedQuery = encodeURIComponent(query);
const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_20091e4f68b41cd8e76526a46b76355a46b8c&q=IA&country=ar,cl,mx,es&language=es&category=business,technology,top `;
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching news:', error);
  }
}

async function displayNews() {
  const newsSection = document.querySelector('.news-section');
  const newsArticlesContainer = newsSection.querySelector('.news-articles');
  if (newsSection) {
    const data = await fetchData(apiUrl);
    console.log(data);
    const newsArticles = data.results;
    if (newsArticles) {
      const newsGrid = document.createElement('div');
      newsGrid.classList.add('news-grid');
      const filteredArticles = newsArticles.filter(article => article.image_url !== null);
      const fragment = document.createDocumentFragment();
      for (const article of filteredArticles) {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        const newsImage = document.createElement('img');
        newsImage.setAttribute('src', article.image_url);
        newsImage.setAttribute('alt', article.title);
        newsImage.classList.add('news-image');
        const newsCardBody = document.createElement('div');
        newsCardBody.classList.add('news-card-body');
        const newsTitle = document.createElement('h3');
        newsTitle.textContent = article.title;
        newsTitle.classList.add('news-title');
        const newsDescription = document.createElement('p');
        newsDescription.textContent = article.summary;
        newsDescription.classList.add('news-description');
        const newsLink = document.createElement('a');
        newsLink.setAttribute('href', article.link);
        newsLink.setAttribute('target', '_blank');
        newsLink.textContent = 'Leer más';
        newsLink.classList.add('news-link', 'btn');
        newsCardBody.appendChild(newsTitle);
        newsCardBody.appendChild(newsDescription);
        newsCardBody.appendChild(newsLink);
        newsCard.appendChild(newsImage);
        newsCard.appendChild(newsCardBody);
        newsArticle.appendChild(newsCard);
        fragment.appendChild(newsArticle);
      }
      newsGrid.appendChild(fragment);
      newsArticlesContainer.appendChild(newsGrid);
    }
  }
}

window.onload = displayNews;

