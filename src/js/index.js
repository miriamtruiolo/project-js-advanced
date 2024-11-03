import "../css/input.css"; 

import axios from 'axios';
import _ from 'lodash';

function handleError(error, context) {
  console.error(`Error in ${context}:`, error); // Log dell'errore con il contesto
  alert('An unexpected error occurred. Please try again later.'); // Messaggio di errore generico
}

async function fetchBooksByCategory(category) {
  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
    return _.get(response, 'data.works', []); 
  } catch (error) {
    console.error('Error during books fetch:', error);
    alert('An error occurred while fetching the books. Please try again later.');
    handleError(error, 'fetchBooksByCategory');
    return [];
  }
}

async function fetchBookDescription(key) {
  try {
    const response = await axios.get(`https://openlibrary.org${key}.json`);
    let description = _.get(response, 'data.description', "Description not available.");

    if (typeof description === 'object' && description.value) {
      description = description.value;
    }

    if (typeof description === 'string') {
      description = description.replace(/<[^>]*>/g, ''); 
    }

    return description || "Description not avilable.";
  } catch (error) {
    console.error('Error during book description fetch:', error);
    alert('An error occurred while fetching the book description. Please try again later.');
    handleError(error, 'fetchBookDescription');
    return "Description not avilable.";
  }
}

function displayBooks(books) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  books.forEach(book => {
    console.log('book: ', book);
    const bookDiv = document.createElement('div');
    bookDiv.className = "border-b border-gray-300 py-2 cursor-pointer hover:bg-gray-200";

    const titleEl = document.createElement('h3');
    titleEl.className = "text-xl font-semibold";
    titleEl.innerText = book.title;

    const authorsEl = document.createElement('p');
    authorsEl.className = "text-gray-600";
    authorsEl.innerText = `Author: ${book.authors.map(author => author.name).join(', ')}`;

    bookDiv.addEventListener('click', async () => {
      const description = await fetchBookDescription(book.key);
      alert(description);
    });

    bookDiv.appendChild(titleEl);
    bookDiv.appendChild(authorsEl);
    resultsContainer.appendChild(bookDiv);
  });
}

document.getElementById('searchButton').addEventListener('click', async () => {
  const categoryInput = document.getElementById('categoryInput');
  const category = categoryInput.value.trim();
  const resultsContainer = document.getElementById('resultsContainer');

  if (!category) {
    alert("Please enter a category.");
    return;
  }

  // Mostra messaggio di caricamento
  resultsContainer.innerHTML = '<p class="text-gray-200">Loading...</p>';

  try {
    const books = await fetchBooksByCategory(category);

    if (books.length === 0) { // Verifica se non ci sono risultati
      resultsContainer.innerHTML = '<p class="text-gray-200">No results found. Please check your category.</p>';
    } else {
      displayBooks(books);
    }
  } catch (error) {
    console.error('Error during books fetch in search button handler:', error);
    resultsContainer.innerHTML = '<p class="text-gray-200">An error occurred while retrieving data. Please try again.</p>';
    handleError(error, 'searchButton click handler');
  }
});

