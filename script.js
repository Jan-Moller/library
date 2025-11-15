const BASE_URL = "https://julias-library-default-rtdb.europe-west1.firebasedatabase.app/";
let library = [];

// Ensures the browser can repaint between heavy loop iterations
const nextFrame = () => new Promise(requestAnimationFrame);

async function init() {
    await includeHTML();
    startLoadingSpinner();
    await createBookLibraryArray();
    enableBackdropClose();
    await renderLibraryMain();
    endLoadingSpinner();
}


function startLoadingSpinner() {
    document.getElementById('loader').classList.remove('d-none');
}


function endLoadingSpinner() {
    document.getElementById('loader').classList.add('d-none');
    document.getElementById('loader').style.zIndex = "-1";
    document.querySelector('header').classList.remove('d-none'); 
    document.querySelector('main').classList.remove('d-none'); 
    
}


async function getData(path = "") {
    let response = await fetch(BASE_URL + path + ".json")
    return responseToJson = await response.json();
}


async function createBookLibraryArray() {
    let libraryJson = await getData("/books");
    let libraryJsonKeyArray = Object.keys(libraryJson);

    for (let i = 0; i < libraryJsonKeyArray.length; i++) {
        const key = libraryJsonKeyArray[i];
        library.push({
            id: key,
            author: libraryJson[key].author,
            edition: libraryJson[key].edition,
            listprice: libraryJson[key].listprice,
            publisher: libraryJson[key].publisher,
            rating: libraryJson[key].rating,
            status: libraryJson[key].status,
            summary: libraryJson[key].summary,
            title: libraryJson[key].title,
            uploadedimageurl: libraryJson[key].uploadedimageurl,
            year_published: libraryJson[key].year_published,
        })
    }
}


async function renderStatusMessage(i, maxBooks) {
    let currentBookRef = document.getElementById('current_books_loaded');
    let maxBookRef = document.getElementById('max_amount_books_loading');
    let currentBook = i + 1
    if (maxBookRef) maxBookRef.innerHTML = maxBooks;
    if (currentBookRef) currentBookRef.innerHTML = currentBook;
    await nextFrame();
}


function enableBackdropClose() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
                if (document.querySelectorAll('dialog[open]').length === 0) {
                    document.body.classList.remove('hidden');
                }
            }
        });

        dialog.addEventListener('close', () => {
            if (document.querySelectorAll('dialog[open]').length === 0) {
                document.body.classList.remove('hidden');
            }
        });
    });
}


function checkIfLibraryValuesAreNull() {
    for (let i = 0; i < library.length; i++) {
        const book = library[i];

        for (const key in book) {
            if (book[key] === null || book[key] === '' || book[key] === undefined) {
                book[key] = 'Keine Information verfügbar';
            }
        }
    }
}


function checkIfRatingIsNull(i) {
    let ratingRef = document.getElementById('book_rating');
    if (library[i].rating == 0.0) {
        ratingRef.innerHTML = 'Bewertung: N/A'
    }
}


async function renderLibraryMain() {
    let titleRef = document.getElementById('main_library_element');
    titleRef.innerHTML = '';

    const maxBooks = library.length;
    const maxBookRef = document.getElementById('max_amount_books_loading');
    if (maxBookRef) maxBookRef.innerHTML = maxBooks;
    await nextFrame();

    for (let i = 0; i < library.length; i++) {
        const title = library[i].title;
        titleRef.innerHTML += /*html*/`
        <figure class="main_library_book" onclick="openBookDetails(${i})">
            <figcaption class="main_library_figcaption">${title}</figcaption>
            <img class="main_library_cover_img" src="${library[i].uploadedimageurl}">
        </figure>`

        await renderStatusMessage(i, maxBooks)
    }
}


function openBookDetails(i) {
    let bookRef = document.getElementById('main_library_dialog');
    document.querySelector('body').classList.add('hidden');
    bookRef.innerHTML = '';
    bookRef.innerHTML = getTemplateMainLibraryBookInfo(i);
    checkIfRatingIsNull(i);
    bookRef.showModal();
}


function openAddNewBookDialog() {
    let newBookRef = document.getElementById('main_library_add_book');
    document.querySelector('body').classList.add('hidden');
    newBookRef.innerHTML = '';
    newBookRef.innerHTML = getTemplateAddNewBook();
    newBookRef.showModal();
}


