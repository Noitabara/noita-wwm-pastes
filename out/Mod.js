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
        getEffectRate() {
            return 15;
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
    ], StaminaBuff.prototype, "getEffectRate", null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFjQSxJQUFJLEdBQVEsQ0FBQTtJQWFaLE1BQU0sV0FBWSxTQUFRLHNCQUFZO1FBRWxDLGFBQWE7WUFDVCxPQUFPLEVBQUUsQ0FBQTtRQUNiLENBQUM7UUFFRCxVQUFVO1lBQ04sT0FBTyxrQ0FBbUIsQ0FBQyxJQUFJLENBQUE7UUFDbkMsQ0FBQztRQUVELE9BQU87WUFFSCxPQUFPO2dCQUNILElBQUksRUFBRSwrREFBK0Q7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDO2FBQ1osQ0FBQTtRQUNMLENBQUM7UUFFRCxNQUFNOztZQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUV6QixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUczRSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBRTVJLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSwwQkFBZ0IsQ0FBQyxNQUFNLEVBQUM7WUFFNUYsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsVUFBVSxDQUFDLGdDQUFvQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQztZQUdoRixjQUFjLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDbEMsQ0FBQztRQUVELFVBQVU7WUFFTixJQUFJLE1BQU0s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