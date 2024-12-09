import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import PropTypes from 'prop-types'

// Prop validation
CountryList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure each city has an id of type number
  })).isRequired,
  isLoading: PropTypes.bool.isRequired, // Ensure isLoading is a boolean
};

function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  const countries = cities.reduce((arr, city) => {
    if(!arr.map(el => el.contry).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else return arr
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  )
}

export default CountryList
