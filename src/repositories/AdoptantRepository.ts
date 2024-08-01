import { Repository } from "typeorm";
import AdoptantEntity from "../entities/AdoptantEntity";
import InterfaceAdoptantRepository from "./interfaces/InterfaceAdoptantRepos";
import AddressEntity from "../entities/Address";

export default class AdoptantRepository implements InterfaceAdoptantRepository {
    constructor(private repository: Repository<AdoptantEntity>) {}

    public async getAdoptantList(): Promise<Array<AdoptantEntity>> {
        return await this.repository.find();
    }
    
    public createAdoptant(adoptant: AdoptantEntity): void | Promise<void> {
        this.repository.save(adoptant);
    }

    public async updateAdoptant(id:number, newAdoptant: AdoptantEntity): Promise<{success:boolean; message?:string}> {

        try {
            const oldRegister = await this.repository.findOne({where : { id }})
        
            if (!oldRegister) {
                return { success: false, message: "adotante inexistente"}
            }

            Object.assign(oldRegister, newAdoptant);
            await this.repository.save(oldRegister);

            return {success:true}
            
        } catch (error) {
            return {
                success: false,
                message: "Algo deu errado ao tentar atualziar o cadastro do adotante"
            };
        }
    }

    public async deleteAdoptant(id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const toDeleteAdoptant = await this.repository.findOne({ where: { id } })

            if (!toDeleteAdoptant) {
                return {success:false, message: "adotante não encontrado"}
            }

            await this.repository.remove(toDeleteAdoptant);
            return {success:true};

        } catch (error) {
            return {
                success: false,
                message: "falha ao excluir adotante"
            };
        }
    }

    public async updateAdoptantAddress(
        id: number, 
        address: AddressEntity
    ): Promise<{ success: boolean; message?: string; }> {

        try {
            const adoptant = await this.repository.findOne({ where : { id } });

            if (!adoptant) {
                return {success: false, message: "adotante não encontrado"}
            }

            const newAddress = new AddressEntity(address.city, address.state);
            adoptant.address = newAddress;
            await this.repository.save(adoptant);

            return {success:true}
        } catch (error) {
            return {
                success: false,
                message: `O seguinte erro foi capturado: ${error}`
            }
        }
    }
}