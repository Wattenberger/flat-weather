import type { NextPage } from 'next'
import Head from 'next/head'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import data from '../../data-processed.json'

interface WeatherDatum {
  date: number
  clouds: number
  feelsLike: number
  humidity: number
  icon: string
  max: number
  min: number
  pressure: number
  sunrise: number
  sunset: number
  temp: number
  windDirection: number
  windGust: number
  windSpeed: number
}

const Home: NextPage = () => {
  const weatherData = data as WeatherDatum[]
  console.log(weatherData)

  return (
    <>
      <Head>
        <title>Weather Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto max-w-2xl px-8">
          <ul className="divide-y">
            {weatherData.map((datum) => {
              const parsedDate = format(new Date(datum.date * 1000), 'PP pp')
              return <li className="py-8">{parsedDate}</li>
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Home
