var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "entity/status/StatusEffect", "entity/IStats", "item/IItem", "item/Items", "entity/IEntity", "renderer/INotifier", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman", "mod/IHookHost", "entity/action/ActionExecutor"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IItem_1, Items_1, IEntity_1, INotifier_1, ModRegistry_1, Action_1, IAction_1, IHuman_1, IHookHost_1, ActionExecutor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let log;
    class StaminaBuff extends StatusEffect_1.default {
        getOptions() {
            return {
                untreatable: true,
                effectRateMultiplier: 0.1,
                startWith: false,
                effectMultiplier: 0,
                passChanceMultiplier: 0
            };
        }
        getIcon() {
            return {
                path: '../../mods/noita-wwm-pastes/static/image/item/stampaste_8.png',
                frames: 5
            };
        }
        onTick() {
            var _a, _b;
            log.info(game.time.ticks);
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
    ], StaminaBuff.prototype, "getOptions", null);
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
    class HungerBuff extends StatusEffect_1.default {
        getIcon() {
            return {
                path: '../../mods/buff_pastes/static/image/item/test_8.png',
                frames: 1
            };
        }
        onPassed() {
            log.info('The effect has passed!');
            const hBS = Pastes.INST.hungerBuffStore;
            hBS.splice(hBS.findIndex(eachPlayer => eachPlayer.player_ident == this.entity.asPlayer.identifier), 1);
        }
    }
    __decorate([
        Override
    ], HungerBuff.prototype, "getIcon", null);
    __decorate([
        Override
    ], HungerBuff.prototype, "onPassed", null);
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
                    var _a;
                    let thisPlayer = (_a = game.getPlayerByIdentifier(user.player_ident, false)) === null || _a === void 0 ? void 0 : _a.asPlayer;
                    if (thisPlayer) {
                        this.hungerBuffStore[index].ticker++;
                        ActionExecutor_1.default.get(Pastes.INST.actionTestExecuteAction).execute(localPlayer, thisPlayer, user.max_ticker);
                        if (user.ticker >= user.max_ticker) {
                            thisPlayer.setStatus(Pastes.INST.statusEffectHungerBuff, false, IEntity_1.StatusEffectChangeReason.Passed);
                            this.hungerBuffStore.splice(index, 1);
                        }
                    }
                });
                log.info(this.hungerBuffStore);
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
            .setUsableWhen(IAction_1.ActionUsability.Ghost, IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
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
                    Items_1.RecipeComponent(IItem_1.ItemType.Log, 1, 1, 0, true)
                ],
                skill: IHuman_1.SkillType.Cooking,
                level: IItem_1.RecipeLevel.Simple,
                reputation: 0
            },
            groups: [IItem_1.ItemTypeGroup.CookedFood]
        })
    ], Pastes.prototype, "itemStamPaste", void 0);
    __decorate([
        ModRegistry_1.default.statusEffect("HungerBuff", HungerBuff)
    ], Pastes.prototype, "statusEffectHungerBuff", void 0);
    __decorate([
        ModRegistry_1.default.action("TestExecuteAction", new Action_1.Action(IAction_1.ActionArgument.Player, IAction_1.ActionArgument.Number)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Ghost, IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, player, value) => {
            player.stat.increase(IStats_1.Stat.Hunger, 1, IEntity_1.StatChangeReason.Normal);
            player.notifyStat(INotifier_1.StatNotificationType.Metabolism, 1);
            player.stat.increase(IStats_1.Stat.Thirst, 1, IEntity_1.StatChangeReason.Normal);
            player.notifyStat(INotifier_1.StatNotificationType.Thirst, 1);
        }))
    ], Pastes.prototype, "actionTestExecuteAction", void 0);
    __decorate([
        ModRegistry_1.default.action("TestAction", new Action_1.Action(IAction_1.ActionArgument.Item)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Ghost, IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, item) => {
            const player = action.executor;
            if (Pastes.INST.hungerBuffStore.findIndex(pl => pl.player_ident == player.identifier) !== -1)
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFxQkEsSUFBSSxHQUFRLENBQUE7SUEyQlosTUFBTSxXQUFZLFNBQVEsc0JBQVk7UUFFbEMsVUFBVTtZQUNOLE9BQU87Z0JBQ0gsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLG9CQUFvQixFQUFFLEdBQUc7Z0JBQ3pCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixvQkFBb0IsRUFBRSxDQUFDO2FBQzFCLENBQUE7UUFDTCxDQUFDO1FBRUQsT0FBTztZQUVILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLCtEQUErRDtnQkFDckUsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFBO1FBQ0wsQ0FBQztRQUVELE1BQU07O1lBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRXpCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRzNFLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFNUksTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLDBCQUFnQixDQUFDLE1BQU0sRUFBQztZQUU1RixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxVQUFVLENBQUMsZ0NBQW9CLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDO1lB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