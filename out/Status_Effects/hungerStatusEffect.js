var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "entity/status/StatusEffect"], function (require, exports, StatusEffect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HungerBuff extends StatusEffect_1.default {
        getIcon() {
            return {
                path: '../../mods/buff_pastes/static/image/item/test_8.png',
                frames: 1
            };
        }
    }
    __decorate([
        Override
    ], HungerBuff.prototype, "getIcon", null);
    exports.default = HungerBuff;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVuZ2VyU3RhdHVzRWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1N0YXR1c19FZmZlY3RzL2h1bmdlclN0YXR1c0VmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFFQSxNQUFxQixVQUFXLFNBQVEsc0JBQVk7UUFFaEQsT0FBTztZQUNILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLHFEQUFxRDtnQkFDM0QsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFBO1FBQ0wsQ0FBQztLQUNKO0lBTkc7UUFEQyxRQUFROzZDQU1SO0lBUEwsNkJBUUMifQ==