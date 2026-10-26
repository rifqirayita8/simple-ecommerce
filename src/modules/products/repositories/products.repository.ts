import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { CreateProductDTO } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductsRepository{
  private products: Product[]= [];
  private nextId= 1;

  findAll(): Product[]{
    return this.products;
  }

  findOne(id: number): Product | undefined{
    return this.products.find((product) => product.id === id);
  }

  create(data: CreateProductDTO): Product{
    const product: Product= {id: this.nextId++, ...data};
    this.products.push(product);
    return product;
  }

  update(id: number,data: UpdateProductDto): Product | undefined{
    const product= this.findOne(id);
    if (!product) return undefined;
    Object.assign(product, data);
    return product;
  }

  remove(id: number): boolean{
    const index= this.products.findIndex((product) => product.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}