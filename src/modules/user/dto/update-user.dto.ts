import { IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDTO {

  @IsString()
  @ApiProperty({ example: 'Pepe' })
  firstname: string

  @IsString()
  @ApiProperty({ example: 'Perez' })
  lastname: string

  @IsString()
  @ApiProperty({ example: '3121231234' })
  phone: string

}