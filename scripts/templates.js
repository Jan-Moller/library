function getMainLibraryBookInfo(i) {
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