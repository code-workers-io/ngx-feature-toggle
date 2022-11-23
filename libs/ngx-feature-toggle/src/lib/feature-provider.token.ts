import { InjectionToken } from '@angular/core';
import { FeatureList } from './models/feature-list';
import { Observable } from 'rxjs';


export interface FeatureProvider {
  getFeatureList(): FeatureList | Observable<FeatureList>;
}

export const NGX_FEATURE_PROVIDER = new InjectionToken<FeatureProvider>('NGX_FEATURE_PROVIDER');
