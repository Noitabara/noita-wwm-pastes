var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "./statuses", "item/IItem", "item/Items", "entity/IEntity", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman", "event/EventManager", "event/EventBuses"], function (require, exports, Mod_1, statuses_1, IItem_1, Items_1, IEntity_1, ModRegistry_1, Action_1, IAction_1, IHuman_1, EventManager_1, EventBuses_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let log;
    class Pastes extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.buff_stam_data = {};
            this.buff_weight_data = {};
        }
        onInitialize() {
            log = this.getLog();
            log.info('Hello, sweet world. ');
        }
        onPlayerDeath(player) {
            log.info('Lol you died.');
        }
        returnPlayerWeight(player, weight) {
            if (!this.buff_weight_data[player.identifier]) {
                console.log('oof');
                this.buff_weight_data[player.identifier] = {
                    PasteBuffTick: 0,
                    PasteBuffQuality: 0,
                    PasteBuffMinDura: 0,
                    PasteBuffMaxDura: 0,
                    PasteBuffEffects: 0
                };
            }
            if (this.buff_weight_data[player.identifier].PasteBuffEffects > 0) {
                log.info(weight, this.buff_weight_data[player.identifier].PasteBuffEffects);
                return weight + this.buff_weight_data[player.identifier].PasteBuffEffects;
            }
            return weight;
        }
    }
    __decorate([
        EventManager_1.EventHandler(EventBuses_1.EventBus.Players, "die")
    ], Pastes.prototype, "onPlayerDeath", null);
    __decorate([
        EventManager_1.EventHandler(EventBuses_1.EventBus.Players, "getMaxWeight")
    ], Pastes.prototype, "returnPlayerWeight", null);
    __decorate([
        ModRegistry_1.default.statusEffect("StamBuff", statuses_1.StaminaBuff)
    ], Pastes.prototype, "statusEffectStamBuff", void 0);
    __decorate([
        ModRegistry_1.default.statusEffect("WeightBuff", statuses_1.WeightBuff)
    ], Pastes.prototype, "statusEffectWeightBuff", void 0);
    __decorate([
        ModRegistry_1.default.action("ConsumeStamPaste", new Action_1.Action(IAction_1.ActionArgument.Item)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Ghost, IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, item) => {
            let player = action.executor;
            Pastes.INST.buff_stam_data[player.identifier] = {
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
        ModRegistry_1.default.action("ConsumeWeightPaste", new Action_1.Action(IAction_1.ActionArgument.Item)
            .setUsableBy(IEntity_1.EntityType.Player)
            .setUsableWhen(IAction_1.ActionUsability.Ghost, IAction_1.ActionUsability.Paused, IAction_1.ActionUsability.Delayed, IAction_1.ActionUsability.Moving)
            .setHandler((action, item) => {
            let player = action.executor;
            Pastes.INST.buff_weight_data[player.identifier] = {
                PasteBuffTick: 1,
                PasteBuffQuality: item.quality,
                PasteBuffMinDura: item.minDur,
                PasteBuffMaxDura: item.maxDur,
                PasteBuffEffects: 0
            };
            const playerBuffRef = Pastes.INST.buff_weight_data[player.identifier];
            const increaseWeightBy = Math.floor((playerBuffRef.PasteBuffMinDura / playerBuffRef.PasteBuffMaxDura * playerBuffRef.PasteBuffQuality + 1) * 10);
            Pastes.INST.buff_weight_data[player.identifier].PasteBuffEffects = increaseWeightBy;
            player.setStatus(Pastes.INST.statusEffectWeightBuff, true, IEntity_1.StatusEffectChangeReason.Gained);
            player.updateStrength();
            player.updateTablesAndWeight("M");
            itemManager.remove(item);
        }))
    ], Pastes.prototype, "actionConsumeWeightPaste", void 0);
    __decorate([
        ModRegistry_1.default.item("StamPaste", {
            use: [ModRegistry_1.Registry().get("actionConsumeStamPaste")],
            weight: 0.5,
            recipe: {
                components: [
                    Items_1.RecipeComponent(IItem_1.ItemType.Dough, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Vegetable, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Fruit, 4, 4, 0, true)
                ],
                skill: IHuman_1.SkillType.Cooking,
                level: IItem_1.RecipeLevel.Simple,
                reputation: 0
            },
            groups: [IItem_1.ItemTypeGroup.CookedFood]
        })
    ], Pastes.prototype, "itemStamPaste", void 0);
    __decorate([
        ModRegistry_1.default.item("WeightPaste", {
            use: [ModRegistry_1.Registry().get("actionConsumeWeightPaste")],
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
    ], Pastes.prototype, "itemWeightPaste", void 0);
    __decorate([
        Mod_1.default.instance("Buff Pastes")
    ], Pastes, "INST", void 0);
    exports.default = Pastes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFlQSxJQUFJLEdBQVEsQ0FBQTtJQUVaLE1BQXFCLE1BQU8sU0FBUSxhQUFHO1FBQXZDOztZQUVXLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQTtZQUNuQyxxQkFBZ0IsR0FBcUIsRUFBRSxDQUFBO1FBc0lsRCxDQUFDO1FBcElVLFlBQVk7WUFDZixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUNwQyxDQUFDO1FBR1MsYUFBYSxDQUFDLE1BQWM7WUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUc3QixDQUFDO1FBR1Msa0JBQWtCLENBQUMsTUFBYyxFQUFFLE1BQWM7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUc7b0JBQ3ZDLGFBQWEsRUFBRSxDQUFDO29CQUNoQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO2lCQUN0QixDQUFBO2FBQ0o7WUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO2dCQUMvRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixD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