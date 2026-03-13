import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create.product.dto';
import { AdminGuard } from './admin.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj nowy produkt' })
  @ApiResponse({ status: 201, description: 'Produkt został utworzony' })
  @ApiResponse({ status: 400, description: 'Błąd walidacji (DTO)' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich produktów' })
  @ApiResponse({ status: 200, description: 'Lista produktów' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz produkt po ID' })
  @ApiParam({ name: 'id', description: 'ID produktu', example: 1 })
  @ApiResponse({ status: 200, description: 'Znaleziony produkt' })
  @ApiResponse({ status: 404, description: 'Produkt nie istnieje' })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) throw new NotFoundException('Produkt nie istnieje');
    return product;
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Usuń produkt (wymaga x-admin-key)' })
  @ApiSecurity('admin-key')
  @ApiParam({ name: 'id', description: 'ID produktu do usunięcia', example: 1 })
  @ApiResponse({ status: 200, description: 'Produkt został usunięty' })
  @ApiResponse({ status: 403, description: 'Brak lub nieprawidłowy x-admin-key' })
  @ApiResponse({ status: 404, description: 'Produkt nie istnieje' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
