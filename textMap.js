
var textMap = {};

function translate(hash)
{
    return textMap[hash];
}

function initializeTranslation(then)
{
    $.ajax({
        url: 'https://raw.githubusercontent.com/Dimbreath/StarRailData/master/TextMap/TextMapEN.json',
        type: 'GET',
        dataType: 'json',
        cache: true,
        success: function(data)
        {
            textMap = data;
            then();
        },
        error: function(xhr, status, error) 
        {
            console.error('Error:', error);
        },
    });
}

