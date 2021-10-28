import axios from "axios"
import { openDB } from 'idb/with-async-ittr.js';

export const fetchAtCoderSubmissions = async (
  id,
  fromSecond
) => {
  const res = await axios({
    method: 'get',
    url: 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions',
    responseType: 'json',
    timeout: 5000,
    params: {
      user: id,
      from_second: fromSecond,
    }
  })

  return res.data
}

export const fetchAllAtCoderSubmissions = async (
  id,
  fromSecond = 0
) => {
  const submissions = []

  while(true) {
    const res = await fetchAtCoderSubmissions(id, fromSecond)
    if (!res?.length) {
      break
    }

    submissions.push(...res)
    submissions.sort((a, b) => a.epoch_second - b.epoch_second)
    fromSecond = submissions[submissions.length - 1].epoch_second + 1
  }

  return submissions
}

const openSubmissionsDB = async (id) => {
  const db = await openDB(`atcoder:submissions:${id}`, 1, {
    upgrade: (db) => {
      const store = db.createObjectStore('submissions', {
        keyPath: 'id',
      })
      store.createIndex('epoch_second', 'epoch_second')
    }
  })
  return db
}

const STORE_NAME = 'submissions'

export const getAtCoderSubmissionsFromCache = async (
  id
) => {
  const db = await openSubmissionsDB(id)
  
  const res = await db.getAll(STORE_NAME)
  
  return res
}

export const saveAtCoderSubmissionsToCache = async (
  id,
  submissions
) => {
  const db = await openSubmissionsDB(id)

  const tx = db.transaction(STORE_NAME, 'readwrite')
  await Promise.all([
    ...submissions.map(submission => tx.store.put(submission)),
    tx.done
  ])
}

export const fetchAllAtCoderSubmissionsUsingCache = async (
  id,
) => {
  console.log('ok1')

  const cachedSubmissions = await getAtCoderSubmissionsFromCache(id)
  cachedSubmissions.sort((a, b) => a.epoch_second - b.epoch_second)

  console.log('ok2')

  const lastSubmissionsSecond = cachedSubmissions.length ? cachedSubmissions[cachedSubmissions.length-1].epoch_second : 0

  const fetchedSubmissions = await fetchAllAtCoderSubmissions(
    id, 
    Math.max(0, lastSubmissionsSecond - 60 * 60 * 24)
  )
  
  saveAtCoderSubmissionsToCache(id, fetchedSubmissions)

  console.log('ok3')

  const submissionsMap = new Map()

  const submissions = [
    ...cachedSubmissions,
    ...fetchedSubmissions,
  ]

  for (const submission of submissions) {
    submissionsMap.set(submission.id, submission)
  }
  
  const res = Array.from(submissionsMap.values())

  console.log(res)

  return res
}