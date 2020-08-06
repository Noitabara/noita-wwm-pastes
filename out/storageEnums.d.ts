export interface IStamPasteData {
    PasteBuffTick: number;
    PasteBuffQuality: number;
    PasteBuffMaxDura: number;
    PasteBuffMinDura: number;
}
export interface IUStamBuffData {
    [key: string]: IStamPasteData;
}
export interface IWeightPasteData {
    PasteBuffTick: number;
    PasteBuffQuality: number;
    PasteBuffMaxDura: number;
    PasteBuffMinDura: number;
}
export interface IUWeightBuffData {
    [key: string]: IWeightPasteData;
}
