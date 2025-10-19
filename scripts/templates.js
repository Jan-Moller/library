function getTemplateMainLibraryBookInfo(i) {
    return /*html*/ `
     <article class="main_library_dialog">
        <header class="main_library_dialog_header"><h2>${library[i].title}</h2></header>
         <section class="section_border_main_library"><span></span></section>
        <section class="main_library_dialog_cover_img"><img src="${library[i].uploadedimageurl}"></section>
        <section class="section_border_main_library"><span></span></section>
        <section class="main_library_dialog_info_section">
            <div class="main_library_dialog_price_rating"> 
                <div><span>Preis:</span> ${library[i].listprice}</div>
                <div><span>Bewertung:</span> ${library[i].rating}/5</div>
            </div>
            <div class="main_library_dialog_info_element"><span>Autor:</span> ${library[i].author}</div>
            <div class="main_library_dialog_info_element"><span>Verlag:</span> ${library[i].publisher}, ${library[i].year_published}</div>
            <div class="main_library_dialog_info_element"><span>Auflage:</span> ${library[i].edition}</div>
            <div class="main_library_dialog_info_element"><span>Status:</span> ${library[i].status}</div>
        </section>
         <section class="section_border_main_library"><span></span></section>
        <p class="main_book_summary">${library[i].summary}</p>
        
    </article>
    `
}

function getTemplateAddNewBook() {
    return /*html*/ `
    <form onsubmit="addNewBookToLibrary(event); return false" return="false" class="main_library_add_book main_library_dialog">
        <label for="main_library_book_title">Title</label>
        <input type="text" name="title" id="main_library_book_title">
        <label for="main_library_book_price">Preis</label>
        <input min="0" step="0.01" type="number" name="price" id="main_library_book_price">
        <label for="main_library_book_status">Status</label>
        <input type="text" name="status" id="main_library_book_status">
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
        <input type="url" name="uploadedimageurl" id="main_library_cover_img">
        <button>Speichern</button>
    </form>
    `
}