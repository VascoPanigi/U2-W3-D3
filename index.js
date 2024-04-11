// Devi realizzare una pagina per una “libreria” contenenente libri derivanti da una
// chiamata HTTP di tipo GET. Endpoint: https://striveschool-api.herokuapp.com/books
// Requisiti della pagina:
// ●Utilizza Bootstrap 5 per creare una pagina responsive con
// una sezione centrale a 3 o 4 colonne per riga
// ●Ogni colonna avrà al suo interno un elemento Card di Bootstrap, creata a partire da un
// singolo libro: nella “card image” inserisci la copertina del libro, nel “card body” il
// suo titolo e il suo prezzo.
// ●Sempre nel “card body” inserisci un pulsante “Scarta”.
// Se premuto, dovrà far scomparire la card dalla pagina.

// ●EXTRA: crea una lista che rappresenti il carrello del negozio e inseriscila dove vuoi
// nella pagina. Aggiungi un altro pulsante “Compra ora” vicino a “Scarta” nelle card
// per aggiungere il libro al carrello. Il carrello dovrà persistere nello storage del
// browser.
// ●EXTRA: aggiungi vicino ad ogni libro del carrello un pulsante per rimuoverlo dal carrello

const fetchBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }
        throw new Error("Generic Fetch Error");
      }
    })
    .then((libraryData) => {
      //dopo essere sicuri di avere i dati, ciclo e per ogni elemento dentro la mia API
      //creo una card
      libraryData.forEach((book) => {
        const row = document.getElementById("books-row");
        const col = document.createElement("col");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
                        <img src=${book.img} class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p>${book.price} $ </p>
                        <div class='d-flex justify-content-between'> 
                        <button type="button" class="btn btn-warning discard-btn">Discard</button>
                        <button type="button" class="btn btn-primary add-to-cart-btn">Cart</button>
                        </div>
                        </div>`;

        //mi prendo la card e al click la rimuovo dallo schermo
        const discardButton = card.querySelector(".discard-btn");
        discardButton.addEventListener("click", () => {
          row.removeChild(col);
        });

        //pusho le card nel documento
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  fetchBooks();
};
