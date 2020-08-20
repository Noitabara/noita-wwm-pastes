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
            this.buff_weight_data[player.identifier] = {
                PasteBuffTick: 0,
                PasteBuffQuality: 0,
                PasteBuffMinDura: 0,
                PasteBuffMaxDura: 0,
                PasteBuffEffects: 0
            };
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
            log.info(weight, this.buff_weight_data[player.identifier].PasteBuffEffects);
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
            player.setStatus(Pastes.INST.statusEffectWeightBuff, false, IEntity_1.StatusEffectChangeReason.Passed);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFlQSxJQUFJLEdBQVEsQ0FBQTtJQUVaLE1BQXFCLE1BQU8sU0FBUSxhQUFHO1FBQXZDOztZQUVXLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQTtZQUNuQyxxQkFBZ0IsR0FBcUIsRUFBRSxDQUFBO1FBOElsRCxDQUFDO1FBNUlVLFlBQVk7WUFDZixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUNwQyxDQUFDO1FBR1MsYUFBYSxDQUFDLE1BQWM7WUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO2dCQUN2QyxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQzthQUN0QixDQUFBO1FBR0wsQ0FBQztRQUdTLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxNQUFjO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO29CQUN2QyxhQUFhLEVBQUUsQ0FBQztvQkFDaEIsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDdEIs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