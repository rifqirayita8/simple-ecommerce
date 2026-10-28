import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "../repositories/products.repository";
import { Product } from "../entities/product.entity";
import { CreateProductDTO } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductsService{
  constructor(private readonly productRepository: ProductsRepository){}

  findAll(): Promise<Product[]>{
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product>{
    const product= await this.productRepository.findOne(id);
    if (!product){
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(dto: CreateProductDTO): Promise<Product>{
    return this.productRepository.create(dto);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product>{
    const product= await this.productRepository.update(id, dto);
    if (!product){
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async remove(id: number): Promise<void>{
    const removed= await this.productRepository.remove(id);
    if (!removed){
      throw new NotFoundException(`Product ${id} not found`);
    }
  }
}
