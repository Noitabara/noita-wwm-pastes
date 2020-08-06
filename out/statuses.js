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
    let log;
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
        ontick() {
            var _a, _b;
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) * 4);
            (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, effectTickAmount, IEntity_1.StatChangeReason.BonusChanged);
            (_b = this.entity.asPlayer) === null || _b === void 0 ? void 0 : _b.notifyStat(INotifier_1.StatNotificationType.Zero, effectTickAmount);
            locPlayersData.PasteBuffTick++;
        }
        shouldPass() {
            var _a, _b;
            const locPlayersData = Mod_1.default.INST.buff_weight_data[this.entity.asPlayer.identifier];
            const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2;
            const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 5;
            log.info(locPlayersData.PasteBuffTick, buffDuration);
            if (locPlayersData.PasteBuffTick >= buffDuration) {
                (_a = this.entity.asPlayer) === null || _a === void 0 ? void 0 : _a.stat.setBonus(IStats_1.Stat.Weight, 0, IEntity_1.StatChangeReason.BonusChanged);
                (_b = this.entity.asPlayer) === null || _b === void 0 ? void 0 : _b.notifyStat(INotifier_1.StatNotificationType.Zero, 0);
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
    ], WeightBuff.prototype, "ontick", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "shouldPass", null);
    __decorate([
        Override
    ], WeightBuff.prototype, "getDescription", null);
    exports.WeightBuff = WeightBuff;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdHVzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVNBLElBQUksR0FBUSxDQUFBO0lBR1osTUFBYSxXQUFZLFNBQVEsc0JBQVk7UUFBN0M7O1lBR1csYUFBUSxHQUFXLENBQUMsQ0FBQTtRQWdFL0IsQ0FBQztRQTlERyxhQUFhO1lBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3hCLENBQUM7UUFFRCxVQUFVO1lBQ04sT0FBTyxrQ0FBbUIsQ0FBQyxJQUFJLENBQUE7UUFDbkMsQ0FBQztRQUVELE9BQU87WUFFSCxPQUFPO2dCQUNILElBQUksRUFBRSwrREFBK0Q7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDO2FBQ1osQ0FBQTtRQUNMLENBQUM7UUFFRCxNQUFNOztZQUVGLE1BQU0sY0FBYyxHQUFHLGFBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBR25GLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFOUksTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLDBCQUFnQixDQUFDLE1BQU0sRUFBQztZQUU1RixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxVQUFVLENBQUMsZ0NBQW9CLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDO1lBRWhGLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsMEJBQWdCLENBQUMsWUFBWSxFQUFDO1lBR3BGLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNsQyxDQUFDO1FBRUQsVUFBVTs7WUFFTixNQUFNLGNBQWMsR0FBbUIsYUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFFbkcsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBR3JFLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFHdEQsSUFBSSxjQUFjLENBQUMsYUFBYSxJQUFJLFlBQVksRUFBRTtnQkFHOUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSwwQkFBZ0IsQ0FBQyxZQUFZLEVBQUM7Z0JBQ2xGLGNBQWMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQyxPQUFPLElBQUksQ0FBQTthQUNkO1lBQ0QsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQztRQUVELGNBQWM7WUFDVixNQUFNLGNBQWMsR0FBbUIsYUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDbkcsTUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN0SixNQUFNLFlBQVksR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4SixPQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUU7aUJBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QixDQUFDO0tBQ0o7SUE5REc7UUFEQyxRQUFRO29EQUdSO0lBRUQ7UUFEQyxRQUFRO2lEQUdSO0lBRUQ7UUFEQyxRQUFROzhDQU9SO0lBRUQ7UUFEQyxRQUFROzZDQWdCUjtJQUVEO1FBREMsUUFBUTtpREFtQlI7SUFFRDtRQURDLFFBQVE7cURBU1I7SUFsRUwsa0NBbUVDO0lBRUQsTUFBYSxVQUFXLFNBQVEsc0JBQVk7UUFBNUM7O1lBQ1csY0FBUyxHQUFXLENBQUMsQ0FBQTtRQWtEaEMsQ0FBQztRQS9DRyxhQUFhO1lBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ3pCLENBQUM7UUFFRCxVQUFVO1lBQ04sT0FBTyxrQ0FBbUIsQ0FBQyxJQUFJLENBQUE7UUFDbkMsQ0FBQztRQUVELE9BQU87WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSw2REFBNkQ7Z0JBQ25FLE1BQU0sRUFBRSxDQUFDO2FBQ1osQ0FBQTtRQUNMLENBQUM7UUFFRCxNQUFNOztZQUNGLE1BQU0sY0FBYyxHQUFxQixhQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRXZHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDOUksTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLDBCQUFnQixDQUFDLFlBQVksRUFBQztZQUNqRyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxVQUFVLENBQUMsZ0NBQW9CLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO1lBQzdFLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNsQyxDQUFDO1FBRUQsVUFBVTs7WUFDTixNQUFNLGNBQWMsR0FBcUIsYUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN2RyxNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDN0UsTUFBTSxZQUFZLEdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDcEQsSUFBSSxjQUFjLENBQUMsYUFBYSxJQUFJLFlBQVksRUFBRTtnQkFDOUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSwwQkFBZ0IsQ0FBQyxZQUFZLEVBQUM7Z0JBQ2xGLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLFVBQVUsQ0FBQyxnQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDO2dCQUM5RCxjQUFjLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQTtnQkFDaEMsT0FBTyxJQUFJLENBQUE7YUFDZDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFFRCxjQUFjO1lBQ1YsTUFBTSxjQUFjLEdBQXFCLGFBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdkcsTUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN0SixNQUFNLFlBQVksR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4SixPQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUU7aUJBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QixDQUFDO0tBQ0o7SUEvQ0c7UUFEQyxRQUFRO21EQUdSO0lBRUQ7UUFEQyxRQUFRO2dEQUdSO0lBRUQ7UUFEQyxRQUFROzZDQU1SO0lBRUQ7UUFEQyxRQUFROzRDQVFSO0lBRUQ7UUFEQyxRQUFRO2dEQWFSO0lBRUQ7UUFEQyxRQUFRO29EQVNSO0lBbERMLGdDQW1EQyJ9