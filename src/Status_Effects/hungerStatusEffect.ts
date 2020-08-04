import StatusEffect, { IStatusEffectIconDescription } from "entity/status/StatusEffect";

export default class HungerBuff extends StatusEffect {
    @Override
    getIcon(): IStatusEffectIconDescription {
        return {
            path: '../../mods/buff_pastes/static/image/item/test_8.png',
            frames: 1
        }
    }
}