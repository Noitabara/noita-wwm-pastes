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
interface IUserBuffObject {
    player_ident: string;
    ticker: number;
    max_ticker: number;
    quality: number;
    max_durability: number;
    min_durability: number;
}
interface IUserHungerBuffObjects extends Array<IUserBuffObject> {
}
interface IUserThirstBuffObjects extends Array<IUserBuffObject> {
}
export default class Pastes extends Mod {
    buffData: IUsersBuffData;
    hungerBuffStore: IUserHungerBuffObjects;
    thirstBuffStore: IUserThirstBuffObjects;
    onInitialize(): void;
    onGameTickStart(): void;
    static readonly INST: Pastes;
    statusEffectStamBuff: StatusType;
    readonly actionConsumeStamPaste: ActionType;
    itemStamPaste: ItemType;
    readonly actionTestExecuteAction: ActionType;
    readonly actionTestAction: ActionType;
    itemTest: ItemType;
}
export {};
