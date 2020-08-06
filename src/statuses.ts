import Pastes from "./Mod"
import { IWeightPasteData, IStamPasteData } from "./storageEnums"
import StatusEffect, { StatusEffectBadness, IStatusEffectIconDescription } from "entity/status/StatusEffect";
import { Stat } from "entity/IStats";
import { StatChangeReason } from "entity/IEntity";
import { StatNotificationType } from "renderer/INotifier";
import Translation from "language/Translation";

// TODO: Fix "dirty" var assignments with class properties later- (onTick, shouldPass, getDescription).
export class StaminaBuff extends StatusEffect {
    // Either make tickRate dynamic based on buff data or move to main Class.
    // Will interfere with other mod classes among other player.
    public tickrate: number = 15
    @Override
    getEffectRate(): number {
        return this.tickrate
    }
    @Override
    getBadness(): StatusEffectBadness {
        return StatusEffectBadness.Good
    }
    @Override
    getIcon(): IStatusEffectIconDescription {
        // TODO: Check in steam deploy for where this is actually resolving. Should know pretty fast that it's failing lol.
        return {
            path: '../../mods/noita-wwm-pastes/static/image/item/stampaste_8.png',
            frames: 5
        }
    }
    @Override
    onTick(): void {
        // Refrences the buff_stam_data variable in the Pastes mod class.
        const locPlayersData = Pastes.INST.buff_stam_data[this.entity.asPlayer!.identifier]

        // "Calculate"(lol) the effect multiplier based on the passed in variables from the item used.
        const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1)
        // Increase the stat Stamina by the effect multipler
        this.entity.asPlayer?.stat.increase(Stat.Stamina, effectTickAmount, StatChangeReason.Normal)
        // call the notifyStat function to indicate that the stat has increased by the effect multiplier
        this.entity.asPlayer?.notifyStat(StatNotificationType.Stamina, effectTickAmount)

        this.entity.asPlayer?.stat.setBonus(Stat.Weight, 100, StatChangeReason.BonusChanged)

        // Iterate the buff tick by 1 because infinite buffs would be a bit OP.
        locPlayersData.PasteBuffTick++
    }
    @Override
    shouldPass(): boolean {
        // Stored ref to player data in locPlayersData
        const locPlayersData: IStamPasteData = Pastes.INST.buff_stam_data[this.entity.asPlayer!.identifier]
        // base-1 from max durability
        const buffCalc = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2
        // total calc from buffCalc, if less than 1, return 1, else base-1 from max durability multiplied by 5 as a treat for those who
        // use good quality ingredients :)
        const buffDuration = (buffCalc > 1 ? buffCalc : 1) * 5
        // If local buff tick(iterated in onTick) greater or equal to buffDuration, set the players buffTick to 0 and remove the buff
        // else keep on truckin.
        if (locPlayersData.PasteBuffTick >= buffDuration) {
            // We'd likely have to pull in the bonus, then recalc vs current bonus(s) and return the proper amount to remove here.
            // Ofc this belongs, in a different buff but. y'know. Testing ;)
            this.entity.asPlayer?.stat.setBonus(Stat.Weight, 0, StatChangeReason.BonusChanged)
            locPlayersData.PasteBuffTick = 0
            return true
        }
        return false
    }
    @Override
    getDescription(): Translation {
        const locPlayersData: IStamPasteData = Pastes.INST.buff_stam_data[this.entity.asPlayer!.identifier]
        const effectTickAmount: number = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1)
        const buffDuration: number = ((Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2) > 1 ? Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2 : 1) * 5
        return super.getDescription()
            .addArgs(effectTickAmount)
            .addArgs(this.tickrate)
            .addArgs(buffDuration)
    }
}

export class WeightBuff extends StatusEffect {
    public tick_rate: number = 10

    @Override
    getEffectRate(): number {
        return this.tick_rate
    }
    @Override
    getBadness(): StatusEffectBadness {
        return StatusEffectBadness.Good
    }
    @Override
    getIcon(): IStatusEffectIconDescription {
        return {
            path: '../../mods/noita-wwm-pastes/static/image/item/weightpaste_8.png',
            frames: 5
        }
    }
    @Override
    onTick(): void {
        const locPlayersData: IWeightPasteData = Pastes.INST.buff_weight_data[this.entity.asPlayer!.identifier]
        // Add in new equation for adding weight bonus.
        const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality + 1) * 10)
        this.entity.asPlayer?.stat.setBonus(Stat.Weight, effectTickAmount, StatChangeReason.BonusChanged)
        locPlayersData.PasteBuffTick++
    }
    @Override
    shouldPass(): boolean {
        const locPlayersData: IWeightPasteData = Pastes.INST.buff_weight_data[this.entity.asPlayer!.identifier]
        const buffCalc: number = Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2
        const buffDuration: number = (buffCalc > 1 ? buffCalc : 1) * 10
        if (locPlayersData.PasteBuffTick >= buffDuration) {
            this.entity.asPlayer?.stat.setBonus(Stat.Weight, 0, StatChangeReason.BonusChanged)
            locPlayersData.PasteBuffTick = 0
            return true
        }
        return false
    }
    @Override
    getDescription(): Translation {
        const locPlayersData: IWeightPasteData = Pastes.INST.buff_weight_data[this.entity.asPlayer!.identifier]
        const effectTickAmount = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality + 1) * 10)
        const buffDuration: number = ((Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2) > 1 ? Math.floor(locPlayersData.PasteBuffMaxDura / 10) * 2 : 1) * 10
        return super.getDescription()
            .addArgs(effectTickAmount)
            .addArgs(this.tick_rate * buffDuration)
    }
}