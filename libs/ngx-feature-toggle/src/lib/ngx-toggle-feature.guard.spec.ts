import { TestBed } from '@angular/core/testing';

import { NgxToggleFeatureGuard } from './ngx-toggle-feature.guard';
import { Injectable } from '@angular/core';
import {
  FeatureProvider,
  NGX_FEATURE_PROVIDER,
} from './feature-provider.token';
import { FeatureList } from './models/feature-list';

describe('NgxToggleFeatureGuard', () => {
  let guard: NgxToggleFeatureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxToggleFeatureGuard,
        {
          provide: NGX_FEATURE_PROVIDER,
          useExisting: TestProvider,
        },
      ],
    });
    guard = TestBed.inject(NgxToggleFeatureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

@Injectable({ providedIn: 'root' })
class TestProvider implements FeatureProvider {
  getFeatureList(): FeatureList {
    return testFeatureList;
  }
}

const testFeatureList: FeatureList = {
  a: true,
  b: false,
  c: true,
};
