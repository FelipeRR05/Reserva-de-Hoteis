import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    city: "",
    state: "",
    imageUrl: "",
    rating: 0,
    description: "",
  });

  function getHotelDetails() {
    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      const hotels = JSON.parse(storedHotels);
      const selectedHotel = hotels.find((hotel) => hotel.id === parseInt(id));
      if (selectedHotel) {
        setHotelDetails(selectedHotel);
        setFormData(selectedHotel);
      }
    }
  }

  useEffect(() => {
    getHotelDetails();
  }, [id]);

  function validateForm() {
    const { name, price, city, state, imageUrl, rating, description } =
      formData;

    if (
      !name ||
      !price ||
      !city ||
      !state ||
      !imageUrl ||
      rating === 0 ||
      !description
    ) {
      alert("Erro ao cadastrar hotel! Por favor, preencha todos os campos.");
      return false;
    }

    if (parseFloat(price) <= 0) {
      alert("O preço da diária deve ser um valor positivo.");
      return false;
    }

    return true;
  }

  function updateHotel() {
    if (!validateForm()) return;

    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      const hotels = JSON.parse(storedHotels);
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === parseInt(id) ? { ...hotel, ...formData } : hotel
      );
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
      setHotelDetails({ ...hotelDetails, ...formData });
      setModalVisible(false);
      alert("Hotel atualizado com sucesso!");
    }
  }

  function deleteHotel() {
    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      const hotels = JSON.parse(storedHotels);
      const updatedHotels = hotels.filter((hotel) => hotel.id !== parseInt(id));
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
      alert("Hotel excluído com sucesso!");
      navigate("/");
    }
  }

  if (!hotelDetails) {
    return (
      <div className={styles.container}>
        <Header />
        <p className={styles.content}>Hotel não encontrado!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.imageGallery}>
          <img
            src={hotelDetails.imageUrl}
            alt={hotelDetails.name}
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <p>{hotelDetails.name}</p>
          <p>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
            {hotelDetails.city}, {hotelDetails.state}
          </p>
          <p>Diária: R$ {hotelDetails.price}</p>
          <p>
            Descrição, itens e serviços oferecidos: {hotelDetails.description}
          </p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={
                  star <= hotelDetails.rating
                    ? styles.filledStar
                    : styles.emptyStar
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.float_button}
          onClick={() => setModalVisible(true)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className={styles.float_button} onClick={deleteHotel}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <Modal
        center
        open={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className={styles.container_modal}>
          <h3>Editar Hotel</h3>
          <input
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            placeholder="Nome do hotel"
          />
          <div className={styles.row}>
            <input
              type="number"
              placeholder="Preço da diária"
              value={formData.price}
              onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
            />
            <input
              placeholder="Cidade"
              value={formData.city}
              onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }
            />
          </div>
          <input
            placeholder="Estado"
            value={formData.state}
            onChange={(event) =>
              setFormData({ ...formData, state: event.target.value })
            }
          />
          <input
            type="url"
            placeholder="URL da imagem"
            value={formData.imageUrl}
            onChange={(event) =>
              setFormData({ ...formData, imageUrl: event.target.value })
            }
          />
          <textarea
            placeholder="Descrição do hotel, itens e serviços oferecidos"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          ></textarea>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= formData.rating ? styles.filledStar : styles.emptyStar
                }
                onClick={() => setFormData({ ...formData, rating: star })}
              >
                <FontAwesomeIcon icon={faStar} />
              </span>
            ))}
          </div>
          <div className={styles.row}>
            <button onClick={updateHotel}>Salvar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
