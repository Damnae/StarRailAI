
var commonAbilities = {
  AbilityList: [],
};

var commonAdditionalAbilities = {
  AbilityList: [],
};

function findSkillAbilities(name, data)
{
  for (var i = 0; i < data.SkillAbilityList.length; i++)
  {
    var skill = data.SkillAbilityList[i];
    if (skill.Skill == name)
      return skill.AbilityList;
  }
  return undefined;
}

function findAbility(name, abilityData)
{
  for (var i = 0; i < abilityData.AbilityList.length; i++)
  {
    var ability = abilityData.AbilityList[i];
    if (ability.Name == name)
      return ability;
  }

  for (var i = 0; i < commonAbilities.AbilityList.length; i++)
  {
    var ability = commonAbilities.AbilityList[i];
    if (ability.Name == name)
      return ability;
  }

  for (var i = 0; i < commonAdditionalAbilities.AbilityList.length; i++)
  {
    var ability = commonAdditionalAbilities.AbilityList[i];
    if (ability.Name == name)
      return ability;
  }
  
  if (name != undefined && !name.includes('Camera'))
    console.log('Ability not found ' + name);

  return undefined;
}

function initializeAbilities()
{
  return $.ajax({
    url: 'https://raw.githubusercontent.com/Dimbreath/StarRailData/master/Config/ConfigAbility/Monster/Monster_Common_Ability.json',
    type: 'GET',
    dataType: 'json',
    cache: true,
    success: function(data)
    {
      commonAbilities = data;
    },
    error: function(xhr, status, error) 
    {
      console.error('Monster Common Ability Error:', error);
    },
  }).then(function() 
  {
    if (false)
    $.ajax({
      url: 'https://raw.githubusercontent.com/Dimbreath/StarRailData/master/Config/ConfigAbility/Common_Additional_Ability.json',
      type: 'GET',
      dataType: 'json',
      cache: true,
      success: function(data)
      {
        commonAdditionalAbilities = data;
      },
      error: function(xhr, status, error) 
      {
        console.error('Common Additional Ability Error:', error);
      },
    });
  });
}

function createAbilityView(data)
{
  var container = $(`<div class="ability">`);
  container.append($('<h5>').html(`<span class="code">${data.Name}</span>`));

  var onStart = data.OnStart;
  var modifiers = data.Modifiers;

  if (onStart != undefined)
  {
    container.append($('<div>').html(`On Start:`));
    for (var i = 0; i < onStart.length; i++)
    {
      var onStartAction = onStart[i];
      container.append(createGamecoreView(onStartAction));
    }
  }

  if (modifiers != undefined)
  {
    container.append($('<div>').html(`Modifiers:`));
    container.append(createModifiersView(modifiers));
  }

  //container.append($('<pre>').text(JSON.stringify(data, null, 2)));
  return container;
}

function createModifiersView(data)
{
  var container = $(`<div class="modifiers">`);
  for (var modifierName in data) 
    if (data.hasOwnProperty(modifierName)) 
    {
      var modifier = data[modifierName];
      container.append(createExplanationView(modifier, function(modifierContainer)
      {
        modifierContainer.append($('<div>').html(`Modifier <span class="code">${modifierName}</span>:`));

        var onDynamicValueChanges = modifier.OnDynamicValueChange;
        // TODO parse onDynamicValueChanges

        var events = modifier._CallbackList;
        if (events != undefined)
        {
          for (var eventName in events) 
            if (events.hasOwnProperty(eventName)) 
            {
              var event = events[eventName];
              modifierContainer.append(createExplanationView(event, function(eventContainer)
              {
                eventContainer.append($('<div>').html(`${eventName}:`));

                var config = event.CallbackConfig;
                if (config != undefined)
                {
                  for (var i = 0; i < config.length; i++)
                  {
                    var action = config[i];
                    eventContainer.append(createGamecoreView(action));
                  }
                  return true;
                } else return false;
              }));
            }
          return true;
        } else return false;

      }));
    }
  return container;
}
