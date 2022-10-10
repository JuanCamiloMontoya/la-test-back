import { IsEmail, IsString, Length } from "class-validator"
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {

  @IsEmail()
  @ApiProperty({ example: 'pepe@gmail.com' })
  email: string

  @IsString()
  @Length(3, 30)
  @ApiProperty({ example: 'as12@aa_767ñ' })
  password: string

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