import { registerAs } from "@nestjs/config"

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE
}))