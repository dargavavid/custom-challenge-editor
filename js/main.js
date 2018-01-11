var $document = jQuery(document);
var $app = jQuery(".app");
var $addSectionButton = jQuery(".add-section-button");

var gifSectionStr = `<div class="gif-section">
            <button class="delete-section-button">X</button>
            <div class="gif-section-headers">
                    <input type="text" class="gif-section-header" placeholder="h1...">
                    <input type="text" class="gif-section-header" placeholder="h3...">
                    <input type="text" class="gif-section-header" placeholder="h5...">
            </div>
            <button class="add-field-button">+ Új mező beillesztése</button>
        </div>`;

var gifFieldStr = `<div class="gif-section-field">
            <input type="text" class="field-imgsrc field-input" placeholder="Kép src...">
            <input type="text" class="field-gifsrc field-input" placeholder="Gif src (hagyd üresen, ha álló)...">
            <input type="text" class="field-descr field-input" placeholder="Leírás...">
            <button class="delete-field-button">X</button>
        </div>`;

function handleAddSection() {
    var $gifSection = jQuery(gifSectionStr);
    $app.append($gifSection);
}

function handleDeleteSection() {
    $(this).parent().remove();
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
    $app.on("click", ".delete-section-button", handleDeleteSection);
}

function getInputs() {
    var $videoSection = jQuery(".video-section");
    var $videoTitles = jQuery(".videotitle");
    var $videoSrcs = jQuery(".videosrc");
    var videos = [
        { url: $videoSrcs.eq(0).val(), title: $videoTitles.eq(0).val() },
        { url: $videoSrcs.eq(1).val(), title: $videoTitles.eq(1).val() },
    ];
    var gifBlocks = [];
    
    var $gifSections = jQuery(".gif-section");
    var $gifSection, $blockHeaders, $gifFields, $gifField, gifs, gifField, gifBlock;
    for (var i = 0; i < $gifSections.length; i++) {
        $gifSection = $gifSections.eq(i);
        $blockHeaders = $gifSection.find(".gif-section-header");
        $gifFields = $gifSection.find(".gif-section-field");
        gifBlock = {};
        gifBlock.h1 = $blockHeaders.eq(0).val();
        gifBlock.h3 = $blockHeaders.eq(1).val();
        gifBlock.h5 = $blockHeaders.eq(2).val();
        
        gifBlock.gifs = [];
        
        
        for (var j = 0; j < $gifFields.length; j++) {
            $gifField = $gifFields.eq(j);
            gifField = {imgsrc: $gifField.find(".field-imgsrc").val(), gifsrc: $gifField.find(".field-gifsrc").val(), description: $gifField.find(".field-descr").val()};
            
            gifBlock.gifs.push(gifField);
        }
        gifBlocks.push(gifBlock);
    }
    return {
        day: "dosomethingaboutme",
        videos: videos,
        gifBlocks: gifBlocks
    }
}

setEventHandlers();