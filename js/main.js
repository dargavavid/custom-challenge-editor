var $document = jQuery(document);

var gifFieldStr = `<div class="gif-section-field">
            <input type="text" class="field-imgsrc field-input" placeholder="Kép src...">
            <input type="text" class="field-gifsrc field-input" placeholder="Gif src...">
            <input type="text" class="field-descr field-input" placeholder="Leírás...">
            <button class="delete-field-button">X Mező törlése</button>
        </div>`;

function handleAddField() {
    var $gifField = jQuery(gifFieldStr);
    $(this).parent().append($gifField);
}

function handleDeleteField() {
    $(this).parent().remove();
}

