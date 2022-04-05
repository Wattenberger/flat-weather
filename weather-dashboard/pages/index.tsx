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
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}

const maxWindSpeed = 6
const Home: NextPage = () => {
  const weatherData = data as WeatherDatum[]
  const minTemp = Math.min(...weatherData.map(d => d.min))
  const maxTemp = Math.max(...weatherData.map(d => d.max))

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
                'EEE MMMM d, yyyy'
              )
              return (
                <li className="py-8">
                  <div className="flex items-center justify-between">
                    <p className="w-60">{parsedDate}</p>
                    <p className="text-3xl">{datum.icon}</p>
                    <div className="relative w-32 text-center">
                      <span className="text-xl font-medium">{datum.temp}</span><span className="text-xl font-light text-slate-500">°C</span>
                      <div className="w-full absolute -bottom-3 bg-slate-300 h-1 rounded-full transform translate-y-1/2" style={{
                        left: `${(datum.min - minTemp) / (maxTemp - minTemp) * 100}%`,
                        width: `${(datum.max - datum.min) / (maxTemp - minTemp) * 100}%`,
                      }}>
                      </div>
                      <div className="absolute -bottom-3 h-3 w-3 border-white border-2 rounded-full bg-indigo-500 z-10 transform translate-y-1/2 -translate-x-1/2" style={{
                        left: `${(datum.temp - minTemp) / (maxTemp - minTemp) * 100}%`,
                      }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 transform text-slate-900"
                        style={{
                          opacity: datum.windSpeed / maxWindSpeed,
                          transform: `rotate(${datum.windDirection}deg)`,
                        }}
                      >
                        <WindspeedIcon />
                      </div>
                      <p className="font-mono">{datum.windSpeed} km/h</p>
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
