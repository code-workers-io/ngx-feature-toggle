import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxFeatureToggleService } from './ngx-feature-toggle.service';
import { ReplaySubject, Subscription, switchMap } from 'rxjs';

/**
 * @publicApi
 */
@Directive({
  selector: '[ngxToggleFeature]',
  standalone: true,
})
export class ToggleFeatureDirective implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private ngxToggleFeature$$ = new ReplaySubject<string | string[] | null>(1)
  private ngxToggleFeatureOr$$ = new ReplaySubject<string>(1)
  @Input() set ngxToggleFeature(feature: string | string[] | null){
    this.ngxToggleFeature$$.next(feature);
  }
  @Input() set ngxToggleFeatureOr(featureOr: string |null | undefined) {
    if (featureOr){
      this.ngxToggleFeatureOr$$.next(featureOr);
    }
  };

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private readonly featureToggleService: NgxFeatureToggleService
  ) {}

  ngOnInit() {
    this.subscription.add(this.ngxToggleFeature$$.pipe(
      switchMap((feature) => this.featureToggleService.hasFlags(feature))
    ).subscribe((hasFeature) => {
      this.vcr.clear()
      if (hasFeature) {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }));

    this.subscription.add(this.ngxToggleFeatureOr$$.pipe(
      switchMap((feature) => this.featureToggleService.hasFlags(feature))
    ).subscribe((hasFeature) => {
      this.vcr.clear()
      if (hasFeature) {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }));


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
