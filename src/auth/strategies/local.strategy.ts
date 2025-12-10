import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { ValidateLocalStrategyResponseDto } from "../dto/validate-local-strategy-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<ValidateLocalStrategyResponseDto> {
    return await this.authService.validateUser(email, password)
  }
}