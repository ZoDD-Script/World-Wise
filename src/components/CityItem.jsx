/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import flagemojiToPNG from '../../data/countryFlag';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  function CityItem({ city }) {
  const {currentCity} = useCities();
  const { cityName, emoji, date, id, position } = city
  const {lat, lng} = position;
  const {deleteCity} = useCities()

  async function handleDelete(e) {
    e.preventDefault();

    await deleteCity(id)
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem
