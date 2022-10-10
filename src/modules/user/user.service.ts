import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from "bcrypt"
import { UserDocument } from './schemas/user.schema'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDTO) {
    try {
      const existEmail = await this.userModel.findOne({ email: createUserDto.email })

      if (existEmail)
        throw new HttpException('El correo ya existe!', HttpStatus.CONFLICT)

      let password = await bcrypt.hash(createUserDto.password, 10)

      const user = await this.userModel.create({ ...createUserDto, password })

      return { id: user.id }

    } catch (error) {
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async active(id: string) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/))
        throw new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND)

      const existUser = await this.userModel.findById(id)

      if (!existUser)
        throw new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND)

      await this.userModel.updateOne({ active: true })

      return { success: true }

    } catch (error) {
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    try {

      await this.userModel.findByIdAndUpdate(id, updateUserDto)
      return { success: true }

    } catch (error) {
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id)

      if (!user)
        throw new HttpException('El usuario no existe!', HttpStatus.NOT_FOUND)

      if (!user.active)
        throw new HttpException('El usuario no está disponible!', HttpStatus.NOT_FOUND)

      return user

    } catch (error) {
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async delete(id: string) {
    try {
      await this.userModel.deleteOne({ id })

      return { success: true }

    } catch (error) {
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
