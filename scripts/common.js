
function createExplanationView(data, callback)
{
  var container = $(`<div class="explanation">`);
  var explanationContainer = $('<div>');

  var hasExplanation = callback(explanationContainer);
  container.append(explanationContainer);

  var source = $('<pre>');
  container.append(source.text(JSON.stringify(data, null, 2)));
  
  if (hasExplanation)
  {
    source.addClass('source-content');
    source.prev().children('div:first-child')
      .addClass('source-opener')
      .click(function(event) {
        event.stopPropagation();
        source.slideToggle();
      });
  }

  return container;
}

function cleanupFloat(value)
{
  return parseFloat(value.toFixed(4));
}
