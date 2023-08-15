
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
        modifierContainer.append($('<div class="modifier">').html(`Modifier <span class="code">${modifierName}</span>:`));

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
                eventContainer.append($('<div class="event">').html(`${eventName}:`));

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

var skillConfigs = {
};

function getSkillConfig(id)
{
  var allRanks = skillConfigs[id];
  if (allRanks == undefined)
    return undefined;

  var rank = (Object.keys(allRanks).length * 2) / 3;
  return allRanks[rank];
}

function initializeAbilities(type)
{
  // also this https://github.com/Dimbreath/StarRailData/blob/master/Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json ?
  // https://github.com/Dimbreath/StarRailData/blob/master/ExcelOutput/StatusConfig.json has readparamlist

  // doesn't seem needed atm
  // https://raw.githubusercontent.com/Dimbreath/StarRailData/master/Config/ConfigAbility/Common_Additional_Ability.json

  var commonAbilityPath = `Config/ConfigAbility/${type}/${type}_Common_Ability.json`;
  var skillConfigPath = `ExcelOutput/${type}SkillConfig.json`;

  return $.when(
    $.ajax({
      url: 'https://raw.githubusercontent.com/Dimbreath/StarRailData/master/' + commonAbilityPath,
      type: 'GET',
      dataType: 'json',
      cache: true,
      success: function(data)
      {
        commonAbilities = data;
        console.log(type + ' common abilities loaded');
      },
      error: function(xhr, status, error) 
      {
        console.error('Common Ability Error:', error);
      },
    }),
    $.ajax({
      url: 'https://raw.githubusercontent.com/Dimbreath/StarRailData/master/' + skillConfigPath,
      type: 'GET',
      dataType: 'json',
      cache: true,
      success: function(data)
      {
        skillConfigs = data;
        console.log(type + ' skill config loaded');
      },
      error: function(xhr, status, error) 
      {
        console.error('Skill Configs Error:', error);
      },
    }));
}
