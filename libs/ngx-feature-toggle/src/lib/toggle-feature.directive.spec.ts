import { ToggleFeatureDirective } from './toggle-feature.directive';
import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureProvider, NGX_FEATURE_PROVIDER } from './feature-provider.token';
import { FeatureList } from './models/feature-list';
import { NgxFeatureToggleService } from './ngx-feature-toggle.service';

describe('ToggleFeatureDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ToggleFeatureDirective],
      providers: [
        {
          provide: NGX_FEATURE_PROVIDER,
          useExisting: TestProvider
        },
        NgxFeatureToggleService

      ]
    })

  });

  it('should show content-1', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#content-1').textContent).toContain('Content 1');
  })

  it('should not show content-2', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#content-2')).toBeNull();
  })
})

@Component({
  selector: 'test-component',
  template: `
      <div *ngxToggleFeature="'a'" id='content-1'>Content 1</div>
      <div *ngxToggleFeature="['b']" id='content-2'>Content 2</div>
    `
})
class TestComponent {

}

@Injectable({providedIn: 'root'})
class TestProvider implements FeatureProvider {
  getFeatureList(): FeatureList {
    return testFeatureList;
  }
}

const testFeatureList: FeatureList = {
  'a': true,
  'b': false,
  'c': true,
}
