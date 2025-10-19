function getTemplateMainLibraryBookInfo(i) {
    return /*html*/ `
     <article class="main_library_dialog">
        <header class="main_library_dialog_header">
            <h2>${library[i].title}</h2>
    </header>
         <section class="section_border_main_library"><span></span></section>
        <section class="main_library_dialog_cover_img"><img src="${library[i].uploadedimageurl}" alt="Cover-Bild des Buches"></section>
        <section class="section_border_main_library"><span></span></section>
        <section class="main_library_dialog_info_section">
            <img onclick="openEditBookDialog(${i})" class="main_library_edit_book_info_icon" src="./assets/icon/edit_icon.png" alt="Bild eines Änderungssymbols">
            <div class="main_library_dialog_price_rating"> 
                <div><span>Preis:</span> ${library[i].listprice}</div>
                <div id="book_rating"><span>Bewertung:</span> ${library[i].rating}/5</div>
            </div>
            <div class="main_library_dialog_info_element"><span>Autor:</span> ${library[i].author}</div>
            <div class="main_library_dialog_info_element"><span>Verlag:</span> ${library[i].publisher}</div>
            <div class="main_library_dialog_info_element"><span>Erscheinungsjahr:</span> ${library[i].year_published}</div>
            <div class="main_library_dialog_info_element"><span>Auflage:</span> ${library[i].edition}</div>
            <div class="main_library_dialog_info_element"><span>Status:</span> ${library[i].status}</div>
        </section>
         <section class="section_border_main_library"><span></span></section>
        <p class="main_book_summary">Zusammenfassung: <br>${library[i].summary}</p>
        
    </article>
    `
}

function getTemplateAddNewBook() {
    return /*html*/ `
    <form onsubmit="addNewBookToLibrary(event); closeAddNewBookDialog()" return="false" class="main_library_add_book main_library_dialog">
        <label for="main_library_book_title">Title</label>
        <input placeholder="* Pflichtfeld" type="text" name="title" id="main_library_book_title" required>
        <label for="main_library_book_price">Preis</label>
        <input min="0" step="0.01" type="number" name="price" id="main_library_book_price">
        <label for="main_library_book_status">Status</label>
        <input placeholder="* Pflichtfeld" type="text" name="status" id="main_library_book_status" required>
        <label for="main_library_book_rating">Bewertung</label>
        <input min="0" max="5" step="1" type="text" name="rating" id="main_library_book_rating">
        <label for="main_library_book_author">Autor</label>
        <input type="text" name="author" id="main_library_book_author">
        <label for="main_library_book_publisher">Verlag</label>
        <input type="text" name="publisher" id="main_library_book_publisher">
        <label for="main_library_book_published_year">Erscheinungsjahr</label>
        <input type="text" name="published year" id="main_library_book_published_year">
        <label for="main_library_book_edition">Auflage</label>
        <input type="text" name="edition" id="main_library_book_edition">
        <label for="main_library_book_summary">Zusammenfassung</label>
        <input type="text" name="summary" id="main_library_book_summary">
        <label for="main_library_cover_img">Link des Buch-Covers</label>
        <input name="uploadedimageurl" id="main_library_cover_img">
        <button>Speichern</button>
    </form>
    `
}

function getTemplateEditBookInformation(i) {
    return /*html*/ `
    <form onsubmit="updateBookToLibrary(event, ${i}); return false" return="false" class="main_library_add_book main_library_dialog">
        <label for="main_library_book_title">Title</label>
        <input value="${library[i].title}" placeholder="* Pflichtfeld" type="text" name="title" id="main_library_book_title" required>
        <label for="main_library_book_price">Preis</label>
        <input value="${library[i].price}" min="0" step="0.01" type="number" name="price" id="main_library_book_price">
        <label for="main_library_book_status">Status</label>
        <input value="${library[i].status}" placeholder="* Pflichtfeld" type="text" name="status" id="main_library_book_status" required>
        <label for="main_library_book_rating">Bewertung</label>
        <input value="${library[i].rating}" min="0" max="5" step="1" type="text" name="rating" id="main_library_book_rating">
        <label for="main_library_book_author">Autor</label>
        <input value="${library[i].author}" type="text" name="author" id="main_library_book_author">
        <label for="main_library_book_publisher">Verlag</label>
        <input value="${library[i].publisher}" type="text" name="publisher" id="main_library_book_publisher">
        <label for="main_library_book_published_year">Erscheinungsjahr</label>
        <input value="${library[i].year_published}" type="text" name="published year" id="main_library_book_published_year">
        <label for="main_library_book_edition">Auflage</label>
        <input value="${library[i].edition}" type="text" name="edition" id="main_library_book_edition">
        <label for="main_library_book_summary">Zusammenfassung</label>
        <input value="${library[i].summary}" type="text" name="summary" id="main_library_book_summary">
        <label for="main_library_cover_img">Link des Buch-Covers</label>
        <input value="${library[i].uploadedimageurl}" name="uploadedimageurl" id="main_library_cover_img">
        <button onclick="closeAddNewBookDialog()">Speichern</button>
    </form>
    `
}