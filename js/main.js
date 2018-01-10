var $document = jQuery(document);
var $app = jQuery(".app");
var $addSectionButton = jQuery(".add-section-button");

var gifSectionStr = `<div class="gif-section">
        <div class="gif-section-headers">
                <input type="text" class="gif-section-header" placeholder="h1...">
                <input type="text" class="gif-section-header" placeholder="h3...">
                <input type="text" class="gif-section-header" placeholder="h5...">
        </div>
        <button class="add-field-button">+ Új mező beillesztése</button>
    </div>`;

var gifFieldStr = `<div class="gif-section-field">
            <input type="text" class="field-imgsrc field-input" placeholder="Kép src...">
            <input type="text" class="field-gifsrc field-input" placeholder="Gif src...">
            <input type="text" class="field-descr field-input" placeholder="Leírás...">
            <button class="delete-field-button">X Mező törlése</button>
        </div>`;

function handleAddSection() {
    var $gifSection = jQuery(gifSectionStr);
    console.log($gifSection)
    $app.append($gifSection);
}


function handleAddField() {
    var $gifField = jQuery(gifFieldStr);
    $(this).parent().append($gifField);
}

function handleDeleteField() {
    $(this).parent().remove();
}

function setEventHandlers() {
    $addSectionButton.on("click", handleAddSection);
    $app.on("click", ".add-field-button", handleAddField);
    $app.on("click", ".delete-field-button", handleDeleteField);
}

setEventHandlers();