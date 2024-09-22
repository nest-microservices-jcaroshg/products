import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // @Post()
  @MessagePattern({ cmd: 'create' })
  async create(@Payload() createProductoDto: CreateProductoDto) {
    return await this.productosService.create(createProductoDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'get_all' })
  findAll(@Payload() paginationDto: PaginationDTO) {
    return this.productosService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'get_by_id' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    // @Payload('id') we need to send the data -> { id: 123 }
    return this.productosService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update' })
  update(
    // @Param('id') id: string,
    // @Body() updateProductoDto: UpdateProductoDto,
    @Payload() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(
      updateProductoDto.id,
      updateProductoDto,
    );
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
