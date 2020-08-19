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
    }
    __decorate([
        EventManager_1.EventHandler(EventBuses_1.EventBus.Players, "die")
    ], Pastes.prototype, "onPlayerDeath", null);
    __decorate([
        ModRegistry_1.default.statusEffect("StamBuff", statuses_1.StaminaBuff)
    ], Pastes.prototype, "statusEffectStamBuff", void 0);
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
        Mod_1.default.instance("Buff Pastes")
    ], Pastes, "INST", void 0);
    exports.default = Pastes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFnQkEsSUFBSSxHQUFRLENBQUE7SUFFWixNQUFxQixNQUFPLFNBQVEsYUFBRztRQUF2Qzs7WUFFVyxtQkFBYyxHQUFtQixFQUFFLENBQUE7WUFDbkMscUJBQWdCLEdBQXFCLEVBQUUsQ0FBQTtRQWdIbEQsQ0FBQztRQTlHVSxZQUFZO1lBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUdNLGFBQWEsQ0FBQyxNQUFjO1lBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFHN0IsQ0FBQztLQW9HSjtJQXhHRztRQURDLDJCQUFZLENBQUMscUJBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDOytDQUtyQztJQU1EO1FBREMscUJBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLHNCQUFXLENBQUM7d0RBQ1I7SUF1QnZDO1FBbkJDLHFCQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLElBQUksZUFBTSxDQUFDLHdCQUFjLENBQUMsSUFBSSxDQUFDO2FBQy9ELFdBQVcsQ0FBQyxvQkFBVSxDQUFDLE1BQU0sQ0FBQzthQUM5QixhQUFhLENBQUMseUJBQWUsQ0FBQyxLQUFLLEVBQUUseUJBQWUsQ0FBQyxNQUFNLEVBQUUseUJBQWUsQ0FBQyxPQUFPLEVBQUUseUJBQWUsQ0FBQyxNQUFNLENBQUM7YUFDN0csVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7WUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO2dCQUM1QyxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQVE7Z0JBQy9CLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUM3QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTTthQUNoQyxDQUFBO1lBR0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxrQ0FBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV6RixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQyxDQUNMOzBEQUNpRDtJQStDbEQ7UUF0QkMscUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBR3hCLEdBQUcsRUFBRSxDQUFDLHNCQUFRLEVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RCxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRTtnQkFDSixVQUFVLEVBQUU7b0JBQ1IsdUJBQWUsQ0FBQyxnQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBSy9DO2dCQUdELEtBQUssRUFBRSxrQkFBUyxDQUFDLE9BQU87Z0JBRXhCLEtBQUssRUFBRSxtQkFBVyxDQUFDLE1BQU07Z0JBQ3pCLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFLENBQUMscUJBQWEsQ0FBQyxVQUFVLENBQUM7U0FDckMsQ0FBQztpREFDNEI7SUF6RTlCO1FBREMsYUFBRyxDQUFDLFFBQVEsQ0FBUyxhQUFhLENBQUM7OEJBQ0Q7SUFsQnZDLHlCQW1IQyJ9