import styles from "./CountryItem.module.css";
import PropTypes from 'prop-types'

// Prop validation
CountryItem.propTypes = {
  country: PropTypes.arrayOf(PropTypes.shape({
    emoji: PropTypes.number.isRequired, // Ensure each city has an id of type number
    country: PropTypes.number.isRequired, // Ensure each city has an id of type number
  })).isRequired,
  isLoading: PropTypes.bool.isRequired, // Ensure isLoading is a boolean
};

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
