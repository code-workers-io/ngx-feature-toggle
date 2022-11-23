import { TestBed, waitForAsync } from '@angular/core/testing';

import { NgxFeatureToggleService } from './ngx-feature-toggle.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  FeatureProvider,
  NGX_FEATURE_PROVIDER,
} from './feature-provider.token';
import { FeatureList } from './models/feature-list';

describe('NgxFeatureToggleService', () => {
  describe('Primitive provider', () => {
    it('should be created', async () => {
      const { service } = await createService('primitive');
      expect(service).toBeTruthy();
    });

    it('should return true for a feature that is enabled', waitForAsync(async () => {
      const { service } = await createService('primitive');
      service.hasFlags('a').subscribe((result) => {
        expect(result).toBeTruthy();
      });
    }));

    it('should return false for a feature that is disabled', waitForAsync(async () => {
      const { service } = await createService('primitive');
      service.hasFlags('b').subscribe((result) => {
        expect(result).toBeFalsy();
      });
    }));
  });

  describe('Observable provider', () => {
    it('should be created', async () => {
      const { service } = await createService('observable');
      expect(service).toBeTruthy();
    });

    it('should return true for a feature that is enabled', waitForAsync(async () => {
      const { service } = await createService('observable');
      service.hasFlags('a').subscribe((result) => {
        expect(result).toBeTruthy();
      });
    }));

    it('should return false for a feature that is disabled', waitForAsync(async () => {
      const { service } = await createService('observable');
      service.hasFlags('b').subscribe((result) => {
        expect(result).toBeFalsy();
      });
    }));
  });
});

async function createService(provider: 'primitive' | 'observable') {
  let service: NgxFeatureToggleService;

  await TestBed.configureTestingModule({
    providers: [
      {
        provide: NGX_FEATURE_PROVIDER,
        useExisting:
          provider === 'primitive' ? TestProvider : TestProviderObservable,
      },
      NgxFeatureToggleService,
    ],
  });
  service = TestBed.inject(NgxFeatureToggleService);

  return {
    service,
  };
}

@Injectable({ providedIn: 'root' })
class TestProvider implements FeatureProvider {
  getFeatureList(): FeatureList {
    return testFeatureList;
  }
}
@Injectable({ providedIn: 'root' })
class TestProviderObservable implements FeatureProvider {
  getFeatureList(): Observable<FeatureList> {
    return of(testFeatureList);
  }
}

const testFeatureList: FeatureList = {
  a: true,
  b: false,
  c: true,
};
