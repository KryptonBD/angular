/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ProviderToken} from '../di';
import {Signal} from '../render3/reactivity/api';

function viewChildFn<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {read?: ProviderToken<ReadT>}): Signal<ReadT|undefined> {
  return null! as Signal<ReadT|undefined>;
}

function viewChildRequiredFn<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string, opts?: {read?: ProviderToken<ReadT>}): Signal<ReadT> {
  return null! as Signal<ReadT>;
}

/**
 * Type of the `viewChild` function. The viewChild function creates a singular view query.
 *
 * It is a special function that also provides access to required query results via the `.required`
 * property.
 *
 * @developerPreview
 */
export interface ViewChildFunction {
  /**
   * Initializes a view child query. Consider using `viewChild.required` for queries that should
   * always match.
   *
   * @usageNotes
   * Create a child query in your component by declaring a
   * class field and initializing it with the `viewChild()` function.
   *
   * ```ts
   * @Component({template: '<div #el></div><my-component #cmp />'})
   * export class TestComponent {
   *   divEl = viewChild<ElementRef>('el');                   // Signal<ElementRef|undefined>
   *   cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>
   * }
   * ```
   *
   * @developerPreview
   */
  <LocatorT>(locator: ProviderToken<LocatorT>|string): Signal<LocatorT|undefined>;
  <LocatorT, ReadT>(locator: ProviderToken<LocatorT>|string, opts: {read: ProviderToken<ReadT>}):
      Signal<ReadT|undefined>;

  /**
   * Initializes a view child query that is expected to always match an element.
   *
   * @usageNotes
   * Create a required child query in your component by declaring a
   * class field and initializing it with the `viewChild()` function.
   *
   * ```ts
   * @Component({template: '<div #el></div><my-component #cmp />'})
   * export class TestComponent {
   *   divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>
   *   cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
   * }
   * ```
   *
   * @developerPreview
   */
  required: {
    <LocatorT>(locator: ProviderToken<LocatorT>|string): Signal<LocatorT>;

    <LocatorT, ReadT>(locator: ProviderToken<LocatorT>|string, opts: {read: ProviderToken<ReadT>}):
        Signal<ReadT>;
  };
}

/**
 * Initializes a view child query.
 *
 * Consider using `viewChild.required` for queries that should always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `viewChild()` function.
 *
 * ```ts
 * @Component({template: '<div #el></div><my-component #cmp />'})
 * export class TestComponent {
 *   divEl = viewChild<ElementRef>('el');                   // Signal<ElementRef|undefined>
 *   divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>
 *   cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>
 *   cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
 * }
 * ```
 *
 * @developerPreview
 */
export const viewChild: ViewChildFunction = (() => {
  // Note: This may be considered a side-effect, but nothing will depend on
  // this assignment, unless this `viewChild` constant export is accessed. It's a
  // self-contained side effect that is local to the user facing `viewChild` export.
  (viewChildFn as any).required = viewChildRequiredFn;
  return viewChildFn as (typeof viewChildFn&{required: typeof viewChildRequiredFn});
})();

export function viewChildren<LocatorT>(locator: ProviderToken<LocatorT>|
                                       string): Signal<ReadonlyArray<LocatorT>>;
export function viewChildren<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts: {read: ProviderToken<ReadT>}): Signal<ReadonlyArray<ReadT>>;

/**
 * Initializes a view children query.
 *
 * Query results are represented as a signal of a read-only collection containing all matched
 * elements.
 *
 * @usageNotes
 * Create a children query in your component by declaring a
 * class field and initializing it with the `viewChildren()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   divEls = viewChildren<ElementRef>('el');   // Signal<ReadonlyArray<ElementRef>>
 * }
 * ```
 */
export function viewChildren<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {read?: ProviderToken<ReadT>}): Signal<ReadonlyArray<ReadT>> {
  return null!;
}

export function contentChildFn<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {descendants?: boolean, read?: ProviderToken<ReadT>}): Signal<ReadT|undefined> {
  return null!;
}

