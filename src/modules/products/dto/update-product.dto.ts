import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDTO } from "./product.dto";

export class UpdateProductDto extends PartialType(CreateProductDTO){}