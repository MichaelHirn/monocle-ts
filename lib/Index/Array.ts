/**
 * @since 1.2.0
 */
import { Index, Optional } from '../index.ts'
import { lookup, updateAt } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Array.ts'
import { isNone } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'

/**
 * @category constructor
 * @since 1.2.0
 */
export function indexArray<A = never>(): Index<Array<A>, number, A> {
  return new Index(
    (i) =>
      new Optional(
        (as) => lookup(i, as),
        (a) => (as) => {
          const oas = updateAt(i, a)(as)
          if (isNone(oas)) {
            return as
          } else {
            return oas.value
          }
        }
      )
  )
}
