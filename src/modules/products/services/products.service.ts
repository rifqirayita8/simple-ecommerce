import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "../repositories/products.repository";
import { Product } from "../entities/product.entity";
import { CreateProductDTO } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductsService{
  constructor(private readonly productRepository: ProductsRepository){}

  findAll(): Product[]{
    return this.productRepository.findAll();
  }

  findOne(id: number): Product{
    const product= this.productRepository.findOne(id);
    if (!product){
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(dto: CreateProductDTO): Product{
    return this.productRepository.create(dto);
  }

  update(id: number, dto: UpdateProductDto): Product{
    const product= this.productRepository.update(id, dto);
    if (!product){
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  remove(id: number): void{
    const removed= this.productRepository.remove(id);
    if (!removed){
      throw new NotFoundException(`Product ${id} not found`);
    }
  }
}
