import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService{

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return this.temaRepository.find({
            relations: {
                postagem: true
            }
        }); //SELECT*FROM ;
    }

    async findById(id:number): Promise<Tema>{
        
        //SELECT*FROM tb_tema WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        })

        if(!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)
        
        return tema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        }); 
    }

    async create(tema: Tema): Promise<Tema>{
        //INSERT INTO tb_tema (titulo, texto) VALUES (?, ?)
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema>{
        
        await this.findById(tema.id)
        
        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        
        //DELETE tb_tema WHERE id =?;
        return await this.temaRepository.delete(id)
    }

}
