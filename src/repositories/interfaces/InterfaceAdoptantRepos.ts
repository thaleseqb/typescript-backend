import AddressEntity from "../../entities/Address";
import AdoptantEntity from "../../entities/AdoptantEntity";

export default interface InterfaceAdoptantRepository {
    createAdoptant(adotante: AdoptantEntity): void | Promise<void>;
    getAdoptantList():  Promise<Array<AdoptantEntity>>;
    updateAdoptant(
        id:number,
        adoptant: AdoptantEntity
    ): Promise<{success:boolean; message?:string} | void >;
    deleteAdoptant(id:number): Promise<{success:boolean; message?: string}> | void;
    updateAdoptantAddress(
        id:number, 
        address: AddressEntity
    ): Promise<{success:boolean; message?: string}> | void;
}