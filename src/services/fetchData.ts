/* eslint-disable no-console */
import { Data } from '@assets/types'

export default async function fetchData(): Promise<Data[]> {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('Unable to Fetch Data')
    }
    const data: Data[] = await response.json()
    return data
  } catch (e) {
    console.log(e.message)
    return []
  }
}
