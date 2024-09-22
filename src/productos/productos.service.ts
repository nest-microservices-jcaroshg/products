import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('productosService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connection to DB successfully');
  }

  async create(createProductoDto: CreateProductoDto) {
    return await this.product.create({ data: createProductoDto });
    // return createProductoDto;
  }

  async findAll(paginationDto: PaginationDTO) {
    const totalProducts = await this.product.count({
      where: { available: true },
    });
    const currentPage = paginationDto.page;
    const lastPage = Math.ceil(totalProducts / paginationDto.limit);
    const productsFonded = await this.product.findMany({
      where: { available: true },
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    });
    return {
      data: productsFonded,
      metadata: {
        totalProducts,
        lastPage,
        currentPage,
      },
    };
  }

  async findOne(id: number) {
    const productFounded = await this.product.findUnique({
      where: {
        id: id,
        available: true,
      },
    });
    if (!productFounded)
      throw new NotFoundException(`The product with id ${id} not exists`);

    return productFounded;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productToUpdate = await this.findOne(id);
    if (!productToUpdate)
      throw new NotFoundException(`The product with id ${id} not exists`);
    const { id: __, ...dataToUpdate } = updateProductoDto;
    return this.product.update({
      where: { id: id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    const productToUpdate = await this.findOne(id);
    if (!productToUpdate)
      throw new NotFoundException(`The product with id ${id} not exists`);
    // return this.product.delete({
    //   where: { id: id },
    // });
    const productUpdated = await this.product.update({
      where: { id: id },
      data: {
        available: false,
      },
    });
    return productUpdated;
  }
}
