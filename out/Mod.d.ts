import Mod from "mod/Mod";
import { IUStamBuffData, IUWeightBuffData } from "./storageEnums";
import { ItemType } from "item/IItem";
import { StatusType } from "entity/IEntity";
import { ActionType } from "entity/action/IAction";
import Player from "entity/player/Player";
export default class Pastes extends Mod {
    buff_stam_data: IUStamBuffData;
    buff_weight_data: IUWeightBuffData;
    onInitialize(): void;
    protected onPlayerDeath(player: Player): void;
    protected returnPlayerWeight(player: Player, weight: number): number;
    onPlayerJoin(player: Player): void;
    static readonly INST: Pastes;
    statusEffectStamBuff: StatusType;
    statusEffectWeightBuff: StatusType;
    readonly actionConsumeStamPaste: ActionType;
    readonly actionConsumeWeightPaste: ActionType;
    itemStamPaste: ItemType;
    itemWeightPaste: ItemType;
}
