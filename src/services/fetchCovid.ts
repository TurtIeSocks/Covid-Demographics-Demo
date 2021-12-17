/* eslint-disable no-console */
import { Covid19 } from '@assets/types'

export default async function fetchData(): Promise<Covid19> {
  try {
    const response = await fetch(
      'https://coronavirus-19-api.herokuapp.com/countries/usa',
    )
    if (!response.ok) {
      throw new Error('Unable to Fetch Covid Data')
    }
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e.message)
    return {}
  }
}
