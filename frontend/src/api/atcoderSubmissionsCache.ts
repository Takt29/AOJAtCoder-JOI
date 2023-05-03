import { deleteDB, openDB } from 'idb'
import { AtcoderOriginalSubmission } from '../types/submission'

/** IndexedDBの提出を保存するObjectStoreの名前 */
const IDB_STORE_NAME = 'submissions'

type AtCoderSubmissionsDB = {
  [IDB_STORE_NAME]: {
    key: string
    value: AtcoderOriginalSubmission
  }
}

export const loadAtcoderSubmissionsFromCache = async (
  atcoderUserId: string,
): Promise<AtcoderOriginalSubmission[]> => {
  const db = await openAtcoderSubmissionsDB(atcoderUserId)
  const res = await db.getAll(IDB_STORE_NAME)
  db.close()
  return res
}

export const saveAtcoderSubmissionsToCache = async (
  atcoderUserId: string,
  submissions: AtcoderOriginalSubmission[],
): Promise<void> => {
  const db = await openAtcoderSubmissionsDB(atcoderUserId)
  const tx = db.transaction(IDB_STORE_NAME, 'readwrite')
  await Promise.all([
    ...submissions.map((submission) => tx.store.put(submission)),
    tx.done,
  ])
  db.close()
}

export const deleteAtcoderSubmissionsDB = async (atcoderUserId: string) => {
  await deleteDB(`atcoder:submissions:${atcoderUserId}`)
}

export const openAtcoderSubmissionsDB = async (atcoderUserId: string) => {
  const db = await openDB<AtCoderSubmissionsDB>(
    `atcoder:submissions:${atcoderUserId}`,
    1,
    {
      upgrade: (db) => {
        db.createObjectStore(IDB_STORE_NAME, {
          keyPath: 'id',
        })
      },
    },
  )
  return db
}
