import fetch from 'isomorphic-unfetch'

import 'bootstrap/scss/bootstrap.scss'
import '../styles.scss'

import Weather from '../components/Weather'

const Index = (props) => (
  <div className='container-fluid'>
    <div className='row'>
      {
        props.weather.map((loc) => (
          <div className={`col-sm-${12 / props.weather.length} card text-center`} key={loc.name}>
            <h1>{loc.name}</h1>
            <Weather weather={loc} key={loc.name} />
          </div>
        ))
      }
    </div>
  </div>
)

Index.getInitialProps = async function () {
  const weather = []
  const locations = [
    {
      name: 'Jacksonville',
      lat: 30.3449153,
      lon: -81.8231905
    },
    {
      name: 'New York',
      lat: 40.6974034,
      lon: -74.1197636
    },
    {
      name: 'London',
      lat: 51.5285582,
      lon: -0.2416799
    },
    {
      name: 'San Francisco',
      lat: 37.7576948,
      lon: -122.4726194
    }
  ]

  for (let loc of locations) {
    const res = await fetch(`https://api.darksky.net/forecast/4297a2db151f52373ca825c4248beba1/${loc.lat},${loc.lon}`)
    const data = await res.json()

    weather.push({
      ...loc,
      data
    })
  }
  return { weather }
}

export default Index
