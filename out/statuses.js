var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./Mod", "entity/status/StatusEffect", "entity/IStats", "entity/IEntity"], function (require, exports, Mod_1, StatusEffect_1, IStats_1, IEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WeightBuff = exports.StaminaBuff = void 0;
    class StaminaBuff extends StatusEffect_1.default {
        constructor() {
            super(...arguments);
            this.tickrate = 15;
        }
        getEffectRate() {
            return this.tickrate;
        }
        getBadness() {
            return StatusEffect_1.StatusEffectBadness.Good;
        }
        getIcon() {
            return {
                path: 'static/image/item/stampaste_8.png',
                frames: 5
            };
        }
        onTick() {
            const locPlayersData = Mod_1.default.INST.buff_stam_data[this.entity.asPlayer.identifier];
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
                path: 'static/image/item/weightpaste_8.png',
                frames: 5
            };
        }
        onTick() {
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            var _a;
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2;
            const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 15;
            if (locPlayersData.PasteBuffTick >= buffDuration) {
                (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, 0, IEntity_1.StatChangeReason.BonusChanged);
                locPlayersData.PasteBuffTick = 0;
                return true;
            }
            return false;
        }
        getDescription() {
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality + 1) * 10);
            const buffDuration = ((Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2) > 1 ? Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2 : 1) * 15;
            return super.getDescription()
                .addArgs(effectTickAmount)
                .addArgs(this.tick_rate * buffDuration);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdHVzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVNBLE1BQWEsV0FBWSxTQUFRLHNCQUFZO1FBQTdDOztZQUdXLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFnRWhDLENBQUM7UUE5REcsYUFBYTtZQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtRQUN4QixDQUFDO1FBRUQsVUFBVTtZQUNOLE9BQU8sa0NBQW1CLENBQUMsSUFBSSxDQUFBO1FBQ25DLENBQUM7UUFFRCxPQUFPO1lBRUgsT0FBTztnQkFDSCxJQUFJLEVBQUUsbUNBQW1DO2dCQUN6QyxNQUFNLEVBQUUsQ0FBQzthQUNaLENBQUE7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUVGLE1BQU0sY0FBYyxHQUFHLGFBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBWW5GLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNsQyxDQUFDO1FBRUQsVUFBVTs7WUFFTixNQUFNLGNBQWMsR0FBbUIsYUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFFbkcsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBR3JFLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFHdEQsSUFBSSxjQUFjLENBQUMsYUFBYSxJQUFJLFlBQVksRUFBRTtnQkFHOUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENB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