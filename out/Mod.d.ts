import Mod from "mod/Mod";
import { IUStamBuffData, IUWeightBuffData } from "./storageEnums";
import { ItemType } from "item/IItem";
import { StatusType } from "entity/IEntity";
import { ActionType } from "entity/action/IAction";
export default class Pastes extends Mod {
    buff_stam_data: IUStamBuffData;
    buff_weight_data: IUWeightBuffData;
    onInitialize(): void;
    static readonly INST: Pastes;
    statusEffectStamBuff: StatusType;
    readonly actionConsumeStamPaste: ActionType;
    itemStamPaste: ItemType;
}
