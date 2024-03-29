
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
    container.append($('<div>').html(`Complex skill AI. <a href="auto.html">View Details</a>`));
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
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>'\s <span class="code">${data.DynamicKey} ${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByIsContainModifier: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> has modifier <span class="code">${data.ModifierName}</span>`));
  },

  ByCompareMonsterPhase: function(data, container) {
    container.append($('<div>').html(`Check phase <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>`));
  },

  ByCompareCharacterNumber: function(data, container) {
    container.append($('<div>').html(`Check character count in <span class="code">${toTargetName(data.TargetType)}</span> is <span class="code">${data.CompareType} ${formulaView(data.CompareNumber)}</span>`));
    var predicate = data.Predicate;
    if (predicate != undefined)
    {
      container.append($('<div>').text('With condition:'));
      container.append(createGamecoreView(predicate));
    }
  },

  ByCompareAliveEnemyNumber: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>'\s alive enemy number is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>`));
  },

  ByCompareBP: function(data, container) {
    container.append($('<div>').html(`Check skill points <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByRandomChance: function(data, container) {
    container.append($('<div>').html(`<span class="code">${formulaView(data.Chance)}</span>% chance.`));
  },

  ByCompareModifierValue: function(data, container) {
    container.append($('<div>').html(`Check modifier <span class="code">${data.ModifierName}</span>\'s <span class="code">${data.ValueType}</span> is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>`));
  },

  ByCompareMonsterID: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>'\s monster ID is <span class="code">${formulaView(data.TargetMonsterID)}</span>`));
  },

  ByContainBehaviorFlag: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> has <span class="code">${data.Flag}</span> flag.`));
  },

  ByCompareHPRatio: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> HP ratio is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },
  ByCompareHP: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> HP is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByDistance: function(data, container) {
    container.append($('<div>').html(`Check distance from <span class="code">${toTargetName(data.From)}</span> to <span class="code">${toTargetName(data.To)}</span> is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  BySkillPointActivated: function(data, container) {
    var traceName = '';
    switch (data.PointTriggerKey?.Hash)
    {
      case 1455742903: traceName = 'A2'; break;
      case 1455742904: traceName = 'A4'; break;
      case 1455742905: traceName = 'A6'; break;
      default: traceName = data.PointTriggerKey?.Hash; break;
    }
    container.append($('<div>').html(`Check trace <span class="code">${traceName}</span> unlocked.`));
  },  
  ByRankActivated: function(data, container) {
    var eidolonName = '';
    switch (data.TriggerKey?.Hash)
    {
      case 2089636447: eidolonName = 'E1'; break;
      case 523552506: eidolonName = 'E2'; break;
      case 1686351920: eidolonName = 'E4'; break;
      case -1445815962: eidolonName = 'E6'; break;
      default: eidolonName = data.TriggerKey?.Hash; break;
    }
    container.append($('<div>').html(`Check eidolon <span class="code">${eidolonName}</span> unlocked.`));
  },

  ByCompareTarget: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> is <span class="code">${toTargetName(data.CompareType)}</span>.`));
  },

  ByIsTurnActionEntity: function(data, container) {
    container.append($('<div>').html(`Check it's <span class="code">${toTargetName(data.TargetType)}</span>\'s turn.`));
  },

  ByCompareWaveCount: function(data, container) {
    container.append($('<div>').html(`Check wave number <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByCurrentSkillType: function(data, container) {
    container.append($('<div>').html(`Check the skill type is <span class="code">${data.SkillType ?? "Basic ATK"}</span>.`));
  },

  ByHasStanceWeak: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> is weak to <span class="code">${data.WeakType}</span>.`));
  },

  ByCompareAbilityProperty: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>\s <span class="code">${data.Property}</span> is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByAttackType: function(data, container) {
    container.append($('<div>').html(`Check attack type is <span class="code">${data.AttackTypes?.join(', ')}.`));
  },

  ByIsDamageCritical: function(data, container) {
    container.append($('<div>').html(`Check critical hit.`));
  },

  ByContainsParamFlag: function(data, container) {
    container.append($('<div>').html(`Check parameter has flag <span class="code">${data.Flag}</span>.`));
  },

  ByCompareParamValue: function(data, container) {
    container.append($('<div>').html(`Check parameter is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByTargetTeam: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> is in <span class="code">${data.Team}</span>.`));
  },

  ByStatusCount: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> has <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span> status effects.`));
  },

  ByTargetListIntersects: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.FirstTargetType)}</span> and <span class="code">${toTargetName(data.SecondTargetType)}</span> intersect.`));
  },

  ByIsTopActionDelayTarget: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> is next to take a turn for <span class="code">${toTargetName(data.CompareTargetType)}</span> (Excluding <span class="code">${toTargetName(data.ExcludeTargetType)}</span>).`));
  },

  ByCompareSPRatio: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>\'s energy % is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  ByCharacterDamageType: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span>\'s damage type is <span class="code">${data.DamageType}</span>.`));
  },

  ByIsMazeSkillAffectCurrentWave: function(data, container) {
    container.append($('<div>').html(`Check the technique should affect the current wave.`));
  },

  ByIsStageFirstWave: function(data, container) {
    container.append($('<div>').html(`Check it's the first wave of a stage.`));
  },

  ByHaveEnemyAlive: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> has a living enemy.`));
  },

  ByIsEnemy: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetTypeA)}</span> and <span class="code">${toTargetName(data.TargetTypeB)}</span> are enemies.`));
  },

  ByIsTeammate: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> is teammate.`));
  },

  ByCompareMonsterRank: function(data, container) {
    container.append($('<div>').html(`Check <span class="code">${toTargetName(data.TargetType)}</span> monster rank is <span class="code">${data.CompareType} ${formulaView(data.CompareValue)}</span>.`));
  },

  // SELECTORS

  AIModifierNameSelector: function(data, container) {
    if (data.ModifierCaster != undefined)
        container.append($('<div>').html(`Select by <span class="code">${toTargetName(data.ModifierCaster)}</span>\'s modifier <span class="code">${data.ModifierName}</span>.`));
      else container.append($('<div>').html(`Select by modifier <span class="code">${data.ModifierName}</span>.`));
  },

  AIPropertySelector: function(data, container) {
    container.append($('<div>').html(`Select by the <span class="code">${data.PropertyStrategy}</span> of <span class="code">${data.Property}</span>.`));
  },

  AITaskTargetTypeSelector: function(data, container) {
    container.append($('<div>').html(`Select in <span class="code">${toTargetName(data.TargetType)}</span>.`));
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
    container.append($('<div>').html(`Define <span class="code">${toTargetName(data.TargetType)}</span>'\s <span class="code">${data.DynamicKey}</span> to <span class="code">${formulaView(data.ResetValue)}</span>.`));
  },

  SetDynamicValue: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${formulaView(data.Value)}</span>.`));
  },

  SetDynamicValueByAddValue: function(data, container) {
    container.append($('<div>').html(`Add <span class="code">${formulaView(data.AddValue)}</span> to <span class="code">${toTargetName(data.TargetType)}</span>'\s <span class="code">${data.Key}</span> and clamp between <span class="code">${formulaView(data.Min)}</span> and <span class="code">${formulaView(data.Max)}</span>.`));
  },
  SetDynamicValueByProperty: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${toTargetName(data.ReadTargetType)}</span>'\s <span class="code">${data.Value}</span>.`));
  },
  SetDynamicValueByModifierValue: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${toTargetName(data.ReadTargetType)}</span>\'s <span class="code">${data.ModifierName}</span>\'s <span class="code">${data.ValueType}</span>.`));
  },
  SetDynamicValueByCharacterCount: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${toTargetName(data.ReadTargetType)}</span>\'s character count.`));
  },
  SetDynamicValueByHPRatio: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${toTargetName(data.ReadTargetType)}</span>\'s HP ratio.`));
  },
  SetDynamicValueByStatusCount: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${data.DynamicKey}</span> to <span class="code">${toTargetName(data.ReadTargetType)}</span>\'s status effect count.`));
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
    container.append($('<div>').html(`Trigger <span class="code">${toTargetName(data.TargetType)}</span>\'s ability <span class="code">${data.AbilityName}</span> with target <span class="code">${toTargetName(data.AbilityInherentTargetType)}</span>.`));
  },

  DamageByAttackProperty: function(data, container) {
    var damageFormula = [];
    if (data.AttackProperty?.DamagePercentage != undefined)
      damageFormula.push(`<span class="code">${formulaView(data.AttackProperty?.DamagePercentage)}</span>% <span class="code">${data.AttackProperty?.FormulaType ?? "ATK"}</span> damage`);
    if (data.AttackProperty?.ExtraDamagePercentage != undefined)
      damageFormula.push(`<span class="code">${formulaView(data.AttackProperty?.ExtraDamagePercentage)}</span>% <span class="code">${data.AttackProperty?.ExtraFormulaType}</span> damage`);
    if (data.AttackProperty?.DamageValue != undefined)
      damageFormula.push(`<span class="code">${formulaView(data.AttackProperty?.DamageValue)}</span> flat damage`);
    if (data.AttackProperty?.StanceValue != undefined)
      damageFormula.push(`<span class="code">${formulaView(data.AttackProperty?.StanceValue)}</span> toughness damage`);

    var damageText = damageFormula.join(', ');
    if (data.AttackProperty?.HitSplitRatio != undefined)
      damageText = `<span class="code">${formulaView(data.AttackProperty?.HitSplitRatio)}</span> of ` + damageText;
    var element = data.AttackProperty?.DamageType;
    if (element == undefined)
    {
      if (data.AttackProperty?.DamageTypeFromAttacker ?? false)
        element = 'AttackerElement';
      else element = 'Physical';
    }
    damageText += ` as <span class="code">${element}</span>`;
    if (data.AttackProperty?.AttackType != undefined)
      damageText += ` <span class="code">${data.AttackProperty?.AttackType}</span>`;

    if (data.AttackProperty?.FinalFormulaType != undefined)
      damageText += ` using <span class="code">${data.AttackProperty?.FinalFormulaType}</span>`;

    container.append($('<div>').html(`Deal ${damageText} to <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },

  FireProjectile: function(data, container) {
    container.append($('<div>').html(`Fire projectile at <span class="code">${toTargetName(data.TargetType)}</span>.`));
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
    container.append($('<div>').html(`Fire <span class="code">${data.Count}</span>-hit wave projectile from <span class="code">${toTargetName(data.CasterTargetType)}</span> to <span class="code">${toTargetName(data.TargetType)}</span>.`));
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

  SummonPartner: function(data, container) {
    container.append($('<div>').html(`Summon <span class="code">${data.MemberName}</span> partner.`));
  },

  ModifyDamageData: function(data, container) {
    container.append($('<div>').html(`Modify damage data:`));
    for (var key in data) 
      if (data.hasOwnProperty(key) && key != '$type') 
      {
        var value = data[key];
        container.append(createExplanationView(value, function(c)
        {
          c.append($('<div>').html(`Set <span class="code">${key}</span> to <span class="code">${formulaView(value)}</span>`));
          return true;
        }));
      }
  },
  ModifyHealData: function(data, container) {
    container.append($('<div>').html(`Modify heal data:`));
    for (var key in data) 
      if (data.hasOwnProperty(key) && key != '$type') 
      {
        var value = data[key];
        container.append(createExplanationView(value, function(c)
        {
          c.append($('<div>').html(`Set <span class="code">${key}</span> to <span class="code">${formulaView(value)}</span>`));
          return true;
        }));
      }
  },

  HealHP: function(data, container) {
    container.append($('<div>').html(`Heal <span class="code">${toTargetName(data.TargetType)}</span> by <span class="code">${(formulaView(data.HealPercentage))}</span>% <span class="code">${data.FormulaType ?? "ATK"}</span>.`));
  },
  SetHP: function(data, container) {
    container.append($('<div>').html(`Set <span class="code">${toTargetName(data.TargetType)}</span>\'s HP to <span class="code">${formulaView(data.ModifyValue)}</span>.`));
  },
  LoseHPByRatio: function(data, container) {
    container.append($('<div>').html(`Have <span class="code">${toTargetName(data.TargetType)}</span> lose <span class="code">${data.RatioType}</span>.`));
  },
  ModifySPNew: function(data, container) {
    if (data.AddValue != undefined)
      container.append($('<div>').html(`Add <span class="code">${formulaView(data.AddValue)}</span> flat energy to <span class="code">${toTargetName(data.TargetType)}</span>.`));
    else if (data.FixedAddMaxSPRatio != undefined)
        container.append($('<div>').html(`Add <span class="code">${formulaView(data.FixedAddMaxSPRatio)}</span>% energy to <span class="code">${toTargetName(data.TargetType)}</span>.`));
    else if (data.AddRatio != undefined)
      container.append($('<div>').html(`Add <span class="code">${formulaView(data.AddRatio)}</span> of the skill energy bonus to <span class="code">${toTargetName(data.TargetType)}</span>.`));
    else container.append($('<div>').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s energy.`));
  },

  SetActionDelay: function(data, container) {
    if (data.NormalizedValue != undefined)
    container.append($('<div>').html(`Set action delay for <span class="code">${toTargetName(data.TargetType)}</span> to <span class="code">${formulaView(data.NormalizedValue)}%</span>.`));
    else container.append($('<div>').html(`Set action delay for <span class="code">${toTargetName(data.TargetType)}</span> to <span class="code">${formulaView(data.Value)}</span>.`));
  },
  ModifyActionDelay: function(data, container) {
    if (data.AddNormalizedValue != undefined)
      container.append($('<div>').html(`Change action delay for <span class="code">${toTargetName(data.TargetType)}</span> by <span class="code">${formulaView(data.AddNormalizedValue)}%</span>.`));
    else container.append($('<div>').html(`Change action delay for <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },
  ModifyCurrentSkillDelayCost: function(data, container) {
    container.append($('<div>').html(`Change current skill delay cost by <span class="code">${formulaView(data.NormalizedValue)}</span>.`));
  },

  ModifyTeamBoostPoint: function(data, container) {
    container.append($('<div>').html(`<span class="code">${data.ModifyFunction}</span> <span class="code">${formulaView(data.ModifyValue)}</span> skill point.`));
  },

  ShowEntityFloatMessage: function(data, container) {
    container.append($('<div>').html(`Show message above <span class="code">${toTargetName(data.TargetType)}</span>: "<span class="code">${translate(data.ContentID?.Hash)}</span>".`));
  },

  AddModifier: function(data, container) {
    var text = `Apply modifier <span class="code">${data.ModifierName}</span> to <span class="code">${toTargetName(data.TargetType)}</span>`;
    if (data.Chance != undefined)
      text += ` with <span class="code">${formulaView(data.Chance)}</span> base chance`;
    if (data.MaxLayer != undefined)
      text += ` with up to <span class="code">${formulaView(data.MaxLayer)}</span> stacks`;
    if (data.LifeTime != undefined)
      text += ` for <span class="code">${formulaView(data.LifeTime)}</span> turns`;
    text += `.`;

    container.append($('<div>').html(text));
    var dynamicValues = data.DynamicValues;
    for (var key in dynamicValues) 
      if (dynamicValues.hasOwnProperty(key)) 
      {
        var value = dynamicValues[key];
        container.append(createExplanationView(value, function(c)
        {
          c.append($('<div>').html(`With <span class="code">${key}</span> set to <span class="code">${formulaView(value)}</span>`));
          return true;
        }));
      }
  },
  RemoveModifier: function(data, container) {
    container.append($('<div>').html(`Remove modifier <span class="code">${data.ModifierName}</span> from <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },
  RemoveSelfModifier: function(data, container) {
    container.append($('<div>').html(`Remove this modifier.`));
  },
  StackProperty: function(data, container) {
    container.append($('<div>').html(`Add <span class="code">${formulaView(data.PropertyValue)} ${data.Property}</span> to <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },
  TriggerModifierCustomEvent: function(data, container) {
    container.append($('<div>').html(`Trigger <span class="code">${toTargetName(data.TargetType)}</span>\'s modifier\'s custom event <span class="code">${data.EventType}</span> with <span class="code">${data.DynamicKey}</span> set to <span class="code">${formulaView(data.Value)}</span>.`));
  },  
  SetModifierValue: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s modifier <span class="code">${data.ModifierName}</span> value, <span class="code">${data.ModifyFunction ?? 'Set'} ${formulaView(data.Value)}</span>.`));
  },
  DispelStatus: function(data, container) {
    container.append($('<div>').html(`Dispel <span class="code">${toTargetName(data.TargetType)}</span>\'s <span class="code">${data.Order ?? 'All'} ${data.BuffType ?? 'Debuff'}</span>.`));
  },

  InitShield: function(data, container) {
    container.append($('<div>').html(`Apply a <span class="code">${formulaView(data.ShieldValue)}</span> HP shield to <span class="code">${toTargetName(data.TargetType)}</span> with formula <span class="code">${data.FormulaType}</span>.`));
  },
  RemoveShield: function(data, container) {
    container.append($('<div>').html(`Remove shield from <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },

  TurnInsertAbility: function(data, container) {
    container.append($('<div>').html(`Insert ability <span class="code">${toTargetName(data.TargetType)}</span>\'s <span class="code">${data.AbilityName}</span> ability, targetting <span class="code">${toTargetName(data.AbilityTarget)}</span> with priority <span class="code">${data.InsertAbilityPriority}</span>.`));
  },
  TurnInsertAction: function(data, container) {
    container.append($('<div>').html(`Insert extra turn with ability <span class="code">${data.PrepareAbilityName}</span>.`));
  },

  Retarget: function(data, container) {
    container.append($('<div>').html(`Targetting <span class="code">${formulaView(data.MaxNumber)}</span> of <span class="code">${toTargetName(data.TargetType)}</span>,`));
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

  MakeSuccess: function(data, container) {
    container.append($('<div>').html(`Make success(?):`));
    container.append(createGamecoreView(data.Task));
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
    container.append($('<div>').html(`Repeat <span class="code">${formulaView(data.MaxLoopCount)}</span> times:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },
  LoopExecuteTaskListWithInterval: function(data, container) {
    container.append($('<div>').html(`Repeat <span class="code">${formulaView(data.MaxLoopCount)}</span> times:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },
  ConditionLoopExecuteTaskList: function(data, container) {
    container.append($('<div>').html(`Repeat while:`));
    container.append(createGamecoreView(data.Predicate));
    container.append($('<div>').html(`Do:`));
    var tasks = data.TaskList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      container.append(createGamecoreView(task));
    }
  },
  RandomConfig: function(data, container) {
    container.append($('<div>').html(`Randomly do,`));
    var tasks = data.TaskList;
    var odds = data.OddsList;
    for (var i = 0; i < tasks.length; i++)
    {
      var task = tasks[i];
      var odd = odds[i];
      container.append($('<div>').html(`<span class="code">${formulaView(odd)}</span>%:`));
      container.append(createGamecoreView(task));
    }
  },

  CharacterChangePhase: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s phase to <span class="code">${data.PhaseName}</span>.`));
  },  
  SetMonsterPhase: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s phase to <span class="code">${data.PhaseNum}</span>.`));
  },
  LockHP: function(data, container) {
    container.append($('<div>').html(`Lock HP to <span class="code">${(formulaView(data.Threshold))}</span>%.`));
  },  

  ConstructBodyPart: function(data, container) {
    container.append($('<div>').html(`Create body part <span class="code">${data.PartName}</span>.`));
  },

  ExitBreakState: function(data, container) {
    container.append($('<div>').html(`Clear <span class="code">${toTargetName(data.TargetType)}</span>\'s break state.`));
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
    container.append($('<div>').html(`Have <span class="code">${toTargetName(data.TargetType)}</span> die immediately.`));
  },
  ForceKill: function(data, container) {
    container.append($('<div>').html(`Kill <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },
  EscapeFromBattle: function(data, container) {
    container.append($('<div>').html(`Escape from battle.`));
  },

  SetControlSkillMapping: function(data, container) {
    container.append($('<div>').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s <span class="code">${data.ControlSkillType}</span> skill mapping to <span class="code">${data.SkillTriggerKey}</span>.`));
  },
  ShowUltraSkillAlternative: function(data, container) {
    container.append($('<div>').html(`Show ultimate options.`));
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
    container.append($('<div class="minor">').html(`Play <span class="code">${toTargetName(data.TargetType)}</span>\'s animation <span class="code">${data.AnimStateName}</span> / <span class="code">${data.AnimLogicState}</span>.`));
  },

  TriggerEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Play visual effect at <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },

  TriggerEffectList: function(data, container) {
    container.append($('<div class="minor">').html(`Play multiple visual effects at <span class="code">${toTargetName(data.TargetType)}</span>.`));
  },

  RemoveEffect: function(data, container) {
    container.append($('<div class="minor">').html(`Remove visual effect from <span class="code">${toTargetName(data.TargetType)}</span>.`));
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
    container.append($('<div class="minor">').html(`Change the scale of <span class="code">${toTargetName(data.TargetType)}</span> to <span class="code">${data.ModelScaleBase}</span>.`));
  },

  TriggerSound: function(data, container) {
    container.append($('<div class="minor">').html(`Play sound "<span class="code">${data.SoundName}</span>".`));
  },

  ShowBossInfoBar: function(data, container) {
    container.append($('<div class="minor">').html(`Set show boss info bar for <span class="code">${toTargetName(data.TargetType)}</span> to <span class="code">${data.IsShow}</span>.`));
  },

  ShowBattleUI: function(data, container) {
    container.append($('<div class="minor">').html(`Set show battle UI to <span class="code">${data.IsShow}</span>.`));
  },
  // not sure what the IsShow parameter is really named
  //MakeCharacterHUDVisible: function(data, container) {
  //  container.append($('<div class="minor">').html(`Set show character HUD for <span class="code">${toTargetName(data.TargetType)}</span> to <span class="code">${data.IsShow}</span>.`));
  //},
  ShowUIPage: function(data, container) {
    container.append($('<div class="minor">').html(`Show help page.`));
  },
  ShowSkillTextDialog: function(data, container) {
    container.append($('<div class="minor">').html(`Show skill text: "<span class="code">${translate(data.SkillName?.Hash)}</span>".`));
  },
  StackStatusDesc: function(data, container) {
    container.append($('<div class="minor">').html(`Change status text: "<span class="code">${translate(data.TextID?.Hash)}</span>".`));
  },
  StackSkillDesc: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${data.SkillName}</span>\'s text: "<span class="code">${translate(data.OverrideSimpleDescTextID?.Hash)}</span>".`));
  },
  SetEnergyBarState: function(data, container) {
    container.append($('<div class="minor">').html(`Change character bar to <span class="code">${formulaView(data.CurrentCount)}</span> / <span class="code">${formulaView(data.MaxCount)}</span> with <span class="code">${formulaView(data.CD)}</span> cooldown.`));
  },

  HideLevelStage: function(data, container) {
    container.append($('<div class="minor">').html(`Change stage visibility to <span class="code">${!(data.IsHide ?? false)}</span>.`));
  },
  SetEntityVisible: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${toTargetName(data.TargetType)}</span> visibility to <span class="code">${data.Visible ?? false}</span>.`));
  },
  SetAttachmentVisibility: function(data, container) {
    container.append($('<div class="minor">').html(`Change <span class="code">${toTargetName(data.TargetType)}</span>\'s <span class="code">${data.AttachPoints.map(i => i.Name).join(', ')}</span> visibility to <span class="code">${data.Visibility ?? false}</span>.`));
  },

  StartAim: function(data, container) {
    container.append($('<div class="minor">').html(`Aim at <span class="code">${toTargetName(data.TargetType)}</span> over <span class="code">${data.TransitTime}</span> seconds.`));
  },
  StopAim: function(data, container) {
    container.append($('<div class="minor">').html(`Stop aiming.`));
  },
  StartEffectAim: function(data, container) {
    container.append($('<div class="minor">').html(`Aim <span class="code">${data.UniqueEffectName}</span> at <span class="code">${toTargetName(data.TargetType)}</span> over <span class="code">${data.Duration}</span> seconds.`));
  },

  MoveToTargetPosition: function(data, container) {
    container.append($('<div class="minor">').html(`Move to <span class="code">${toTargetName(data.TargetType)}</span> with offset <span class="code">${formulaView(data.OffsetTargetDistance)}</span>.`));
  },  
  MoveToTargetList: function(data, container) {
    container.append($('<div class="minor">').html(`Move <span class="code">${toTargetName(data.TargetType)}</span> with animation <span class="code">${data.AnimStateName}</span>.`));
  },  
  TriggerAnimStateWithMove: function(data, container) {
    container.append($('<div class="minor">').html(`Move <span class="code">${toTargetName(data.TargetType)}</span> with animation <span class="code">${data.AnimStateName}</span>.`));
    var eventList = data.EventList;
    if (eventList != undefined)
      for (var i = 0; i < eventList.length; i++)
      {
        var event = eventList[i];
        container.append($('<div>').html(`At <span class="code">${formulaView(event.NormalizedTime) * 100}</span>%:`));
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

  TargetTimeSlow: function(data, container) {
    container.append($('<div class="minor">').html(`Slow <span class="code">${toTargetName(data.TargetType)}</span>\'s time to <span class="code">${data.TimeScale}</span> for <span class="code">${data.UnscaledDuration}</span>s.`));
  },

  WaitSecond: function(data, container) {
    container.append($('<div class="minor">').html(`Wait <span class="code">${data.WaitTime}</span> seconds.`));
  },  
  WaitAnimState: function(data, container) {
    container.append($('<div class="minor">').html(`Wait for <span class="code">${toTargetName(data.TargetType)}</span>\'s <span class="code">${data.AnimStateName}</span> animation to reach <span class="code">${formulaView(data.NormalizedTimeEnd) * 100}</span>%.`));
  },
};

function toTargetName(data)
{
  switch (data?.$type)
  {
    case 'RPG.GameCore.TargetAlias':
      return data.Alias ?? 'Caster(?)';
    case 'RPG.GameCore.TargetConcat':
      return data.Targets?.map(t => toTargetName(t))?.join(', ');
  }
  return 'Caster(?)';
}

function formulaView(data)
{
  var fixedValue = data?.FixedValue?.Value;
  if (fixedValue != undefined)
    return cleanupFloat(fixedValue);

  var postFixExpr = data?.PostfixExpr;
  if (postFixExpr != undefined)
  {
    var opCodes = postFixExpr.OpCodes;
    var constants = postFixExpr.FixedValues;
    var variables = postFixExpr.DynamicHashes;

    var formula = '';
    var stack = [];

    var bytes = atob(opCodes);
    for (var i = 0; i < bytes.length; i++)
    {
      var opCode = bytes.charCodeAt(i);
      switch (opCode)
      {
        case 0: // Constant
          stack.push(cleanupFloat(constants?.[bytes.charCodeAt(++i)]?.Value));
          break;
        case 1: // Variable
          stack.push(`Var(${variables?.[bytes.charCodeAt(++i)]})`);
          break;
        case 2: // Add
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) + (${right})`);
          break;
        case 3: // Subtract
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) - (${right})`);
          break;
        case 4: // Multiply
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) * (${right})`);
          break;
        case 5: // Divide
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) / (${right})`);
          break;
        case 6: // Negative
          var right = stack.pop();
          stack.push(`-(${right})`);
          break;
        case 7: // Not
          var right = stack.pop();
          stack.push(`!(${right})`);
          break;
        case 8: // Call
          var right = stack.pop();
          stack.push(`Call(${bytes.charCodeAt(++i)}, ${right}`);
          break;
        case 9: // Return
          var result = stack.pop();
          formula = result;
          break;
      }
    }

    return formula;
  }

  return undefined;
}

var dynamicValueTypeToIndex =
{
  None: 0,
  SkillParam: 1,
  SkillTreeParam: 2,
  SkillEquip: 3,
  SkillRank: 4,
  SkillRelic: 5,
  BattleEvent: 6,
  StageBattleEvent: 7,
}

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
