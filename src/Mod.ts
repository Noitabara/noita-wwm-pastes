import Mod from "mod/Mod";
import Log from "utilities/Log";
import StatusEffect, { IStatusEffectIconDescription } from "entity/status/StatusEffect";
import { Stat } from "entity/IStats";
import { StatChangeReason, StatusType } from "entity/IEntity";
import { StatNotificationType } from "renderer/INotifier";

let log: Log

interface IStamPasteData {
    PasteBuffTick: number,
    PasteBuffQuality: number,
    PasteBuffMaxDura: number,
    PasteBuffMinDura: number
}

interface IUsersBuffData {
    [key: string]: IStamPasteData
}

class StaminaBuff extends StatusEffect {
    @Override
    getIcon(): IStatusEffectIconDescription {
        // Check in steam deploy for where this is actually resolving. Should know pretty fast that it's failing lol.
        return {
            path: '../../mods/buff_pastes/static/image/item/stambuff_8.png'
        }
    }
    @Override
    onTick(): void {
        // Refrences the buffData variable in the Pastes mod class.
        let locPlayersData = Pastes.INST.buffData[this.entity.asPlayer!.identifier]

        // "Calculate"(lol) the effect multiplier based on the passed in variables from the item used.
        let effectMultiplier = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1)
        // Increase the stat Stamina by the effect multipler
        this.entity.asPlayer?.stat.increase(Stat.Stamina, effectMultiplier, StatChangeReason.Normal)
        // call the notifyStat function to indicate that the stat has increased by the effect multiplier
        this.entity.asPlayer?.notifyStat(StatNotificationType.Metabolism, effectMultiplier)

        // Iterate the buff tick by 1 because infinite buffs would be a bit OP.
        locPlayersData.PasteBuffTick++
    }
    @Override
    shouldPass(): boolean {
        // If the buff has ticked 5 times, set the buffData ticker to 0 and pass the effect by returning !false(lol)
        if (Pastes.INST.buffData[this.entity.asPlayer!.identifier].PasteBuffTick >= 5) {
            Pastes.INST.buffData[this.entity.asPlayer!.identifier].PasteBuffTick = 0
            return true
        }
        return false
    }
}

export default class Pastes extends Mod {
    public buffData: IUsersBuffData = {}

    public onInitialize() {
        log = this.getLog()
        log.info('Hello, sweet world.')
    }

    @Mod.instance<Pastes>("Buff Pastes")
    public static readonly INST: Pastes

    
}
