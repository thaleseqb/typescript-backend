import AdoptantEntity from "../../entities/AdoptantEntity";

export default interface InterfaceAdoptantRepository {
    createAdoptant(adotante: AdoptantEntity): void | Promise<void>;
    getAdoptantList():  Promise<Array<AdoptantEntity>>;
    updateAdoptant(
        id:number,
        adoptant: AdoptantEntity
    ): Promise<{success:boolean; message?:string} | void >
}