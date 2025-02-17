/**
 * **This module is experimental**
 *
 * Experimental features are published in order to get early feedback from the community.
 *
 * A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
 *
 * @since 2.3.0
 */
import * as O from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { At } from './At.ts'
import * as _ from './internal.ts'
import { Iso } from './Iso.ts'
import { Optional } from './Optional.ts'
import * as RM from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/ReadonlyMap.ts'
import { Eq } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Eq.ts'

import Option = O.Option
import { ReadonlyRecord } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/ReadonlyRecord.ts'
import { ReadonlyNonEmptyArray } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/ReadonlyNonEmptyArray.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.3.0
 */
export interface Index<S, I, A> {
  readonly index: (i: I) => Optional<S, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.3.8
 */
export const index: <S, I, A>(index: Index<S, I, A>['index']) => Index<S, I, A> = _.index

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromAt = <T, J, B>(at: At<T, J, Option<B>>): Index<T, J, B> =>
  index((i) => _.lensComposePrism(_.prismSome<B>())(at.at(i)))

/**
 * Lift an instance of `Index` using an `Iso`.
 *
 * @category constructors
 * @since 2.3.0
 */
export const fromIso = <T, S>(iso: Iso<T, S>) => <I, A>(sia: Index<S, I, A>): Index<T, I, A> =>
  index((i) => pipe(iso, _.isoAsOptional, _.optionalComposeOptional(sia.index(i))))

/**
 * @category constructors
 * @since 2.3.7
 */
export const indexReadonlyArray: <A = never>() => Index<ReadonlyArray<A>, number, A> = _.indexReadonlyArray

/**
 * @category constructors
 * @since 2.3.8
 */
export const indexReadonlyNonEmptyArray: <A = never>() => Index<ReadonlyNonEmptyArray<A>, number, A> =
  _.indexReadonlyNonEmptyArray

/**
 * @category constructors
 * @since 2.3.7
 */
export const indexReadonlyRecord: <A = never>() => Index<ReadonlyRecord<string, A>, string, A> = _.indexReadonlyRecord

/**
 * @category constructors
 * @since 2.3.7
 */
export const indexReadonlyMap = <K>(E: Eq<K>): (<A = never>() => Index<ReadonlyMap<K, A>, K, A>) => {
  const lookupE = RM.lookup(E)
  const insertAtE = RM.insertAt(E)
  return () =>
    index((key) =>
      _.optional(
        (s) => lookupE(key, s),
        (next) => {
          const insert = insertAtE(key, next)
          return (s) =>
            pipe(
              lookupE(key, s),
              O.fold(
                () => s,
                (prev) => (next === prev ? s : insert(s))
              )
            )
        }
      )
    )
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `indexReadonlyArray` instead.
 *
 * @category constructors
 * @since 2.3.2
 * @deprecated
 */
export const indexArray: <A = never>() => Index<ReadonlyArray<A>, number, A> = _.indexReadonlyArray

/**
 * Use `indexReadonlyRecord` instead.
 *
 * @category constructors
 * @since 2.3.2
 * @deprecated
 */
export const indexRecord: <A = never>() => Index<ReadonlyRecord<string, A>, string, A> = _.indexReadonlyRecord
