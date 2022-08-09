/**
 * @since 2.2.0
 */
import { Option } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'
import { ReadonlyRecord } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/ReadonlyRecord.ts'
import { At } from '../index.ts'
import * as R from './Record.ts'

/**
 * @category constructor
 * @since 2.2.0
 */
export const atReadonlyRecord: <A = never>() => At<ReadonlyRecord<string, A>, string, Option<A>> = R.atRecord
