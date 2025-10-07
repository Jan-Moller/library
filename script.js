async function init() {
    await includeHTML();
    renderLibraryMain();
}

window.addEventListener('scroll', () => {
    const scrollImage = document.getElementById('scrollImage');

    if (window.scrollY > 120) {
        scrollImage.classList.remove('d-none');
    }
    else (scrollImage.classList.add('d-none'))
});

function renderLibraryMain() {
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
    bookRef.innerHTML = '';
    bookRef.innerHTML = getMainLibraryBookInfo(i);
    bookRef.showModal();

}

function openAddNewBookDialog() {
    let newBookRef = document.getElementById('main_library_add_book');
    newBookRef.innerHTML = '';
    newBookRef.innerHTML = /*html*/ `
    <form onsubmit="addNewBookToLibrary()" class="main_library_add_book main_library_dialog">
        <label for="main_library_book_title">Title</label>
        <input type="text" name="title" id="main_library_book_title">
        <label for="main_library_book_price">Preis</label>
        <input type="number" name="price" id="main_library_book_price">
        <label for="main_library_book_status">Status</label>
        <input type="text" name="status" id="main_library_book_status">
        <label for="main_library_book_rating">Bewertung</label>
        <input type="text" name="rating" id="main_library_book_rating">
        <label for="main_library_book_author">Autor</label>
        <input type="text" name="author" id="main_library_book_author">
        <label for="main_library_book_publisher">Verlag</label>
        <input type="text" name="publisher" id="main_library_book_publisher">
        <label for="main_library_book_edition">Auflage</label>
        <input type="text" name="edition" id="main_library_book_edition">
        <label for="main_library_book_edition">Zusammenfassung</label>
        <input type="text" name="edition" id="main_library_book_edition">
        <label for="main_library_cover_img">Link des Buch-Covers</label>
         <input type="url" name="uploadedimageurl" id="main_library_cover_img">
    </form>
    `
    newBookRef.showModal();
}

function addNewBookToLibrary() {

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