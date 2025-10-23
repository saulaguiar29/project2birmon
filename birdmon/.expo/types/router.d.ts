/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/camera`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/card-detail`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/settings`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/statistics`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/camera`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/avoidview/card-detail`; params?: Router.UnknownOutputParams; } | { pathname: `/avoidview/settings`; params?: Router.UnknownOutputParams; } | { pathname: `/avoidview/statistics`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/camera${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/avoidview/card-detail${`?${string}` | `#${string}` | ''}` | `/avoidview/settings${`?${string}` | `#${string}` | ''}` | `/avoidview/statistics${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/camera`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/card-detail`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/settings`; params?: Router.UnknownInputParams; } | { pathname: `/avoidview/statistics`; params?: Router.UnknownInputParams; };
    }
  }
}