function closeAddNewBookDialog() {
    let newBookRef = document.getElementById('main_library_add_book');
    newBookRef.close();
}


function addNewBookToLibrary(event) {
    event.preventDefault();
    let title = document.getElementById('main_library_book_title');
    let price = document.getElementById('main_library_book_price');
    let status = document.getElementById('main_library_book_status');
    let rating = document.getElementById('main_library_book_rating');
    let author = document.getElementById('main_library_book_author');
    let publisher = document.getElementById('main_library_book_publisher');
    let publishedYear = document.getElementById('main_library_book_published_year')
    let edition = document.getElementById('main_library_book_edition');
    let summary = document.getElementById('main_library_book_summary');
    let cover = document.getElementById('main_library_cover_img');

    let titleValue = title?.value.trim() || '';
    let priceValue = parseFloat(price?.value) || 0;
    let statusValue = status?.value || '';
    let ratingValue = parseFloat(rating?.value) || 0;
    let authorValue = author?.value.trim() || '';
    let publisherValue = publisher?.value.trim() || '';
    let publishedYearValue = publishedYear?.value.trim() || '';
    let editionValue = edition?.value.trim() || '';
    let summaryValue = summary?.value.trim() || '';
    let coverValue = cover?.value.trim() || '';

    library.push({
        "title": `${titleValue}`,
        "author": `${authorValue}`,
        "publisher": `${publisherValue}`,
        "year_published": `${publishedYearValue}`,
        "edition": `${editionValue}`,
        "summary": `${summaryValue}`,
        "listprice": `${priceValue}`,
        "rating": `${ratingValue}`,
        "status": `${statusValue}`,
        "uploadedimageurl": `${coverValue}`
    }
    )
    renderLibraryMain();
}


function openEditBookDialog(i) {
    let newBookRef = document.getElementById('main_library_add_book');
    document.body.classList.add('hidden');
    newBookRef.innerHTML = '';
    newBookRef.innerHTML = getTemplateEditBookInformation(i);
    newBookRef.showModal();
}


function updateBookToLibrary(event, i) {
    event.preventDefault();
    let title = document.getElementById('main_library_book_title');
    let price = document.getElementById('main_library_book_price');
    let status = document.getElementById('main_library_book_status');
    let rating = document.getElementById('main_library_book_rating');
    let author = document.getElementById('main_library_book_author');
    let publisher = document.getElementById('main_library_book_publisher');
    let publishedYear = document.getElementById('main_library_book_published_year')
    let edition = document.getElementById('main_library_book_edition');
    let summary = document.getElementById('main_library_book_summary');
    let cover = document.getElementById('main_library_cover_img');

    let titleValue = title?.value.trim() || '';
    let priceValue = parseFloat(price?.value) || 0;
    let statusValue = status?.value || '';
    let ratingValue = parseFloat(rating?.value) || 0;
    let authorValue = author?.value.trim() || '';
    let publisherValue = publisher?.value.trim() || '';
    let publishedYearValue = publishedYear?.value.trim() || '';
    let editionValue = edition?.value.trim() || '';
    let summaryValue = summary?.value.trim() || '';
    let coverValue = cover?.value.trim() || '';

    library[i].title = titleValue;
    library[i].author = authorValue;
    library[i].publisher = publisherValue;
    library[i].year_published = publishedYearValue;
    library[i].edition = editionValue;
    library[i].summary = summaryValue;
    library[i].listprice = priceValue;
    library[i].rating = ratingValue;
    library[i].status = statusValue;
    library[i].uploadedimageurl = coverValue;

    renderLibraryMain();
    openBookDetails(i);
}


function saveToLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}


function getFromLocalStorage() {
    if (!JSON.parse(localStorage.getItem("library"))) {
        checkIfLibraryValuesAreNull();
        return library
    }
    else {
        library = JSON.parse(localStorage.getItem("library"));
        checkIfLibraryValuesAreNull();
    }

}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


window.addEventListener('scroll', () => {
    const scrollImage = document.getElementById('scrollImage');

    if (window.scrollY > 120) {
        scrollImage.classList.remove('d-none');
    }
    else (scrollImage.classList.add('d-none'))
});
