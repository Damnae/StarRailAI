
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
    container.append($('<div>').html(`Complex skill AI. <a href="index.html">View Details</a>`));
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
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span>'\s <span class="code">${data.DynamicKey} ${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>.`));
  },

  ByIsContainModifier: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${data.TargetType?.Alias}</span> has modifier <span class="code">${data.ModifierName}</span>`));
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

  ByDistance: function(data, container) {
    container.append($('<div>').html(`Check distance from <span class="code">${data.From?.Alias}</span> to <span class="code">${data.To?.Alias}</span> is <span class="code">${data.CompareType} ${data.CompareValue?.FixedValue?.Value}</span>.`));
  },

  // SELECTORS

  AIModifierNameSelector: function(data, container) {
    if (data.ModifierCaster?.Alias != undefined)
        container.append($('<div>').html(`Select by <span class="code">${data.ModifierCaster?.Alias}</span>\'s modifier <span class="code">${data.ModifierName}</span>.`));
      else container.append($('<div>').html(`Select by modifier <span class="code">${data.ModifierName}</span>.`));
  },

  AIPropertySelector: function(data, container) {
    container.append($('<div>').html(`Select by the <span class="code">${data.PropertyStrategy}</span> of <span class="code">${data.Property}</span>.`));
  },

  AITaskTargetTypeSelector: function(data, container) {
    container.append($('<div>').html(`Select in <span class="code">${data.TargetType?.Alias}</span>.`));
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
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${data.Value?.FixedValue?.Value}</span>.`));
  },

  SetDynamicValueByAddValue: function(data, container) {
    container.append($('<div>').html(`Add <span class="code">${data.AddValue?.FixedValue?.Value}</span> to <span class="code">${data.TargetType?.Alias}</span>'\s <span class="code">${data.Key}</span> and clamp between <span class="code">${data.Min?.FixedValue?.Value}</span> and <span class="code">${data.Max?.FixedValue?.Value}</span>.`));
  },

  SetDynamicValueByProperty: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${data.ReadTargetType?.Alias}</span>'\s <span class="code">${data.Value}</span>.`));
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
      container.append($('<div>').html(`Then:`));
      for (var i = 0; i < successTasks.length; i++)
      {
        var task = successTasks[i];
        container.append(createGamecoreView(task));
      }
    }

    var failedTasks = data.FailedTaskList;
    if (failedTasks != undefined)
    {
      container.append($('<div>').html(`Else:`));
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

  // ABILITY ACTIONS (Major)

  TriggerAbility: function(data, container) {
    container.append($('<div>').html(`Trigger <span class="code">${data.TargetType?.Alias}</span>\'s ability <span class="code">${data.AbilityName}</span>.`));
  },

  DamageByAttackProperty: function(data, container) {
    container.append($('<div>').html(`Deal ATK <span class="code">${data.AttackProperty?.DamageType}</span> damage to <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  FireProjectile: function(data, container) {
    container.append($('<div>').html(`Fire projectile at <span class="code">${data.TargetType?.Alias}</span>.`));
    var onHitActions = data.OnProjectileHit;
    if (onHitActions != undefined)
    {
      container.append($('<div>').html(`On hit:`));
      for (var i = 0; i < onHitActions.length; i++)
      {
        var onHitAction = onHitActions[i];
        container.append(createGamecoreView(onHitAction));
      }
    }
    if (data.WaitProjectileFinish ?? false)
      container.append($('<div class="minor">').html(`Wait for the projectile to hit.`));
  },

  FireWaveProjectile: function(data, container) {
    container.append($('<div>').html(`Fire <span class="code">${data.Count}</span>-hit wave projectile from <span class="code">${data.CasterTargetType?.Alias}</span> to <span class="code">${data.TargetType?.Alias}</span>.`));
    // TODO PerProjectileDamage
    var onHitClientActions = data.OnProjectileHitClientOnly;
    if (onHitClientActions != undefined)
    {
      container.append($('<div>').html(`On hit (client only):`));
      for (var i = 0; i < onHitClientActions.length; i++)
      {
        var onHitClientAction = onHitClientActions[i];
        container.append(createGamecoreView(onHitClientAction));
      }
    }
    if (data.WaitProjectileFinish ?? false)
      container.append($('<div class="minor">').html(`Wait for the projectile to hit.`));
  },

  HealHP: function(data, container) {
    container.append($('<div>').html(`Heal <span class="code">${data.TargetType?.Alias}</span> by <span class="code">${(data.HealPercentage?.FixedValue?.Value ?? 0) * 100}</span>% using formula <span class="code">${data.FormulaType}</span>.`));
  },
  LoseHPByRatio: function(data, container) {
    container.append($('<div>').html(`Have <span class="code">${data.TargetType?.Alias}</span> lose <span class="code">${data.RatioType}</span>.`));
  },
  

  SetActionDelay: function(data, container) {
    container.append($('<div>').html(`Set action delay for <span class="code">${data.TargetType?.Alias}</span> to <span class="code">${data.Value?.FixedValue?.Value}</span>.`));
  },
  ModifyActionDelay: function(data, container) {
    container.append($('<div>').html(`Change action delay for <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  ShowEntityFloatMessage: function(data, container) {
    container.append($('<div>').html(`Show message above <span class="code">${data.TargetType?.Alias}</span>: "<span class="code">${translate(data.ContentID?.Hash)}</span>".`));
  },

  AddModifier: function(data, container) {
    container.append($('<div>').html(`Apply modifier <span class="code">${data.ModifierName}</span> to <span class="code">${data.TargetType?.Alias}</span>.`));
    // TODO handle DynamicValues ShowUIMessageDelayTime
  },
  RemoveModifier: function(data, container) {
    container.append($('<div>').html(`Remove modifier <span class="code">${data.ModifierName}</span> from <span class="code">${data.TargetType?.Alias}</span>.`));
  },
  RemoveSelfModifier: function(data, container) {
    container.append($('<div>').html(`Remove this modifier.`));
  },
  StackProperty: function(data, container) {
    container.append($('<div>').html(`Add a stack of <span class="code">${data.Property}</span> to <span class="code">${data.TargetType?.Alias}</span>.`));
    // TODO handle PropertyValue DynamicValues
  },
  DispelStatus: function(data, container) {
    container.append($('<div>').html(`Dispel <span class="code">${data.TargetType?.Alias}</span>\'s <span class="code">${data.Order ?? 'All'}</span> status.`));
  },

  TurnInsertAbility: function(data, container) {
    container.append($('<div>').html(`Insert ability <span class="code">${data.TargetType?.Alias}</span>\'s <span class="code">${data.AbilityName}</span> ability, targetting <span class="code">${data.AbilityTarget?.Alias}</span> with priority <span class="code">${data.InsertAbilityPriority}</span>.`));
  },

  Retarget: function(data, container) {
    container.append($('<div>').html(`Targetting <span class="code">${data.MaxNumber?.FixedValue?.Value}</span> of <span class="code">${data.TargetType?.Alias}</span>,`));
    if (data.Predicate != undefined)
    {
      container.append($('<div>').html(`With Condition:`));
      container.append(createGamecoreView(data.Predicate));
    }
    var tasks = data.TaskList;
    if (tasks != undefined)
    {
      container.append($('<div>').html(`Do:`));
      for (var i = 0; i < tasks.length; i++)
      {
        var task = tasks[i];
        container.append(createGamecoreView(task));
      }
    }
  },

  LoopTargetList: function(data, container) {
    container.append($('<div>').html(`For all targets:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },

  LoopExecuteTaskList: function(data, container) {
    container.append($('<div>').html(`Repeat <span class="code">${data.MaxLoopCount?.FixedValue?.Value}</span> times:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },

  CharacterChangePhase: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${data.TargetType?.Alias}</span>\'s phase to <span class="code">${data.PhaseName}</span>.`));
  },  
  SetMonsterPhase: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${data.TargetType?.Alias}</span>\'s phase to <span class="code">${data.PhaseNum}</span>.`));
  },
  LockHP: function(data, container) {
    container.append($('<div>').html(`Lock HP to <span class="code">${(data.Threshold?.FixedValue?.Value) * 100}</span>%.`));
  },  

  ConstructBodyPart: function(data, container) {
    container.append($('<div>').html(`Create body part <span class="code">${data.PartName}</span>.`));
  },

  ExitBreakState: function(data, container) {
    container.append($('<div>').html(`Clear <span class="code">${data.TargetType?.Alias}</span>\'s break state.`));
  },

  SkillExecutionStart: function(data, container) {
    container.append($('<div>').html(`Begin skill execution.`));
  },
  SkillPerformFinish: function(data, container) {
    container.append($('<div>').html(`End skill execution.`));
  },
  DamagePerformFinish: function(data, container) {
    container.append($('<div>').html(`Finalize damage.`));
  },
  SetDieImmediately: function(data, container) {
    container.append($('<div>').html(`Have <span class="code">${data.TargetType?.Alias}</span> die immediately.`));
  },
  ForceKill: function(data, container) {
    container.append($('<div>').html(`Kill <span class="code">${data.TargetType?.Alias}</span>.`));
  },
  EscapeFromBattle: function(data, container) {
    container.append($('<div>').html(`Escape from battle.`));
  },

  SetBattleAchievement: function(data, container) {
    container.append($('<div>').html(`Give achievement <span class="code">${data.AchievementID}</span>.`));
  },

  // ABILITY ACTIONS (Minor)

  SetTeamFormation: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${data.Team}</span>\'s formation to <span class="code">${data.FormationType ?? data.CustomFormationName}</span>.`));
  },

  LookAt: function(data, container) {
    container.append($('<div class="minor">').html(`Look at <span class="code">${data.TargetType}</span>.`));
  },

  AnimSetParameter: function(data, container) {
    container.append($('<div class="minor">').html(`Set animaton parameter <span class="code">${data.ParameterName}</span> to <span class="code">${data.Value}</span>.`));
  },

  TriggerAnimState: function(data, container) {
    container.append($('<div class="minor">').html(`Play <span class="code">${data.TargetType?.Alias}</span>\'s animation <span class="code">${data.AnimStateName}</span> / <span class="code">${data.AnimLogicState}</span>.`));
  },

  TriggerEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Play visual effect at <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  TriggerEffectList: function(data, container) {
    container.append($('<div class="minor">').html(`Play multiple visual effects at <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  RemoveEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Remove visual effect from <span class="code">${data.TargetType?.Alias}</span>.`));
  },

  GlobalMainIntensityEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Apply global intensity effect.`));
  },

  RadialBlurEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Apply radial blur effect.`));
  },

  RadialBlurCurveEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Apply radial blur effect.`));
  },

  ScaleCharacterModel: function(data, container) {
    container.append($('<div class="minor">').html(`Change the scale of <span class="code">${data.TargetType?.Alias}</span> to <span class="code">${data.ModelScaleBase}</span>.`));
  },

  TriggerSound: function(data, container) {
    container.append($('<div class="minor">').html(`Play sound "<span class="code">${data.SoundName}</span>".`));
  },

  ShowBossInfoBar: function(data, container) {
    container.append($('<div class="minor">').html(`Set show boss info bar for <span class="code">${data.TargetType?.Alias}</span> to <span class="code">${data.IsShow}</span>.`));
  },

  ShowBattleUI: function(data, container) {
    container.append($('<div class="minor">').html(`Set show battle UI to <span class="code">${data.IsShow}</span>.`));
  },
  // not sure what the IsShow parameter is really named
  //MakeCharacterHUDVisible: function(data, container) {
  //  container.append($('<div class="minor">').html(`Set show character HUD for <span class="code">${data.TargetType?.Alias}</span> to <span class="code">${data.IsShow}</span>.`));
  //},
  ShowUIPage: function(data, container) {
    container.append($('<div class="minor">').html(`Show help page.`));
  },
  ShowSkillTextDialog: function(data, container) {
    container.append($('<div class="minor">').html(`Show skill text: "<span class="code">${translate(data.SkillName?.Hash)}</span>".`));
  },
  StackStatusDesc: function(data, container) {
    container.append($('<div class="minor">').html(`Stack status text: "<span class="code">${translate(data.TextID?.Hash)}</span>".`));
  },

  HideLevelStage: function(data, container) {
    container.append($('<div class="minor">').html(`Change stage visibility to <span class="code">${!(data.IsHide ?? false)}</span>.`));
  },
  SetEntityVisible: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${data.TargetType?.Alias}</span> visibility to <span class="code">${data.Visible ?? false}</span>.`));
  },
  SetAttachmentVisibility: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${data.TargetType?.Alias}</span>\'s <span class="code">${data.AttachPoints.map(i => i.Name).join(', ')}</span> visibility to <span class="code">${data.Visibility ?? false}</span>.`));
  },

  StartAim: function(data, container) {
    container.append($('<div class="minor">').html(`Aim at <span class="code">${data.TargetType?.Alias}</span> over <span class="code">${data.TransitTime}</span> seconds.`));
  },
  StopAim: function(data, container) {
    container.append($('<div class="minor">').html(`Stop aiming.`));
  },
  StartEffectAim: function(data, container) {
    container.append($('<div class="minor">').html(`Aim <span class="code">${data.UniqueEffectName}</span> at <span class="code">${data.TargetType?.Alias}</span> over <span class="code">${data.Duration}</span> seconds.`));
  },

  MoveToTargetPosition: function(data, container) {
    container.append($('<div class="minor">').html(`Move to <span class="code">${data.TargetType?.Alias}</span> with offset <span class="code">${data.OffsetTargetDistance?.FixedValue?.Value}</span>.`));
  },  
  MoveToTargetList: function(data, container) {
    container.append($('<div class="minor">').html(`Move <span class="code">${data.TargetType?.Alias}</span> with animation <span class="code">${data.AnimStateName}</span>.`));
  },  
  TriggerAnimStateWithMove: function(data, container) {
    container.append($('<div class="minor">').html(`Move <span class="code">${data.TargetType?.Alias}</span> with animation <span class="code">${data.AnimStateName}</span>.`));
    var eventList = data.EventList;
    if (eventList != undefined)
      for (var i = 0; i < eventList.length; i++)
      {
        var event = eventList[i];
        container.append($('<div>').html(`At <span class="code">${(event.NormalizedTime?.FixedValue?.Value) * 100}</span>%:`));
        var tasks = event.TaskList;
        for (var j = 0; j < tasks.length; j++)
        {
          var task = tasks[j];
          container.append(createGamecoreView(task));
        }
      }
  },
  
  VCameraConfigChange: function(data, container) {
    container.append($('<div class="minor">').html(`Apply camera settings.`));
  },

  WaitSecond: function(data, container) {
    container.append($('<div class="minor">').html(`Wait <span class="code">${data.WaitTime}</span> seconds.`));
  },  
  WaitAnimState: function(data, container) {
    container.append($('<div class="minor">').html(`Wait for <span class="code">${data.TargetType?.Alias}</span>\'s <span class="code">${data.AnimStateName}</span> animation to reach <span class="code">${(data.NormalizedTimeEnd?.FixedValue?.Value ?? 1) * 100}</span>%.`));
  },
};

function createGamecoreView(data)
{
  return createExplanationView(data, function(container)
  {
    var gamecoreName = data.$type;
    var parts = gamecoreName.split('.');
  
    if (parts.length === 3) 
    {
      gamecoreName = parts[2];
      var gamecoreFunction = gamecoreFunctions[gamecoreName];
      
      if (gamecoreFunction != undefined) 
      {
        gamecoreFunction(data, container);
        if ((data.Inverse ?? false) || (data.InverseResultFlag ?? false))
          container.children('div:first-child').append($('<span class="code">').text(' (Inverted)'));

        return true;
      }
      else console.log(`Not found: ${gamecoreName}`);
    }
    else console.log(`Invalid format: ${gamecoreName}`);

    var cleanName = gamecoreName.split(/([A-Z][a-z]+)/).filter(e => e).join(' ');
    container.append($('<div class="missing">').html(`${cleanName}.`));
    return true;
  });
}

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
      .click(function() {
        source.slideToggle();
      });
  }

  return container;
}