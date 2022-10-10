import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from "@nestjs/jwt"
import { Model } from 'mongoose'
import * as bcrypt from "bcrypt"
import { UserDocument } from '../user/schemas/user.schema'
import { LoginDTO } from './dto/login.dto'

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email })

    const isMatch = user && await bcrypt.compare(password, user.password)

    return isMatch ? user : null
  }

  async login(body: LoginDTO) {
    const { email, password } = body
    const user = await this.validateUser(email, password)

    if (!user)
      throw new HttpException('Credenciales incorrectas!', HttpStatus.UNAUTHORIZED)

    return { accessToken: this.jwtService.sign({ id: user.id }) }
  }
}