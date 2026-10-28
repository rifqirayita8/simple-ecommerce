import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { CreateProductDTO } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ){}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Product | null>{
    return this.repo.findOneBy({id});
  }

  create(data: CreateProductDTO): Promise<Product>{
    const product= this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product | null>{
    const product= await this.findOne(id);
    if (!product) return null;
    Object.assign(product, data);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<boolean>{
    const result= await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}