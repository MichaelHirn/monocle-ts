/**
 * @since 2.2.0
 */
import { ReadonlyRecord } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/ReadonlyRecord.ts'
import { Index } from '../index.ts'
import * as R from './Record.ts'

/**
 * @category constructor
 * @since 2.2.0
 */
export const indexReadonlyRecord: <A = never>() => Index<ReadonlyRecord<string, A>, string, A> = R.indexRecord
