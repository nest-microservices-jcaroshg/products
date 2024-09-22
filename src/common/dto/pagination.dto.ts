import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

const messageErrorPage = 'the property <page> should be a positive number';
const messageErrorLimit = 'the property <limit> should be a positive number';

export class PaginationDTO {
  @IsPositive({ message: messageErrorPage })
  @IsOptional({ message: messageErrorPage })
  @Type(() => Number)
  public page?: number = 1;

  @IsPositive({ message: messageErrorLimit })
  @IsOptional({ message: messageErrorLimit })
  @Type(({}) => Number)
  public limit?: number = 10;
}
