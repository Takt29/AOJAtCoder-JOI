import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 5 * 60 * 1000,
  exclude: { query: false },
  key: (req) => {
    let serialized =
      req.params instanceof URLSearchParams
        ? req.params.toString()
        : JSON.stringify(req.params) || ''
    return req.url + serialized
  },
})

const axios_cache = axios.create({
  adapter: cache.adapter,
})

export default axios_cache
