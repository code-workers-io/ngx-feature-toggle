# @code-workers.io/ngx-feature-toggle

Configure your Angular apps easily with feature flags for e.g. A/B-testing.

## Installation

```bash
npm install @code-workers.io/ngx-feature-toggle
```

## Usage
You will need to implement a service which implements the `FeatureProvider` interface and
then provide it with the `NGX_FEATURE_PROVIDER` token in your `app.module`. That's it for 
the configuration.

To use it you can simply: 
  
  ```typescript
<feature *ngxToggleFeature="'feat-a'; or 'feat-b'"> </feature>

```

## Compatibility
* Version 1.x.x is compatible with Angular >= 14.x.x
