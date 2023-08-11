
var gamecoreFunctions = 
{
  // AI DECISIONS

  AIDecisionConfig: function(data, container) {
    container.append($('<div>').html(`<h3>Decision <span class="code">${data.DecisionName}</span></h3>`));
    container.append($('<h4>').html(`Conditions:`));
    var conditions = data.ConsiderAxisList;
    for (var i = 0; i < conditions.length; i++)
    {
      var condition = conditions[i];
      container.append(createGamecoreView(condition));
    }
    container.append($('<h4>').html(`Actions:`));
    container.append(createGamecoreView(data.RootTask));
  },

  AIStepperDecisionGroupConfig: function(data, container) {
    container.append($('<div>').html(`<h3>Decision group <span class="code">${data.DecisionGroupName}</span></h3>`));
    var decisions = data.DecisionList;
    for (var i = 0; i < decisions.length; i++)
    {
      var decision = decisions[i];
      container.append(createGamecoreView(decision));
    }
  },

  // AXIS

  CheckPredicateAxis: function(data, container) {
    container.append($('<div>').html(`Predicate Axis (Score: <span class="code">${data.SuccessScore?.Value}</span>).`));
    container.append(createGamecoreView(data.Predicate));
  },

  CheckSkillUsabilityAxis: function(data, container) {
    container.append($('<div>').html(`Check skill cooldown for <span class="code">${data.SkillName}</span> is <span class="code">${data.CD}</span> (<span class="code">${data.InitialCD}</span> initial).`));
  },

  ChoseSequencedSkillAxis: function(data, container) {
    container.append($('<div>').html(`Chose sequenced skill.`));
  },

  ComplexSkillAIAxis: function(data, container) {
    container.append($('<div>').html(`Complex skill AI.`));
  },

  // PREDICATES

  ByAnd: function(data, container) {
    container.append($('<div>').html(`All True:`));
    var predicates = data.PredicateList;
    for (var i = 0; i < predicates.length; i++)
    {
      var predicate = predicates[i];
      container.append(createGamecoreView(predicate));
    }
  },

  ByAny: function(data, container) {
    container.append($('<div>').html(`Any True:`));
    var predicates = data.PredicateList;
    for (var i = 0; i < predicates.length; i++)
    {
      var predicate = predicates[i];
      container.append(createGamecoreView(predicate));
    }
  },

  ByNot: function(data, container) {
    container.append($('<div>').html(`Not:`));
    container.append(createGamecoreView(data.Predicate));
  },

  ByCompareDynamicValue: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.ContextScope}</span>'\s <span class="code">${data.DynamicKey} ${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>.`));
  },

  ByIsContainModifier: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span> contains modifier <span class="code">${data.ModifierName}</span>`));
  },

  ByCompareMonsterPhase: function(data, container) {
    container.append($('<div>').html(`Check phase <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>`));
  },

  ByCompareCharacterNumber: function(data, container) {
    container.append($('<div>').html(`Check character count in <span class="code">${data.TargetType.Alias}</span> is <span class="code">${data.CompareType} ${data.CompareNumber?.FixedValue?.Value}</span>`));
    var predicate = data.Predicate;
    if (predicate != undefined)
    {
      container.append($('<div>').text('With condition:'));
      container.append(createGamecoreView(predicate));
    }
  },

  ByCompareAliveEnemyNumber: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span>'\s alive enemy number is <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>`));
  },

  ByCompareBP: function(data, container) {
    container.append($('<div>').html(`Check skill points <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>.`));
  },

  ByRandomChance: function(data, container) {
    container.append($('<div>').html(`<span class="code">${data.Chance?.FixedValue?.Value * 100}</span>% chance.`));
  },

  ByCompareModifierValue: function(data, container) {
    container.append($('<div>').html(`Check modifier <span class="code">${data.ModifierName}</span>\'s <span class="code">${data.ValueType}</span> is <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>`));
  },

  ByCompareMonsterID: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span>'\s monster ID is <span class="code">${data.TargetMonsterID?.FixedValue?.Value}</span>`));
  },

  ByContainBehaviorFlag: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span> has <span class="code">${data.Flag}</span> flag.`));
  },

  ByCompareHPRatio: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span> HP ratio is <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>.`));
  },

  // SELECTORS

  AIModifierNameSelector: function(data, container) {
    container.append($('<div>').html(`Select by modifier <span class="code">${data.ModifierName}</span>.`));
  },

  AIPropertySelector: function(data, container) {
    container.append($('<div>').html(`Select by the <span class="code">${data.PropertyStrategy}</span> of <span class="code">${data.Property}</span>.`));
  },

  AITaskTargetTypeSelector: function(data, container) {
    container.append($('<div>').html(`Select by the target type of <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  AIComposeSelector: function(data, container) {
    container.append($('<div>').html(`Select by:`));
    var selectors = data.SelectorList;
    for (var i = 0; i < selectors.length; i++)
    {
      var selector = selectors[i];
      container.append(createGamecoreView(selector));
    }
  },

  AIMonsterIDSelector: function(data, container) {
    container.append($('<div>').html(`Select by monster ID in <span class="code">${data.MonsterIDList.join(', ')}</span>.`));
  },

  AIBehaviorFlagSelector: function(data, container) {
    container.append($('<div>').html(`Select by flag <span class="code">${data.BehaviorFlag}</span>.`));
  },

  // TASKS

  UseSkill: function(data, container) {
    container.append($('<div>').html(`Use skill <span class="code">${data.SkillName}</span>.`));
  },

  DefineDynamicValue: function(data, container) {
    container.append($('<div>').html(`Define <span class="code">${data.TargetType?.Alias}</span>'\s <span class="code">${data.DynamicKey}</span> to <span class="code">${data.ResetValue?.FixedValue?.Value}</span>.`));
  },

  SetDynamicValue: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${data.ResetValue?.FixedValue?.Value}</span>.`));
  },

  SetDynamicValueByAddValue: function(data, container) {
    container.append($('<div>').html(`Add <span class="code">${data.AddValue?.FixedValue?.Value}</span> to <span class="code">${data.TargetType?.Alias}</span>'\s <span class="code">${data.Key}</span> and clamp between <span class="code">${data.Min?.FixedValue?.Value}</span> and <span class="code">${data.Max?.FixedValue?.Value}</span>.`));
  },

  SelectAISkillTarget: function(data, container) {
    container.append($('<div>').html(`Select target for <span class="code">${data.SkillName}</span>:`));
    container.append(createGamecoreView(data.Selector));
  },

  UseSequencedSkill: function(data, container) {
    container.append($('<div>').html(`Use sequenced skill.`));
  },

  UseSkillByComplexSkillAI: function(data, container) {
    container.append($('<div>').html(`Use skill by complex skill AI.`));
  },

  PredicateTaskList: function(data, container) {
    container.append($('<div>').html(`If:`));
    container.append(createGamecoreView(data.Predicate));

    var successTasks = data.SuccessTaskList;
    if (successTasks != undefined)
    {
      container.append($('<div>').html(`Is True:`));
      for (var i = 0; i < successTasks.length; i++)
      {
        var task = successTasks[i];
        container.append(createGamecoreView(task));
      }
    }

    var failedTasks = data.FailedTaskList;
    if (failedTasks != undefined)
    {
      container.append($('<div>').html(`Is False:`));
        for (var i = 0; i < failedTasks.length; i++)
      {
        var task = failedTasks[i];
        container.append(createGamecoreView(task));
      }
    }
  },

  SequenceConfig: function(data, container) {
    container.append($('<div>').html(`Sequence:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },
};

function createGamecoreView(data)
{
  var container = $(`<div class="gamecore">`);

  var gamecoreName = data.$type;
  var parts = gamecoreName.split('.');

  var hasExplanation = false;
  if (parts.length === 3) 
  {
    var functionName = parts[2];
    var gamecoreFunction = gamecoreFunctions[functionName];
    
    if (gamecoreFunction != undefined) 
    {
      var explanationContainer = $('<div>');
      gamecoreFunction(data, explanationContainer);
      if ((data.Inverse ?? false) || (data.InverseResultFlag ?? false))
        explanationContainer.children('div:first-child').append($('<span class="code">').text(' (Inverted)'));

      container.append(explanationContainer);
      hasExplanation = true;
    }
    else console.log(`Not found: ${gamecoreName}`);
  }
  else console.log(`Not found: ${gamecoreName}`);

  var source = $('<pre>');
  container.append(source.text(JSON.stringify(data, null, 2)));
  
  if (hasExplanation)
  {
    source.addClass('source-content');
    source.prev().children('div:first-child')
      .addClass('source-opener')
      .click(function() {
        source.slideToggle();
      });
  }

  return container;
}
