import Mod from "mod/Mod";
import Log from "utilities/Log";

let log: Log

export default class Pastes extends Mod {
    public onInitialize() {
        log = this.getLog()
        log.info('Hello, sweet world.')
    }

    @Mod.instance<Pastes>("Buff Pastes")
    public static readonly INSTANCE: Pastes


}
