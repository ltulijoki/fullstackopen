import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, setSearch }) => (
  <div>
    {country.name.common}
    <button onClick={() => { setSearch(country.name.common) } }>show</button>
  </div>
)

const ShowCountries = ({ search, setSearch, countries }) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filtered.length === 1) {
    const country = filtered[0]
    const imageUrl = country.flags.svg
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>populaton {country.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.keys(country.languages).map(key =>
            <li>{country.languages[key]}</li>
          )}
        </ul>
        <img src={imageUrl} alt="" height="100" />
      </div>
    )
  }

  return (
    <div>
      {filtered.map(country => 
        <Country country={country} setSearch={setSearch} key={country.name.common} />
      )}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries
      <input value={search} onChange={(event) => {setSearch(event.target.value)}} />
      <ShowCountries countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App