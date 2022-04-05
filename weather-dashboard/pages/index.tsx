import format from 'date-fns/format'
import type { NextPage } from 'next'
import Head from 'next/head'
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

function WindspeedIcon() {
  return (
    <svg x="0px" y="0px" viewBox="0 0 42 42">
      <polygon
        fill="black"
        points="27,37.5 42,20 27,4.5 18,4.5 30,16.5 0,16.5 0,23.5 30,23.5 18,37.5 "
      />
    </svg>
  )
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
        <div className="mx-auto max-w-4xl px-8">
          <ul className="divide-y">
            {weatherData.map((datum) => {
              const parsedDate = format(
                new Date(datum.date * 1000),
                'dd/MM/yyyy'
              )
              return (
                <li className="py-8">
                  <div className="flex items-center justify-between">
                    <p>{parsedDate}</p>
                    <p className="text-3xl">{datum.icon}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-medium">{datum.max}°</span>
                      <span>/</span>
                      <span className="opacity-100">{datum.min}°</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 transform"
                        style={{
                          transform: `rotate(${datum.windDirection}deg)`,
                        }}
                      >
                        <WindspeedIcon />
                      </div>
                      <p>{datum.windSpeed} km/h</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Home
