import { ProductOptionDto } from './ProductOptionDto.model';

export class ProductDto {
    public ProductId: string;
    public categoryId: string;
    public productName: string;
    public brandName: string;
    public price: number;
    public stock: number;
    public categoryName: string;
    public image: string;
    public productOptionDto: ProductOptionDto[];
}