import Mod from "mod/Mod";
import Log from "utilities/Log";
import StatusEffect, { IStatusEffectIconDescription, StatusEffectBadness } from "entity/status/StatusEffect";
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
    // Either make tickRate dynamic based on buff data or move to main Class.
    // Will interfere with other mod classes among other player.
    public tickRate: number = 5
    // Refrences the buffData variable in the Pastes mod class.
    public locPlayersData = Pastes.INST.buffData[this.entity.asPlayer!.identifier]

    // "Calculate"(lol) the effect multiplier based on the passed in variables from the item used.
    public effectTickAmount = Math.floor((this.locPlayersData.PasteBuffMinDura / this.locPlayersData.PasteBuffMaxDura * this.locPlayersData.PasteBuffQuality) + 1)

    // base-1 from max durability
    public buffCalc = Math.floor(this.locPlayersData.PasteBuffMaxDura / 10) * 2
    // total calc from buffCalc, if less than 1, return 1, else base-1 from max durability multiplied by 5 as a treat for those who
    // use good quality ingredients :)
    public buffDuration = (this.buffCalc > 1 ? this.buffCalc : 1) * 5
    @Override
    getEffectRate(): number {
        return this.tickRate
    }
    @Override
    getBadness(): StatusEffectBadness {
        return StatusEffectBadness.Good
    }
    @Override
    getIcon(): IStatusEffectIconDescription {
        // Check in steam deploy for where this is actually resolving. Should know pretty fast that it's failing lol.
        return {
            path: '../../mods/noita-wwm-pastes/static/image/item/stampaste_8.png',
            frames: 5
        }
    }
    @Override
    onTick(): void {
        
        // Increase the stat Stamina by the effect multipler
        this.entity.asPlayer?.stat.increase(Stat.Stamina, this.effectTickAmount, StatChangeReason.Normal)
        // call the notifyStat function to indicate that the stat has increased by the effect multiplier
        this.entity.asPlayer?.notifyStat(StatNotificationType.Stamina, this.effectTickAmount)

        // Iterate the buff tick by 1 because infinite buffs would be a bit OP.
        this.locPlayersData.PasteBuffTick++
    }
    @Override
    shouldPass(): boolean {
        log.info('buffDuration Resolves: ', `${this.locPlayersData.PasteBuffTick}/${this.buffDuration}`)
        log.info('buffCalc Resolves: ', this.buffCalc)
        // If local buff tick(iterated in onTick) greater or equal to buffDuration, set the players buffTick to 0 and remove the buff
        // else keep on truckin.
        if (this.locPlayersData.PasteBuffTick >= this.buffDuration) {
            this.locPlayersData.PasteBuffTick = 0
            return true
        }
        return false
    }
    @Override
    getDescription(): Translation {
        return super.getDescription()
            .addArgs(this.effectTickAmount)
            .addArgs(this.tickRate)
            .addArgs(this.buffDuration)
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

    @Register.statusEffect("StamBuff", StaminaBuff)
    public statusEffectStamBuff: StatusType

    @Register.action("ConsumeStamPaste", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setUsableWhen(ActionUsability.Ghost, ActionUsability.Paused, ActionUsability.Delayed, ActionUsability.Moving)
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
            log.info(`Max durablity at ${item.quality}:`, itemManager.getDefaultDurability(player, item.weight, item.type, true), game.getQualityDurabilityBonus(item.quality!, itemManager.getDefaultDurability(player, item.weight, item.type, true), true))
            // Remove the item from inventory after using it.
            itemManager.remove(item)
        })
    )
    public readonly actionConsumeStamPaste: ActionType

    // Consider making it a pastrie(?) instead of a paste. Create the paste first, then bake it into a pastrie.
    // Doing this means we could use eggs, and makes a bit more sense than carrying around a sticky paste in your pockets.
    @Register.item("StamPaste", {
        // Drathy on projected quality bonus:
        // Drathy: "based on the quality of the item, its base durability (set in item description), how heavy it is (relative to others of the same type)"
        use: [Registry<Pastes>().get("actionConsumeStamPaste")],
        weight: 0.5,
        recipe: {
            components: [
                // RecipeComponent(ItemType.Log, 1, 1, 0, true)
                RecipeComponent(ItemType.Dough, 1, 1, 0, true),
                RecipeComponent(ItemTypeGroup.Vegetable, 1, 1, 0, true),
                RecipeComponent(ItemTypeGroup.Fruit, 1, 1, 0, true)
                
            ],
            // requiredDoodad: DoodadTypeGroup.LitKiln,
            // Implement new skill for 1.0.0-beta?
            skill: SkillType.Cooking,
            // Change to advanced later.
            level: RecipeLevel.Simple,
            reputation: 0
        },
        groups: [ItemTypeGroup.CookedFood]
    })
    public itemStamPaste: ItemType
    // Testing stuff below here.
}
