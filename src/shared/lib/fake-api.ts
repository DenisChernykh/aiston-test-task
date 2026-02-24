function cloneData<T>(data: T): T {
  return structuredClone(data)
}

export function resolveWithDelay<T>(data: T, delayMs = 250): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(cloneData(data))
    }, delayMs)
  })
}

export function rejectWithDelay<TError>(error: TError, delayMs = 250): Promise<never> {
  return new Promise((_, reject) => {
    window.setTimeout(() => {
      reject(cloneData(error))
    }, delayMs)
  })
}
