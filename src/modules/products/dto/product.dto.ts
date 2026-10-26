import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDTO{
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}