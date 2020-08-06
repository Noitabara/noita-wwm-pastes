import StatusEffect, { StatusEffectBadness, IStatusEffectIconDescription } from "entity/status/StatusEffect";
import Translation from "language/Translation";
export declare class StaminaBuff extends StatusEffect {
    tickrate: number;
    getEffectRate(): number;
    getBadness(): StatusEffectBadness;
    getIcon(): IStatusEffectIconDescription;
    onTick(): void;
    shouldPass(): boolean;
    getDescription(): Translation;
}
export declare class WeightBuff extends StatusEffect {
    tick_rate: number;
    getEffectRate(): number;
    getBadness(): StatusEffectBadness;
    getIcon(): IStatusEffectIconDescription;
    ontick(): void;
    shouldPass(): boolean;
    getDescription(): Translation;
}
