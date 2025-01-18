import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

export default function Hotel({ hotel }) {
  return (
    <Link to={`/details/${hotel.id}`} className={styles.card}>
      <div className={styles.cardContent}>
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className={styles.hotelImage}
        />
        <div className={styles.cardInformations}>
          <h3>{hotel.name}</h3>
          <p>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
            {hotel.city}, {hotel.state}
          </p>
          <p className={styles.price}>R$ {hotel.price}</p>
        </div>
      </div>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={
              star <= hotel.rating ? styles.filledStar : styles.emptyStar
            }
          />
        ))}
      </div>
    </Link>
  );
}
