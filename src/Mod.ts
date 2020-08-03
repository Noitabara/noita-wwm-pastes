import Mod from "mod/Mod";
import Log from "utilities/Log";
import StatusEffect, { IStatusEffectIconDescription } from "entity/status/StatusEffect";
import { Stat } from "entity/IStats";
import { ItemType, RecipeLevel, ItemTypeGroup } from "item/IItem"
import { RecipeComponent } from "item/Items"
import { StatChangeReason, StatusType, EntityType, StatusEffectChangeReason } from "entity/IEntity";
import { StatNotificationType } from "renderer/INotifier";
import Register, { Registry } from "mod/ModRegistry";
import { Action } from "entity/action/Action";
import { ActionArgument, ActionType, ActionUsability } from "entity/action/IAction";
import { SkillType } from "entity/IHuman";
import Translation from "language/Translation";
import { DoodadTypeGroup } from "doodad/IDoodad";
import { HookMethod } from "mod/IHookHost";

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

interface IUserBuffBool {
    hunger: boolean,
    thirst: boolean
}

interface IUserBuffBoolBase {
    [key: string]: IUserBuffBool
}

class StaminaBuff extends StatusEffect {
    @Override
    getIcon(): IStatusEffectIconDescription {
        // Check in steam deploy for where this is actually resolving. Should know pretty fast that it's failing lol.
        return {
            path: '../../mods/buff_pastes/static/image/item/stampaste_8.png',
            frames: 5
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
        this.entity.asPlayer?.notifyStat(StatNotificationType.Stamina, effectMultiplier)

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
    @Override
    getDescription(): Translation {
        let locPlayersData = Pastes.INST.buffData[this.entity.asPlayer!.identifier]
        let effectMultiplier = Math.floor((locPlayersData.PasteBuffMinDura / locPlayersData.PasteBuffMaxDura * locPlayersData.PasteBuffQuality) + 1)
        return super.getDescription()
            .addArgs(effectMultiplier)
    }
}

export default class Pastes extends Mod {
    public buffData: IUsersBuffData = {}
    public userBuffBool: IUserBuffBoolBase = {}

    public onInitialize() {
        log = this.getLog()
        log.info('Hello, sweet world.')
    }

    @Override @HookMethod
    public onGameTickStart() {
        log.info("OUR TICK BE STARTING")
        // game.getPlayerByIdentifier('', false)
    }

    @Mod.instance<Pastes>("Buff Pastes")
    public static readonly INST: Pastes

    @Register.statusEffect("StamBuff", StaminaBuff)
    public statusEffectStamBuff: StatusType
    
    @Register.action("TestAction", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setUsableWhen(ActionUsability.Paused, ActionUsability.Delayed, ActionUsability.Moving)
        .setHandler((action, item) => {

        })
    )
    public readonly actionTestAction: ActionType

    @Register.action("ConsumeStamPaste", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setUsableWhen(ActionUsability.Paused, ActionUsability.Delayed, ActionUsability.Moving)
        .setHandler((action, item) => {
            let player = action.executor
            // Initalize/reset the buff data based on the item used here.
            Pastes.INST.buffData[player.identifier] = {
                PasteBuffTick: 0,
                PasteBuffQuality: item.quality!,
                PasteBuffMinDura: item.minDur,
                PasteBuffMaxDura: item.maxDur
            }
            
            // We set the status here.
            player.setStatus(Pastes.INST.statusEffectStamBuff, true, StatusEffectChangeReason.Gained)
            // Remove the item from inventory after using it.
            itemManager.remove(item)
        })
    )
    public readonly actionConsumeStamPaste: ActionType

    // Consider making it a pastrie(?) instead of a paste. Create the paste first, then bake it into a pastrie.
    // Doing this means we could use eggs, and makes a bit more sense than carrying around a sticky paste in your pockets.
    @Register.item("StamPaste", {
        use: [Registry<Pastes>().get("actionConsumeStamPaste")],
        weight: 0.5,
        recipe: {
            components: [
                RecipeComponent(ItemTypeGroup.ContainerOfMedicinalWater, 1, 1, 0, true),
                RecipeComponent(ItemTypeGroup.Vegetable, 1, 1, 0, true),
                RecipeComponent(ItemTypeGroup.Fruit, 1, 1, 0, true)
            ],
            requiredDoodad: DoodadTypeGroup.LitKiln,
            // Implement new skill for 1.0.0-beta?
            skill: SkillType.Cooking,
            // Change to advanced later.
            level: RecipeLevel.Advanced,
            reputation: 0
        },
        groups: [ItemTypeGroup.CookedFood]
    })
    public itemStamPaste: ItemType

    @Register.item("Test", {
        use: [Registry<Pastes>().get("actionTestAction")],
        weight: 0.5,
        recipe: {
            components: [
                RecipeComponent(ItemType.Log, 1, 1, 0, true),
            ],
            skill: SkillType.Cooking,
            // Change to advanced later.
            level: RecipeLevel.Simple,
            reputation: 0
        },
    })
    public itemTest: ItemType
}
