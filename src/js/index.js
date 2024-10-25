// src/js/index.js
import axios from 'axios';

async function fetchBooksByCategory(category) {
  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
    return response.data.works; // Accedi ai lavori dal risultato
  } catch (error) {
    console.error('Errore durante il fetch dei libri:', error);
    alert('Si è verificato un errore nel recupero dei dati.');
    return [];
  }
}

async function fetchBookDescription(key) {
  try {
    const response = await axios.get(`https://openlibrary.org${key}.json`);
    let description = response.data.description;

    if (typeof description === 'object' && description.value) {
      description = description.value;
    }

    // Se la descrizione è una stringa, rimuovi i tag HTML
    if (typeof description === 'string') {
      description = description.replace(/<[^>]*>/g, ''); // Rimuovi i tag HTML
    }

    return description || "Descrizione non disponibile.";
  } catch (error) {
    console.error('Errore durante il fetch della descrizione:', error);
    alert('Si è verificato un errore nel recupero della descrizione del libro.');
    return "Descrizione non disponibile.";
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
    authorsEl.innerText = `Autori: ${book.authors.map(author => author.name).join(', ')}`;

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
    alert("Inserisci una categoria.");
    return;
  }

  // Mostra messaggio di caricamento
  resultsContainer.innerHTML = '<p class="text-gray-600">Caricamento in corso...</p>';

  try {
    const books = await fetchBooksByCategory(category);

    if (books.length === 0) { // Verifica se non ci sono risultati
      resultsContainer.innerHTML = '<p class="text-red-500">Nessun risultato trovato per questa categoria. Assicurati di aver digitato correttamente.</p>';
    } else {
      displayBooks(books);
    }
  } catch (error) {
    resultsContainer.innerHTML = '<p class="text-red-500">Errore nel recupero dei dati.</p>';
  }
});

