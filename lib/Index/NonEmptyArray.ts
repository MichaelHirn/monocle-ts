/**
 * @since 1.5.0
 */
import { Index, Optional } from '../index.ts'
import { NonEmptyArray, updateAt } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/NonEmptyArray.ts'
import { lookup } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Array.ts'
import { isNone } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'

/**
 * @category constructor
 * @since 1.5.0
 */
export function indexNonEmptyArray<A = never>(): Index<NonEmptyArray<A>, number, A> {
  return new Index(
    (i) =>
      new Optional(
        (s) => lookup(i, s),
        (a) => (nea) => {
          const onea = updateAt(i, a)(nea)
          if (isNone(onea)) {
            return nea
          } else {
            return onea.value
          }
        }
      )
  )
}