function contentChildRequiredFn<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {descendants?: boolean, read?: ProviderToken<ReadT>}): Signal<ReadT> {
  return null!;
}

/**
 * Type of the `contentChild` function.
 *
 * The contentChild function creates a singular content query. It is a special function that also
 * provides access to required query results via the `.required` property.
 *
 * @developerPreview
 */
export interface ContentChildFunction {
  /**
   * Initializes a content child query.
   *
   * Consider using `contentChild.required` for queries that should always match.
   *
   * @usageNotes
   * Create a child query in your component by declaring a
   * class field and initializing it with the `contentChild()` function.
   *
   * ```ts
   * @Component({...})
   * export class TestComponent {
   *   headerEl = contentChild<ElementRef>('h');                    // Signal<ElementRef|undefined>
   *   header = contentChild(MyHeader);                             // Signal<MyHeader|undefined>
   * }
   * ```
   * @developerPreview
   */
  <LocatorT>(locator: ProviderToken<LocatorT>|string, opts?: {descendants?: boolean}):
      Signal<LocatorT|undefined>;
  <LocatorT, ReadT>(locator: ProviderToken<LocatorT>|string, opts: {
    descendants?: boolean, read: ProviderToken<ReadT>
  }): Signal<ReadT|undefined>;

  /**
   * Initializes a content child query that is always expected to match.
   *
   * @usageNotes
   * Create a child query in your component by declaring a
   * class field and initializing it with the `contentChild()` function.
   *
   * ```ts
   * @Component({...})
   * export class TestComponent {
   *   headerElElRequired = contentChild.required<ElementRef>('h');   // Signal<ElementRef>
   *   headerRequired = contentChild.required(MyHeader);            // Signal<MyHeader>
   * }
   * ```
   * @developerPreview
   */
  required: {
    <LocatorT>(locator: ProviderToken<LocatorT>|string, opts?: {descendants?: boolean}):
        Signal<LocatorT>;
    <LocatorT, ReadT>(
        locator: ProviderToken<LocatorT>|string,
        opts: {descendants?: boolean, read: ProviderToken<ReadT>}): Signal<ReadT>;
  };
}

/**
 * Initializes a content child query. Consider using `contentChild.required` for queries that should
 * always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `contentChild()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   headerEl = contentChild<ElementRef>('h');                    // Signal<ElementRef|undefined>
 *   headerElElRequired = contentChild.required<ElementRef>('h'); // Signal<ElementRef>
 *   header = contentChild(MyHeader);                             // Signal<MyHeader|undefined>
 *   headerRequired = contentChild.required(MyHeader);            // Signal<MyHeader>
 * }
 * ```
 */
export const contentChild: ContentChildFunction = (() => {
  // Note: This may be considered a side-effect, but nothing will depend on
  // this assignment, unless this `viewChild` constant export is accessed. It's a
  // self-contained side effect that is local to the user facing `viewChild` export.
  (contentChildFn as any).required = contentChildRequiredFn;
  return contentChildFn as (typeof contentChildFn&{required: typeof contentChildRequiredFn});
})();


export function contentChildren<LocatorT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {descendants?: boolean}): Signal<ReadonlyArray<LocatorT>>;
export function contentChildren<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts: {descendants?: boolean, read: ProviderToken<ReadT>}): Signal<ReadonlyArray<ReadT>>;

/**
 * Initializes a content children query.
 *
 * Query results are represented as a signal of a read-only collection containing all matched
 * elements.
 *
 * @usageNotes
 * Create a children query in your component by declaring a
 * class field and initializing it with the `contentChildren()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   headerEl = contentChildren<ElementRef>('h');   // Signal<ReadonlyArray<ElementRef>>
 * }
 * ```
 */
export function contentChildren<LocatorT, ReadT>(
    locator: ProviderToken<LocatorT>|string,
    opts?: {descendants?: boolean, read?: ProviderToken<ReadT>}): Signal<ReadonlyArray<ReadT>> {
  return null!;
}
