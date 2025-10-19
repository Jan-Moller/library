async function init() {
    await includeHTML();
    enableBackdropClose();
    renderLibraryMain();
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

window.addEventListener('scroll', () => {
    const scrollImage = document.getElementById('scrollImage');

    if (window.scrollY > 120) {
        scrollImage.classList.remove('d-none');
    }
    else (scrollImage.classList.add('d-none'))
});

function checkIfLibraryValuesAreNull() {
    for (let i = 0; i < library.length; i++) {
        const book = library[i];

        for (const key in book) {
            if (book[key] === null || book[key] === '' || book[key] === undefined) {
                book[key] = 'Keine Information verfügbar';
            }
        }
    }
    saveToLocalStorage();
}

function checkIfRatingIsNull(i) {
    let ratingRef = document.getElementById('book_rating');
    if (library[i].rating == 0.0) {
        ratingRef.innerHTML = 'Bewertung: N/A'
    }
}

function renderLibraryMain() {
    getFromLocalStorage();
    let titleRef = document.getElementById('main_library_element');
    titleRef.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        const title = library[i].title;
        titleRef.innerHTML += /*html*/`
        <figure class="main_library_book" onclick="openBookDetails(${i})">
            <figcaption class="main_library_figcaption">${title}</figcaption>
            <img class="main_library_cover_img" src="${library[i].uploadedimageurl}">
        </figure>`
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
    saveToLocalStorage();
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

    saveToLocalStorage();
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



window.addEventListener('DOMContentLoaded', init);