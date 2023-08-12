
var textMap = {};

function translate(hash)
{
    return textMap[hash];
}

function initializeTranslation(then)
{
    if (getHash('MDF_DamagePercentage') != 1486739431)
        console.error('getHash is fucked =)');

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
            console.error('TextMap Error:', error);
        },
    });
}

function getHash(key)
{
    var hash1 = 5381;
    var hash2 = 5381;
    for (let i = 0; i < key.length; i += 2) 
    {
      hash1 = Math.imul((hash1 << 5) + hash1, 1) ^ key.charCodeAt(i);
      if (i === key.length - 1) 
        break;
      hash2 = Math.imul((hash2 << 5) + hash2, 1) ^ key.charCodeAt(i + 1);
    }
    return hash1 + Math.imul(hash2, 1566083941);
}

function goFishing(data)
{
    if (data === null)
        return;

    // Antibaryon
    //   "-609252983": "Obliterate",
    //   "-609253146": "Obliterate",

    //var hash = getHash('Monster_AML_Minion01_01_Skill01');
    //console.log(hash + ' ' + translate(hash));

    if (typeof data === 'object') 
    {
        for (const key in data) 
            if (data.hasOwnProperty(key)) 
            {
                goFishing(key);
                goFishing(data[key]);
            }

    } 
    else if (typeof data === 'array') 
    {
        for (const v in data) 
            goFishing(v);
    } 
    else if (typeof data === 'string') 
    {
        var hash = getHash(data);
        var translatedValue = translate(hash);
        if (translatedValue !== undefined)
            console.log(`${translatedValue} was ${data} is ${hash}`);
    }
}

/*
Original code
{
    var hash1 = 5381;
    var hash2 = 5381;
    for (var i = 0; i < key.length; i += 2) 
    {
        hash1 = ((hash1 << 5) + hash1) ^ key.charCodeAt(i);
        if (i === key.length - 1)
            break;
        hash2 = ((hash2 << 5) + hash2) ^ key.charCodeAt(i + 1);
    }
    return hash1 + (hash2 * 1566083941);
}
*/