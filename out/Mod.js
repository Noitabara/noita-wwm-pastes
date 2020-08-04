var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "entity/status/StatusEffect", "entity/IStats", "item/IItem", "item/Items", "entity/IEntity", "renderer/INotifier", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman", "doodad/IDoodad", "mod/IHookHost", "entity/action/ActionExecutor"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IItem_1, Items_1, IEntity_1, INotifier_1, ModRegistry_1, Action_1, IAction_1, IHuman_1, IDoodad_1, IHookHost_1, ActionExecutor_1) {
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
    class HungerBuff extends StatusEffect_1.default {
        getIcon() {
            return {
                path: '../../mods/buff_pastes/static/image/item/test_8.png',
                frames: 1
            };
        }
        onPassed() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFvQkEsSUFBSSxHQUFRLENBQUE7SUEyQlosTUFBTSxXQUFZLFNBQVEsc0JBQVk7UUFFbEMsT0FBTztZQUVILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLDBEQUEwRDtnQkFDaEUsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFBO1FBQ0wsQ0FBQztRQUVELE1BQU07O1lBRUYsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFHM0UsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUU1SSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsMEJBQWdCLENBQUMsTUFBTSxFQUFDO1lBRTVGLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLFVBQVUsQ0FBQyxnQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUM7WUFHaEYsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ2xDLENBQUM7UUFFRCxVQUFVO1lBRU4sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO2dCQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMs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