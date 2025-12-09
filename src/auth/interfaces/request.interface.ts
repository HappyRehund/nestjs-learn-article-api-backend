import { Request } from 'express';
import { ValidateLocalStrategyResponseDto } from '../dto/validate-local-strategy-response.dto';


export interface RequestPassedValidation extends Request {
  user: ValidateLocalStrategyResponseDto
}