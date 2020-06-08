const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const YYYY = date.getFullYear()
  const MM = ('0' + (date.getMonth() + 1)).slice(-2)
  const DD = ('0' + date.getDate()).slice(-2)

  return `${YYYY}/${MM}/${DD}`
}

const formatDateTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const YYYY = date.getFullYear()
  const MM = ('0' + (date.getMonth() + 1)).slice(-2)
  const DD = ('0' + date.getDate()).slice(-2)
  const hh = ('0' + date.getHours()).slice(-2)
  const mm = ('0' + date.getMinutes()).slice(-2)

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`
}

export { formatDate, formatDateTime }
