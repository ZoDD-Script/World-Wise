import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import PropTypes from 'prop-types'

// Prop validation
CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure each city has an id of type number
  })).isRequired,
  isLoading: PropTypes.bool.isRequired, // Ensure isLoading is a boolean
};

function CityList({cities, isLoading}) {
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}

export default CityList
