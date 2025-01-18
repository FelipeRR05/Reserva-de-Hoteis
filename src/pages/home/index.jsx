import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Header from "../../components/header";
import Hotel from "../../components/hotels";
import styles from "./styles.module.css";
import "react-responsive-modal/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    city: "",
    state: "",
    imageUrl: "",
    rating: 0,
    description: "",
  });

  const [hotels, setHotels] = useState([]);

  function getHotels() {
    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      setHotels(JSON.parse(storedHotels));
    }
  }

  useEffect(() => {
    getHotels();
  }, []);

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

  function createHotel() {
    if (!validateForm()) {
      return;
    }

    const newHotel = {
      id: Date.now(),
      ...formData,
    };

    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));

    setFormData({
      name: "",
      price: "",
      city: "",
      state: "",
      imageUrl: "",
      rating: 0,
      description: "",
    });
    setModalVisible(false);
    alert("Hotel cadastrado com sucesso!");
  }

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortOption === "price") {
      return a.price - b.price;
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2>Hotéis</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={styles.searchBar}
          />
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className={styles.sortSelect}
          >
            <option value="">Ordenar por</option>
            <option value="price">Preço da diária</option>
            <option value="rating">Classificação</option>
          </select>
        </div>
        <div className={styles.container_list}>
          {sortedHotels.length > 0 ? (
            sortedHotels.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />)
          ) : (
            <p>Nenhum hotel encontrado</p>
          )}
        </div>
      </div>
      <button
        className={styles.float_button}
        onClick={() => setModalVisible(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Modal
        center
        open={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className={styles.container_modal}>
          <h3>Cadastrar Hotel</h3>
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
                onClick={() => handleRatingChange(star)}
              >
                <FontAwesomeIcon icon={faStar} />
              </span>
            ))}
          </div>
          <div className={styles.row}>
            <button onClick={createHotel}>Salvar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
