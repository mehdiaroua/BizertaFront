import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ERole } from '../models/user';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private UserService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'] as ERole[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasAccess = this.UserService.haveAccess(requiredRoles);

    if (!hasAccess) {
      this.router.navigate(['/unauthorized']);
    }

    return hasAccess;
  }
  
}
