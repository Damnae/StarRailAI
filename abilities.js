
function createCharacterDetailView(characterData, abilityData)
{
  var container = $(`<div class="characterDetail">`);

  var customValues = characterData.CustomValues;
  if (customValues != undefined)
  {
    container.append($('<h3>').text('Variables'));
    var variablesContainer = $('<div>');
    for (var key in customValues) 
      if (customValues.hasOwnProperty(key)) 
      {
        var customValue = customValues[key];
        variablesContainer.append($('<div>').html(`<span class="code">${key}</span> = <span class="code">${customValue}</span>`));
      }
    container.append(variablesContainer);
  }

  var globalModifiers = abilityData?.GlobalModifiers;
  if (globalModifiers != undefined)
  {
    container.append($('<h3>').text('Global modifiers'));
    container.append(createModifiersView(globalModifiers));
  }

  var skills = characterData.SkillList;
  container.append($('<h3>').text('Skills'));
  for (var i = 0; i < skills.length; i++)
  {
    var skill = skills[i];
    container.append($('<h4>').html(`${skill.Name} <span class="code">${skill.SkillType} / ${skill.UseType} / ${skill.TargetInfo?.TargetType}</span>`));
    
    if (abilityData != undefined)
    {
      var abilityNames = findSkillAbilities(skill.Name, characterData);
      if (abilityNames != undefined)
      {
        for (var j = 0; j < abilityNames.length; j++)
        {
          var abilityName = abilityNames[j];
          var ability = findAbility(abilityName, abilityData);
          if (ability != undefined)
            container.append(createAbilityView(ability));
          else container.append($('<h5>').html(`<span class="code">${abilityName}</span> (missing)`));
        }
      }
      else
      {
        var ability = findAbility(skill.EntryAbility, abilityData);
        if (ability != undefined)
          container.append(createAbilityView(ability));
        else container.append($('<h5>').html(`<span class="code">${skill.EntryAbility}</span> (missing)`));
      }
    }
  }

  //container.append($('<pre>').text(JSON.stringify(characterData, null, 2)));
  //container.append($('<pre>').text(JSON.stringify(abilityData, null, 2)));
  return container;
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
