import styles from './CityItem.module.css'
import PropTypes from 'prop-types'

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  // Prop validation
CityItem.propTypes = {
  city: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure each city has an id of type number
    name: PropTypes.string.isRequired, // Add other properties as needed
    emoji: PropTypes.string.isRequired, // Add other properties as needed
    date: PropTypes.string.isRequired, // Add other properties as needed
  })).isRequired,
};


function CityItem({ city }) {
  const { cityName, emoji, date } = city
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  )
}

export default CityItem
