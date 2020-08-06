var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "./statuses", "item/IItem", "item/Items", "entity/IEntity", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman", "entity/IStats", "event/EventManager", "event/EventBuses"], function (require, exports, Mod_1, statuses_1, IItem_1, Items_1, IEntity_1, ModRegistry_1, Action_1, IAction_1, IHuman_1, IStats_1, EventManager_1, EventBuses_1) {
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
    }
    __decorate([
        EventManager_1.EventHandler(EventBuses_1.EventBus.Players, "die")
    ], Pastes.prototype, "onPlayerDeath", null);
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
            if (Pastes.INST.buff_weight_data[player.identifier].PasteBuffTick !== 0) {
                return;
            }
            Pastes.INST.buff_weight_data[player.identifier] = {
                PasteBuffTick: 0,
                PasteBuffQuality: item.quality,
                PasteBuffMinDura: item.minDur,
                PasteBuffMaxDura: item.maxDur
            };
            player.setStatus(Pastes.INST.statusEffectWeightBuff, true, IEntity_1.StatusEffectChangeReason.Gained);
            const playerBuffRef = Pastes.INST.buff_weight_data[player.identifier];
            const increaseWeightBy = Math.floor((playerBuffRef.PasteBuffMinDura / playerBuffRef.PasteBuffMaxDura * playerBuffRef.PasteBuffQuality + 1) * 10);
            player.stat.setBonus(IStats_1.Stat.Weight, increaseWeightBy, IEntity_1.StatChangeReason.BonusChanged);
            itemManager.remove(item);
        }))
    ], Pastes.prototype, "actionConsumeWeightPaste", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFnQkEsSUFBSSxHQUFRLENBQUE7SUFFWixNQUFxQixNQUFPLFNBQVEsYUFBRztRQUF2Qzs7WUFFVyxtQkFBYyxHQUFtQixFQUFFLENBQUE7WUFDbkMscUJBQWdCLEdBQXFCLEVBQUUsQ0FBQTtRQWdIbEQsQ0FBQztRQTlHVSxZQUFZO1lBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUdNLGFBQWEsQ0FBQyxNQUFjO1lBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDN0IsQ0FBQztLQXNHSjtJQXhHRztRQURDLDJCQUFZLENBQUMscUJBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDOytDQUdyQztJQU1EO1FBREMscUJBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLHNCQUFXLENBQUM7d0RBQ1I7SUFFdkM7UUFEQyxxQkFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUscUJBQVUsQ0FBQzswREFDUDtJQXFCekM7UUFuQkMscUJBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxlQUFNLENBQUMsd0JBQWMsQ0FBQyxJQUFJLENBQUM7YUFDL0QsV0FBVyxDQUFDLG9CQUFVLENBQUMsTUFBTSxDQUFDO2FBQzlCLGFBQWEsQ0FBQyx5QkFBZSxDQUFDLEtBQUssRUFBRSx5QkFBZSxDQUFDLE1BQU0sRUFBRSx5QkFBZSxDQUFDLE9BQU8sRUFBRSx5QkFBZSxDQUFDLE1BQU0sQ0FBQzthQUM3RyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDekIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtZQUU1QixN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