
function createCharacterDetailView(configData, characterData, abilityData)
{
  var container = $(`<div class="characterDetail">`);

  var configSkills = configData?.SkillList;
  var customValues = characterData?.CustomValues;
  var characterSkills = characterData?.SkillList;
  var abilityList = abilityData?.AbilityList;
  var globalModifiers = abilityData?.GlobalModifiers;

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

  if (configSkills != undefined)
  {
    container.append($('<h3>').text('Config Skills'));
    for (var i = 0; i < configSkills.length; i++)
    {
      var skillId = configSkills[i];
      var skillConfig = getSkillConfig(skillId);

      if (skillConfig != undefined)
        container.append(createSkillView(skillConfig));
    }
  }

  if (characterSkills != undefined)
  {
    container.append($('<h3>').text('Character Skills'));
    for (var i = 0; i < characterSkills.length; i++)
    {
      var skill = characterSkills[i];

      container.append($('<h4>').html(`${skill.Name} <span class="code">${skill.SkillType} / ${skill.UseType} / ${skill.TargetInfo?.TargetType} (${skillId})</span>`));
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
  }
  else
  {
    container.append($('<h3>').text('Character Abilities'));
    for (var i = 0; i < abilityList.length; i++)
    {
      var ability = abilityList[i];
      container.append(createAbilityView(ability));
    }
  }
  
  if (globalModifiers != undefined)
  {
    container.append($('<h3>').text('Global modifiers'));
    container.append(createModifiersView(globalModifiers));
  }

  //container.append($('<pre>').text(JSON.stringify(characterData, null, 2)));
  //container.append($('<pre>').text(JSON.stringify(abilityData, null, 2)));
  return container;
}
