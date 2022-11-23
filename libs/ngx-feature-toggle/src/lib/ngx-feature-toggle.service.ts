import { Inject, Injectable } from '@angular/core';
import { FeatureProvider, NGX_FEATURE_PROVIDER } from './feature-provider.token';
import { map, Observable, of } from 'rxjs';
import { FeatureList } from './models/feature-list';
import { coerceObservable } from '@code-workers.io/ng-types';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class NgxFeatureToggleService {

  constructor(@Inject(NGX_FEATURE_PROVIDER) private readonly featureProvider: FeatureProvider) { }

  hasFlags(flags: string | string[] | null): Observable<boolean> {
    if (!flags) {
      return of(false);
    }

    const featureList: Observable<FeatureList> = coerceObservable(this.featureProvider.getFeatureList());

    return featureList.pipe(
      map((featureList) => {
        if (Array.isArray(flags)) {
          return flags.every((flag) => featureList[flag]);
        }
        return featureList[flags];
      }));


  }
}
