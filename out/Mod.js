var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/Mod", "entity/status/StatusEffect", "entity/IStats", "item/IItem", "item/Items", "entity/IEntity", "renderer/INotifier", "mod/ModRegistry", "entity/action/Action", "entity/action/IAction", "entity/IHuman"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IItem_1, Items_1, IEntity_1, INotifier_1, ModRegistry_1, Action_1, IAction_1, IHuman_1) {
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
        getBadness() {
            return StatusEffect_1.StatusEffectBadness.Good;
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
    ], StaminaBuff.prototype, "getBadness", null);
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
        }
        onInitialize() {
            log = this.getLog();
            log.info('Hello, sweet world.');
        }
    }
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
        Mod_1.default.instance("Buff Pastes")
    ], Pastes, "INST", void 0);
    exports.default = Pastes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFlQSxJQUFJLEdBQVEsQ0FBQTtJQWFaLE1BQU0sV0FBWSxTQUFRLHNCQUFZO1FBRWxDLFVBQVU7WUFDTixPQUFPO2dCQUNILFdBQVcsRUFBRSxJQUFJO2dCQUNqQixvQkFBb0IsRUFBRSxHQUFHO2dCQUN6QixTQUFTLEVBQUUsS0FBSztnQkFDaEIsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsb0JBQW9CLEVBQUUsQ0FBQzthQUMxQixDQUFBO1FBQ0wsQ0FBQztRQUVELFVBQVU7WUFDTixPQUFPLGtDQUFtQixDQUFDLElBQUksQ0FBQTtRQUNuQyxDQUFDO1FBRUQsT0FBTztZQUVILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLCtEQUErRDtnQkFDckUsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFBO1FBQ0wsQ0FBQztRQUVELE1BQU07O1lBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRXpCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRzNFLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFNUksTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLDBCQUFnQixDQUFDLE1BQU0sRUFBQztZQUU1RixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxVQUFVLENBQUMsZ0NBQW9CLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDO1lBR2hGLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNsQyxDQUFDO1FBRUQsVUFBVTtZQUVOLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtnQkFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQTtnQkFDeEUsT0FBTyxJQUFJLENBQUE7YUFDZDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFFRCxjQUFjO1lBQ1YsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDM0UsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1SSxPQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUU7aUJBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7S0FDSjtJQXJERztRQURDLFFBQVE7aURBU1I7SUFFRDtRQURDLFFBQVE7aURBR1I7SUFFRDtRQURDLFFBQVE7OENBT1I7SUFFRDtRQURDLFFBQVE7NkNBZVI7SUFFRDtRQURDLFFBQVE7aURBUVI7SUFFRDtRQURDLFFBQVE7cURBTVI7SUFHTCxNQUFxQixNQUFPLFNBQVEsYUFBRztRQUF2Qzs7WUFDVyxhQUFRLEdBQW1CLEVBQUUsQ0FBQTtRQTJEeEMsQ0FBQztRQXpEVSxZQUFZO1lBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDbkMsQ0FBQztLQXNESjtJQWhERztRQURDLHFCQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7d0RBQ1I7SUFxQnZDO1FBbkJDLHFCQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLElBQUksZUFBTSxDQUFDLHdCQUFjLENBQUMsSUFBSSxDQUFDO2FBQy9ELFdBQVcsQ0FBQyxvQkFBVSxDQUFDLE1BQU0sQ0FBQzthQUM5QixhQUFhLENBQUMseUJBQWUsQ0FBQyxLQUFLLEVBQUUseUJBQWUsQ0FBQyxNQUFNLEVBQUUseUJBQWUsQ0FBQyxPQUFPLEVBQUUseUJBQWUsQ0FBQyxNQUFNLENBQUM7YUFDN0csVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7WUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO2dCQUN0QyxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQVE7Z0JBQy9CLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUM3QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTTthQUNoQyxDQUFBO1lBR0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxrQ0FBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV6RixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQyxDQUNMOzBEQUNpRDtJQXVCbEQ7UUFuQkMscUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hCLEdBQUcsRUFBRSxDQUFDLHNCQUFRLEVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RCxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRTtnQkFDSixVQUFVLEVBQUU7b0JBQ1IsdUJBQWUsQ0FBQyxnQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBSS9DO2dCQUdELEtBQUssRUFBRSxrQkFBUyxDQUFDLE9BQU87Z0JBRXhCLEtBQUssRUFBRSxtQkFBVyxDQUFDLE1BQU07Z0JBQ3pCLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFLENBQUMscUJBQWEsQ0FBQyxVQUFVLENBQUM7U0FDckMsQ0FBQztpREFDNEI7SUEvQzlCO1FBREMsYUFBRyxDQUFDLFFBQVEsQ0FBUyxhQUFhLENBQUM7OEJBQ0Q7SUFUdkMseUJBNERDIn0=