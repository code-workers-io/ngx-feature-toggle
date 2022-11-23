import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { NgxFeatureToggleService } from './ngx-feature-toggle.service';
import { Observable } from 'rxjs';

/**
 * @publicApi
 */
@Injectable({
  providedIn: 'root'
})
export class NgxToggleFeatureGuard implements CanActivate {
  constructor(private readonly featureToggleService: NgxFeatureToggleService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    return this.featureToggleService.hasFlags(route.data['flags']);
  }

}
