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
    bookRef.innerHTML = getTemplateMainLibraryBookInfo(i);
    bookRef.showModal();

}

function openAddNewBookDialog() {
    let newBookRef = document.getElementById('main_library_add_book');
    newBookRef.innerHTML = '';
    newBookRef.innerHTML = getTemplateAddNewBook();
    newBookRef.showModal();
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