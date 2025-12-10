import { Request } from 'express';
import { ValidateLocalStrategyResponseDto } from '../auth/dto/validate-local-strategy-response.dto';
import { JwtPayloadData } from '../auth/interfaces/jwt-payload.interface';

// endpoint yang pakai LocalAuthGuard (login)
export interface RequestPassedValidation extends Request {
  user: ValidateLocalStrategyResponseDto
}

// endpoint yang pakai JwtAuthGuard (prtected routes)
export interface RequestWithJwtPayload extends Request {
  user: JwtPayloadData
}

// endpoint yang pakai JwtRtAuthGuard (refresh)
export interface RequestWithRefreshToken extends Request {
  user: JwtPayloadData & { refreshToken: string}
}