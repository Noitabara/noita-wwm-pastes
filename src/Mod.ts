import Mod from "mod/Mod";
import Log from "utilities/Log";

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

export default class Pastes extends Mod {
    public buffData: IUsersBuffData = {}
    
    public onInitialize() {
        log = this.getLog()
        log.info('Hello, sweet world.')
    }

    @Mod.instance<Pastes>("Buff Pastes")
    public static readonly INSTANCE: Pastes

    
}
