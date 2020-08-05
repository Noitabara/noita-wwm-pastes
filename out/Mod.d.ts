import Mod from "mod/Mod";
import { ItemType } from "item/IItem";
import { StatusType } from "entity/IEntity";
import { ActionType } from "entity/action/IAction";
interface IStamPasteData {
    PasteBuffTick: number;
    PasteBuffQuality: number;
    PasteBuffMaxDura: number;
    PasteBuffMinDura: number;
}
interface IUsersBuffData {
    [key: string]: IStamPasteData;
}
export default class Pastes extends Mod {
    buffData: IUsersBuffData;
    onInitialize(): void;
    static readonly INST: Pastes;
    statusEffectStamBuff: StatusType;
    readonly actionConsumeStamPaste: ActionType;
    itemStamPaste: ItemType;
}
export {};
