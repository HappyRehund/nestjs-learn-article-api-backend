import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/role.decorator";
import { User } from "../entities/user.entity";

interface RequestWithUser extends Request {
  user: User
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if(!requiredRoles){
      return true
    }

    const request  = context.switchToHttp().getRequest<RequestWithUser>()

    if(!request.user || !requiredRoles.includes(request.user.role)){
      throw new ForbiddenException("Access Denied")
    }

    return true
  }

}