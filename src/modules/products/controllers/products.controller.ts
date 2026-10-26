import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { Product } from "../entities/product.entity";
import { CreateProductDTO } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Controller('products')
export class ProductsController{
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[]{
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number): Product{
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body()dto: CreateProductDTO): Product{
    return this.productsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)id: number,
    @Body()dto: UpdateProductDto,
  ): Product{
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe)id: number): void{
    return this.productsService.remove(id);
  }
}
