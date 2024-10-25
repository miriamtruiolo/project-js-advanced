/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("// src/js/index.js\n\nasync function fetchBooksByCategory(category) {\n  try {\n      const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);\n      const data = await response.json();\n      return data.works;\n  } catch (error) {\n      console.error('Errore durante il fetch dei libri:', error);\n      alert('Si è verificato un errore nel recupero dei dati.');\n      return [];\n  }\n}\n\nasync function fetchBookDescription(key) {\n  try {\n      const response = await fetch(`https://openlibrary.org${key}.json`);\n      const data = await response.json();\n      return data.description ? data.description : \"Descrizione non disponibile.\";\n  } catch (error) {\n      console.error('Errore durante il fetch della descrizione:', error);\n      alert('Si è verificato un errore nel recupero della descrizione del libro.');\n      return \"Descrizione non disponibile.\";\n  }\n}\n\nfunction displayBooks(books) {\n  const resultsContainer = document.getElementById('resultsContainer');\n  resultsContainer.innerHTML = '';\n\n  books.forEach(book => {\n      const bookDiv = document.createElement('div');\n      bookDiv.className = \"border-b border-gray-300 py-2 cursor-pointer hover:bg-gray-200\";\n\n      const titleEl = document.createElement('h3');\n      titleEl.className = \"text-xl font-semibold\";\n      titleEl.innerText = book.title;\n\n      const authorsEl = document.createElement('p');\n      authorsEl.className = \"text-gray-600\";\n      authorsEl.innerText = `Autori: ${book.authors.map(author => author.name).join(', ')}`;\n\n      bookDiv.addEventListener('click', async () => {\n          const description = await fetchBookDescription(book.key);\n          alert(description);\n      });\n\n      bookDiv.appendChild(titleEl);\n      bookDiv.appendChild(authorsEl);\n      resultsContainer.appendChild(bookDiv);\n  });\n}\n\ndocument.getElementById('searchButton').addEventListener('click', async () => {\n  const categoryInput = document.getElementById('categoryInput');\n  const category = categoryInput.value.trim();\n\n  if (!category) {\n      alert(\"Inserisci una categoria.\");\n      return;\n  }\n\n  const books = await fetchBooksByCategory(category);\n  displayBooks(books);\n});\n\n\n//# sourceURL=webpack://project-js-advanced/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"]();
/******/ 	
/******/ })()
;