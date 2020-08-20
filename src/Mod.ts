import Mod from "mod/Mod";
import Log from "utilities/Log";
import { IUStamBuffData, IUWeightBuffData, IWeightPasteData } from "./storageEnums"
import { StaminaBuff, WeightBuff } from "./statuses"
import { ItemType, RecipeLevel, ItemTypeGroup } from "item/IItem"
import { RecipeComponent } from "item/Items"
import { StatusType, EntityType, StatusEffectChangeReason } from "entity/IEntity";
import Register, { Registry } from "mod/ModRegistry";
import { Action } from "entity/action/Action";
import { ActionArgument, ActionType, ActionUsability } from "entity/action/IAction";
import { SkillType } from "entity/IHuman";
// import { Stat } from "entity/IStats";
import { EventHandler } from "event/EventManager";
import { EventBus } from "event/EventBuses";
import Player from "entity/player/Player";

let log: Log

export default class Pastes extends Mod {
    // Using snake case for the containers.
    public buff_stam_data: IUStamBuffData = {}
    public buff_weight_data: IUWeightBuffData = {}

    public onInitialize() {
        log = this.getLog()
        log.info('Hello, sweet world. ')
    }
    
    @EventHandler(EventBus.Players, "die")
    protected onPlayerDeath(player: Player): void {
        log.info('Lol you died.')
        // This may well need tobe placed inside an action.
        // player.stat.setBonus(Stat.Weight, 0, StatChangeReason.BonusChanged)
    }

    @EventHandler(EventBus.Players, "getMaxWeight")
    protected returnPlayerWeight(player: Player, weight: number) {
        if (this.buff_weight_data[player.identifier].PasteBuffEffects > 0) {
            return weight + this.buff_weight_data[player.identifier].PasteBuffEffects
        }
        return weight
    }

    @Mod.instance<Pastes>("Buff Pastes")
    public static readonly INST: Pastes

    @Register.statusEffect("StamBuff", StaminaBuff)
    public statusEffectStamBuff: StatusType
    @Register.statusEffect("WeightBuff", WeightBuff)
    public statusEffectWeightBuff: StatusType

    @Register.action("ConsumeStamPaste", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setUsableWhen(ActionUsability.Ghost, ActionUsability.Paused, ActionUsability.Delayed, ActionUsability.Moving)
        .setHandler((action, item) => {
            let player = action.executor
            // Initalize/reset the buff data based on the item used here.
            Pastes.INST.buff_stam_data[player.identifier] = {
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

    @Register.action("ConsumeWeightPaste", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setUsableWhen(ActionUsability.Ghost, ActionUsability.Paused, ActionUsability.Delayed, ActionUsability.Moving)
        .setHandler((action, item) => {
            let player = action.executor
            const playerBuffRef: IWeightPasteData = Pastes.INST.buff_weight_data[player.identifier]
            const increaseWeightBy: number = Math.floor((playerBuffRef.PasteBuffMinDura / playerBuffRef.PasteBuffMaxDura * playerBuffRef.PasteBuffQuality + 1) * 10)
            Pastes.INST.buff_weight_data[player.identifier] = {
                PasteBuffTick: 1,
                PasteBuffQuality: item.quality!,
                PasteBuffMinDura: item.minDur,
                PasteBuffMaxDura: item.maxDur,
                PasteBuffEffects: increaseWeightBy
            }
            player.setStatus(Pastes.INST.statusEffectWeightBuff, true, StatusEffectChangeReason.Gained)
            player.updateStrength()
            player.updateTablesAndWeight("M")
            
            itemManager.remove(item)
        })
    )
    public readonly actionConsumeWeightPaste: ActionType

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
                RecipeComponent(ItemTypeGroup.Fruit, 4, 4, 0, true)

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

    @Register.item("WeightPaste", {
        use: [Registry<Pastes>().get("actionConsumeWeightPaste")],
        weight: 0.5,
        recipe: {
            components: [
                RecipeComponent(ItemType.Log, 1, 1, 0, true)
                // RecipeComponent(ItemType.Dough, 1, 1, 0, true),
                // RecipeComponent(ItemTypeGroup.Storage, 1, 1, 0, true),
                // RecipeComponent(ItemTypeGroup.Vegetable, 2, 2, 0, true),
                // RecipeComponent(ItemTypeGroup.Fruit, 2, 2, 0, true)
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
    public itemWeightPaste: ItemType
    // Testing stuff below here.
}
