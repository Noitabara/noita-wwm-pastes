var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./Mod", "entity/status/StatusEffect", "entity/IStats", "entity/IEntity", "renderer/INotifier"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IEntity_1, INotifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WeightBuff = exports.StaminaBuff = void 0;
    class StaminaBuff extends StatusEffect_1.default {
        constructor() {
            super(...arguments);
            this.tickrate = 5;
        }
        getEffectRate() {
            return this.tickrate;
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
            var _a, _b, _c;
            const locPlayersData = Mod_1.default.INST.buff_stam_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.increase(IStats_1.Stat.Stamina, effectTickAmount, IEntity_1.StatChangeReason.Normal);
            (_b = this.entity.asPlayer) === null || _b === void 0 ? void 0 : _b.notifyStat(INotifier_1.StatNotificationType.Stamina, effectTickAmount);
            (_c = this.entity.asPlayer) === null || _c === void 0 ? void 0 : _c.stat.setBonus(IStats_1.Stat.Weight, 100, IEntity_1.StatChangeReason.BonusChanged);
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            var _a;
            const locPlayersData = Mod_1.default.INST.buff_stam_data[this.entity.asPlayer.identifier];
            const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2;
            const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 5;
            if (locPlayersData.PasteBuffTick >= buffDuration) {
                (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, 0, IEntity_1.StatChangeReason.BonusChanged);
                locPlayersData.PasteBuffTick = 0;
                return true;
            }
            return false;
        }
        getDescription() {
            const locPlayersData = Mod_1.default.INST.buff_stam_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            const buffDuration = ((Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2) > 1 ? Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2 : 1) * 5;
            return super.getDescription()
                .addArgs(effectTickAmount)
                .addArgs(this.tickrate)
                .addArgs(buffDuration);
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
    exports.StaminaBuff = StaminaBuff;
    class WeightBuff extends StatusEffect_1.default {
        constructor() {
            super(...arguments);
            this.tick_rate = 5;
        }
        getEffectRate() {
            return this.tick_rate;
        }
        getBadness() {
            return StatusEffect_1.StatusEffectBadness.Good;
        }
        getIcon() {
            return {
                path: '../../mods/noita-wwm-pastes/static/image/item/weightpaste_8',
                frames: 4
            };
        }
        onTick() {
            var _a;
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) * 4);
            console.log(locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality);
            console.log(effectTickAmount);
            (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, effectTickAmount, IEntity_1.StatChangeReason.BonusChanged);
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            var _a;
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2;
            const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 5;
            if (locPlayersData.PasteBuffTick >= buffDuration) {
                (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, 0, IEntity_1.StatChangeReason.BonusChanged);
                locPlayersData.PasteBuffTick = 0;
                return true;
            }
            return false;
        }
        getDescription() {
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1);
            const buffDuration = ((Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2) > 1 ? Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2 : 1) * 5;
            return super.getDescription()
                .addArgs(effectTickAmount)
                .addArgs(this.tick_rate)
                .addArgs(buffDuration);
        }
    }
    __decorate([
        Override
    ], WeightBuff.prototype, "getEffectRate", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "getBadness", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "getIcon", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "onTick", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "shouldPass", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "getDescription", null);
    exports.WeightBuff = WeightBuff;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdHVzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVNBLE1BQWEsV0FBWSxTQUFRLHNCQUFZO1FBQTdDOztZQUdXLGFBQVEsR0FBVyxDQUFDLENBQUE7UUFnRS9CLENBQUM7UUE5REcsYUFBYTtZQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtRQUN4QixDQUFDO1FBRUQsVUFBVTtZQUNOLE9BQU8sa0NBQW1CLENBQUMsSUFBSSxDQUFBO1FBQ25DLENBQUM7UUFFRCxPQUFPO1lBRUgsT0FBTztnQkFDSCxJQUFJLEVBQUUsK0RBQStEO2dCQUNyRSxNQUFNLEVBQUUsQ0FBQzthQUNaLENBQUE7UUFDTCxDQUFDO1FBRUQsTUFBTTs7WUFFRixNQUFNLGNBQWMsR0FBRyxhQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUduRixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBRTlJLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSwwQkFBZ0IsQ0FBQyxNQUFNLEVBQUM7WUFFNUYsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsVUFBVSxDQUFDLGdDQUFvQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQztZQUVoRixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLDBCQUFnQixDQUFDLFlBQVksRUFBQztZQUdwRixjQUFjLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDbEMsQ0FBQztRQUVELFVBQVU7O1lBRU4sTUFBTSxjQUFjLEdBQW1CLGFBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRW5HLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUdyRSxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBR3RELElBQUksY0FBYyxDQUFDLGFBQWEsSUFBSSxZQUFZLEVBQUU7Z0JBRzlDLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsMEJBQWdCLENBQUMsWUFBWSxFQUFDO2dCQUNsRixjQUFjLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQTtnQkFDaEMsT0FBTyxJQUFJLENBQUE7YUFDZDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFFRCxjQUFjO1lBQ1YsTUFBTSxjQUFjLEdBQW1CLGFBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ25HLE1BQU0sZ0JBQWdCLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDdEosTUFBTSxZQUFZLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDeEosT0FBTyxLQUFLLENBQUMsY0FBYyxFQUFFO2lCQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUN0QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDOUIsQ0FBQztLQUNKO0lBOURHO1FBREMsUUFBUTtvREFHUjtJQUVEO1FBREMsUUFBUTtpREFHUjtJQUVEO1FBREMsUUFBUTs4Q0FPUjtJQUVEO1FBREMsUUFBUTs2Q0FnQlI7SUFFRDtRQURDLFFBQVE7aURBbUJSO0lBRUQ7UUFEQyxRQUFRO3FEQVNSO0lBbEVMLGtDQW1FQztJQUVELE1BQWEsVUFBVyxTQUFRLHNCQUFZO1FBQTVDOztZQUNXLGNBQVMsR0FBVyxDQUFDLENBQUE7UUFpRGhDLENBQUM7UUE5Q0csYUFBYTtZQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUN6QixDQUFDO1FBRUQsVUFBVTtZQUNOLE9BQU8sa0NBQW1CLENBQUMsSUFBSSxDQUFBO1FBQ25DLENBQUM7UUFFRCxPQUFPO1lBQ0gsT0FBTztnQkFDSCxJQUFJLEVBQUUsNkRBQTZEO2dCQUNuRSxNQUFNLEVBQUUsQ0FBQzthQUNaLENBQUE7UUFDTCxDQUFDO1FBRUQsTUFBTTs7WUFDRixNQUFNLGNBQWMsR0FBcUIsYUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUV2RyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzlJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUNoSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDN0IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLDBCQUFnQixDQUFDLFlBQVksRUFBQztZQUNqRyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDbEMsQ0FBQztRQUVELFVBQVU7O1lBQ04sTUFBTSxjQUFjLEdBQXFCLGFBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdkcsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzdFLE1BQU0sWUFBWSxHQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDOUQsSUFBSSxjQUFjLENBQUMsYUFBYSxJQUFJLFlBQVksRUFBRTtnQkFDOUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSwwQkFBZ0IsQ0FBQyxZQUFZLEVBQUM7Z0JBQ2xGLGNBQWMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQyxPQUFPLElBQUksQ0FBQTthQUNkO1lBQ0QsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQztRQUVELGNBQWM7WUFDVixNQUFNLGNBQWMsR0FBcUIsYUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN2RyxNQUFNLGdCQUFnQixHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3RKLE1BQU0sWUFBWSxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3hKLE9BQU8sS0FBSyxDQUFDLGNBQWMsRUFBRTtpQkFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2lCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDdkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzlCLENBQUM7S0FDSjtJQTlDRztRQURDLFFBQVE7bURBR1I7SUFFRDtRQURDLFFBQVE7Z0RBR1I7SUFFRDtRQURDLFFBQVE7NkNBTVI7SUFFRDtRQURDLFFBQVE7NENBU1I7SUFFRDtRQURDLFFBQVE7Z0RBV1I7SUFFRDtRQURDLFFBQVE7b0RBU1I7SUFqREwsZ0NBa0RDIn0=