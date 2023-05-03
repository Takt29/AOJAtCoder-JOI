import {
  deleteAtcoderSubmissionsDB,
  openAtcoderSubmissionsDB,
} from './atcoderSubmissionsCache'

beforeEach(() => {
  // eslint-disable-next-line no-global-assign
  indexedDB = new IDBFactory()
})

test('openするとDBが作成される', async () => {
  await openAtcoderSubmissionsDB('user_id')
  const dbs = await indexedDB.databases()
  expect(dbs).toEqual([
    {
      name: 'atcoder:submissions:user_id',
      version: 1,
    },
  ])
})

test('存在するDBのdeleteができる', async () => {
  const db = await openAtcoderSubmissionsDB('user_id')
  expect((await indexedDB.databases()).length).toBe(1)
  db.close()

  await deleteAtcoderSubmissionsDB('user_id')
  expect((await indexedDB.databases()).length).toBe(0)
})

test('存在しないDBのdeleteを呼び出してもエラーは発生しない', async () => {
  await deleteAtcoderSubmissionsDB('user_id')
})
