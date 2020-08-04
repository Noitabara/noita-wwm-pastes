var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "entity/status/StatusEffect", "entity/IStats", "item/IItem", "item/Items", "entity/IEntity", "renderer/INotifier", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman", "doodad/IDoodad", "mod/IHookHost", "entity/action/ActionExecutor", "./Status_Effects/hungerStatusEffect"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IItem_1, Items_1, IEntity_1, INotifier_1, ModRegistry_1, Action_1, IAction_1, IHuman_1, IDoodad_1, IHookHost_1, ActionExecutor_1, hungerStatusEffect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let log;
    class StaminaBuff extends StatusEffect_1.default {
        getIcon() {
            return {
                path: '../../mods/buff_pastes/static/image/item/stampaste_8.png',
                frames: 5
            };
        }
        onTick() {
            var _a, _b;
            let locPlayersData = Pastes.INST.buffData[this.entity.asPlayer.identifier];
            let effectMultiplier = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.increase(IStats_1.Stat.Stamina, effectMultiplier, IEntity_1.StatChangeReason.Normal);
            (_b = this.entity.asPlayer) === null || _b === void 0 ? void 0 : _b.notifyStat(INotifier_1.StatNotificationType.Stamina, effectMultiplier);
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            if (Pastes.INST.buffData[this.entity.asPlayer.identifier].PasteBuffTick >= 5) {
                Pastes.INST.buffData[this.entity.asPlayer.identifier].PasteBuffTick = 0;
                return true;
            }
            return false;
        }
        getDescription() {
            let locPlayersData = Pastes.INST.buffData[this.entity.asPlayer.identifier];
            let effectMultiplier = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            return super.getDescription()
                .addArgs(effectMultiplier);
        }
    }
    __decorate([
        Override
    ], StaminaBuff.prototype, "getIcon", null);
    __decorate([
        Override
    ], StaminaBuff.prototype, "onTick", null);
    __decorate([
        Override
    ], StaminaBuff.prototype, "shouldPass", null);
    __decorate([
        Override
    ], StaminaBuff.prototype, "getDescription", null);
    class Pastes extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.buffData = {};
            this.hungerBuffStore = [];
            this.thirstBuffStore = [];
        }
        onInitialize() {
            log = this.getLog();
            log.info('Hello, sweet world.');
        }
        onGameTickStart() {
            if (game.time.ticks % 10 == 0) {
                log.info('Tick happens every 10 ticks.');
                this.hungerBuffStore.forEach((user, index) => {
                    let thisPlayer = game.getPlayerByIdentifier(user.player_ident).asPlayer;
                    if (user.ticker >= user.max_ticker) {
                        thisPlayer.setStatus(Pastes.INST.statusEffectHungerBuff, false, IEntity_1.StatusEffectChangeReason.Passed);
                    }
                    this.hungerBuffStore[index].ticker++;
                    ActionExecutor_1.default.get(Pastes.INST.actionTestExecuteAction).execute(localPlayer, thisPlayer, user.max_ticker);
                });
                this.hungerBuffStore.spliceWhere(ex => ex.ticker >= ex.max_ticker);
            }
        }
    }
    __decorate([
        Override,
        IHookHost_1.HookMethod
    ], Pastes.prototype, "onGameTickStart", null);
    __decorate([
        ModRegistry_1.default.statusEffect("StamBuff", StaminaBuff)
    ], Pastes.prototype, "statusEffectStamBuff", void 0);
    __decorate([
        ModRegistry_1.default.action("ConsumeStamPaste", new Action_1.Action(IAction_1.ActionArgument.Item)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, item) => {
            let player = action.executor;
            Pastes.INST.buffData[player.identifier] = {
                PasteBuffTick: 0,
                PasteBuffQuality: item.quality,
                PasteBuffMinDura: item.minDur,
                PasteBuffMaxDura: item.maxDur
            };
            player.setStatus(Pastes.INST.statusEffectStamBuff, true, IEntity_1.StatusEffectChangeReason.Gained);
            itemManager.remove(item);
        }))
    ], Pastes.prototype, "actionConsumeStamPaste", void 0);
    __decorate([
        ModRegistry_1.default.item("StamPaste", {
            use: [ModRegistry_1.Registry().get("actionConsumeStamPaste")],
            weight: 0.5,
            recipe: {
                components: [
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.ContainerOfMedicinalWater, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Vegetable, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Fruit, 1, 1, 0, true)
                ],
                requiredDoodad: IDoodad_1.DoodadTypeGroup.LitKiln,
                skill: IHuman_1.SkillType.Cooking,
                level: IItem_1.RecipeLevel.Advanced,
                reputation: 0
            },
            groups: [IItem_1.ItemTypeGroup.CookedFood]
        })
    ], Pastes.prototype, "itemStamPaste", void 0);
    __decorate([
        ModRegistry_1.default.statusEffect("HungerBuff", hungerStatusEffect_1.default)
    ], Pastes.prototype, "statusEffectHungerBuff", void 0);
    __decorate([
        ModRegistry_1.default.action("TestExecuteAction", new Action_1.Action(IAction_1.ActionArgument.Player, IAction_1.ActionArgument.Number)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, player, value) => {
            log.info("kek", player.inventory, value);
        }))
    ], Pastes.prototype, "actionTestExecuteAction", void 0);
    __decorate([
        ModRegistry_1.default.action("TestAction", new Action_1.Action(IAction_1.ActionArgument.Item)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, item) => {
            const player = action.executor;
            Pastes.INST.hungerBuffStore.push({
                player_ident: player.identifier,
                ticker: 0,
                max_ticker: 5,
                max_durability: item.maxDur,
                min_durability: item.minDur,
                quality: item.quality
            });
            player.setStatus(Pastes.INST.statusEffectHungerBuff, true, IEntity_1.StatusEffectChangeReason.Gained);
        }))
    ], Pastes.prototype, "actionTestAction", void 0);
    __decorate([
        ModRegistry_1.default.item("Test", {
            use: [ModRegistry_1.Registry().get("actionTestAction")],
            weight: 0.5,
            recipe: {
                components: [
                    Items_1.RecipeComponent(IItem_1.ItemType.Log, 1, 1, 0, true),
                ],
                skill: IHuman_1.SkillType.Cooking,
                level: IItem_1.RecipeLevel.Simple,
                reputation: 0
            },
        })
    ], Pastes.prototype, "itemTest", void 0);
    __decorate([
        Mod_1.default.instance("Buff Pastes")
    ], Pastes, "INST", void 0);
    exports.default = Pastes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFvQkEsSUFBSSxHQUFRLENBQUE7SUEyQlosTUFBTSxXQUFZLFNBQVEsc0JBQVk7UUFFbEMsT0FBTztZQUVILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLDBEQUEwRDtnQkFDaEUsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFBO1FBQ0wsQ0FBQztRQUVELE1BQU07O1lBRUYsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFHM0UsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUU1SSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsMEJBQWdCLENBQUMsTUFBTSxFQUFDO1lBRTVGLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLFVBQVUsQ0FBQyxnQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUM7WUFHaEYsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ2xDLENBQUM7UUFFRCxVQUFVO1lBRU4sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO2dCQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMs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