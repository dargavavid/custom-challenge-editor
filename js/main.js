var $document = jQuery(document);
var $app = jQuery(".app");
var $addSectionButton = jQuery(".add-section-button");
var dayContent;

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
    var content = {
        number: parseInt(jQuery(".daynum").val()),
        videos: videos,
        gifBlocks: gifBlocks
    };
    dayContent = content;
    return content;
}

function resetEditor() {
    jQuery(".daynum").val("");
    jQuery(".videotitle").val("");
    jQuery(".videosrc").val("");
    jQuery(".gif-section").remove();
}

function getDayContent(dayNum) {
    jQuery.ajax(
        {
            url: "https://www.szaszhegyessyzita.com/wp-content/plugins/varga-solutions/new-90-days-challenge/get_day_content.php",
            type: 'POST',
            dataType: 'json',
            data: { daynum: dayNum },
            success: function (response) {
                dayContent = JSON.parse(response.slice(1, response.length - 1));
                console.log(dayContent);
                //TODO: load in content
                // insertDayContent(dayContent);
            }
        });
}

function loadDayContent(dayContent) {
    jQuery(".daynum").val(dayContent.number);

    var $videoTitles = jQuery(".videotitle");
    var $videoSrcs = jQuery(".videosrc");
    $videoTitles.eq(0).val(dayContent.videos[0].title);
    $videoTitles.eq(1).val(dayContent.videos[1].title);
    $videoSrcs.eq(0).val(dayContent.videos[0].url);
    $videoSrcs.eq(1).val(dayContent.videos[1].url);
    
    var $gifSection, $blockHeaders, $gifField;
    for (var i = 0; i < dayContent.gifBlocks.length; i++) {
        $gifSection = jQuery(gifSectionStr);
        $blockHeaders = $gifSection.find(".gif-section-header");
        $blockHeaders.eq(0).val(dayContent.gifBlocks[i].h1);
        $blockHeaders.eq(1).val(dayContent.gifBlocks[i].h3);
        $blockHeaders.eq(2).val(dayContent.gifBlocks[i].h5);
        for (var j = 0; j < dayContent.gifBlocks[i].gifs.length; j++) {
            $gifField = jQuery(gifFieldStr);
            $gifField.find(".field-imgsrc").val(dayContent.gifBlocks[i].gifs[j].imgsrc);
            $gifField.find(".field-gifsrc").val(dayContent.gifBlocks[i].gifs[j].gifsrc);
            $gifField.find(".field-descr").val(dayContent.gifBlocks[i].gifs[j].description);
            $gifSection.append($gifField);
        }
        $app.append($gifSection);
    }
}

function insertDayContentIntoDB(dayContent) {
    jQuery.ajax(
        {
            url: "https://www.szaszhegyessyzita.com/wp-content/plugins/varga-solutions/new-90-days-challenge/write_db.php",
            type: 'POST',
            dataType: 'json',
            data: {daynum: dayContent.number, content: JSON.stringify(dayContent)},
            success: function (response) {
                console.log(response);
                //TODO: load in content
                // insertDayContent(dayContent);
            }
        });
}

setEventHandlers();