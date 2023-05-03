/** 指定したミリ秒間待つ */
export const sleep = async (msec: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), msec)
  })
}

/** keyが重複した要素を削除して返す、残す要素は先頭に近い要素 */
export const unique = <T>(
  values: T[],
  toKey: (value: T) => string | number,
) => {
  const uniqueValues: T[] = []
  const knownKeys: Set<string | number> = new Set()

  for (const value of values) {
    const key = toKey(value)
    if (!knownKeys.has(key)) {
      uniqueValues.push(value)
      knownKeys.add(key)
    }
  }

  return uniqueValues
}
