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
            return 10;
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
            const locPlayersData = Pastes.INST.buffData[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.increase(IStats_1.Stat.Stamina, effectTickAmount, IEntity_1.StatChangeReason.Normal);
            (_b = this.entity.asPlayer) === null || _b === void 0 ? void 0 : _b.notifyStat(INotifier_1.StatNotificationType.Stamina, effectTickAmount);
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            const locPlayersData = Pastes.INST.buffData[this.entity.asPlayer.identifier];
            const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 100);
            log.info('buffCalc Resolves: ', buffCalc);
            const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 5;
            log.info('buffDuration Resolves: ', buffDuration);
            if (locPlayersData.PasteBuffTick >= buffDuration) {
                locPlayersData.PasteBuffTick = 0;
                return true;
            }
            return false;
        }
        getDescription() {
            const locPlayersData = Pastes.INST.buffData[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            return super.getDescription()
                .addArgs(effectTickAmount);
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
                    Items_1.RecipeComponent(IItem_1.ItemType.Dough, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Vegetable, 1, 1, 0, true),
                    Items_1.RecipeComponent(IItem_1.ItemTypeGroup.Fruit, 1, 1, 0, true)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFjQSxJQUFJLEdBQVEsQ0FBQTtJQWFaLE1BQU0sV0FBWSxTQUFRLHNCQUFZO1FBRWxDLGFBQWE7WUFDVCxPQUFPLEVBQUUsQ0FBQTtRQUNiLENBQUM7UUFFRCxVQUFVO1lBQ04sT0FBTyxrQ0FBbUIsQ0FBQyxJQUFJLENBQUE7UUFDbkMsQ0FBQztRQUVELE9BQU87WUFFSCxPQUFPO2dCQUNILElBQUksRUFBRSwrREFBK0Q7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDO2FBQ1osQ0FBQTtRQUNMLENBQUM7UUFFRCxNQUFNOztZQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUV6QixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUc3RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBRTlJLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSwwQkFBZ0IsQ0FBQyxNQUFNLEVBQUM7WUFFNUYsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsVUFBVSxDQUFDLGdDQUFvQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQztZQUdoRixjQUFjLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDbEMsQ0FBQztRQUVELFVBQVU7WUFFTixNQUFNLGNBQWMs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