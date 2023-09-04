import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'
let firstrender = true;
axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();
  const [property, setproperty] = useState([]);
  const [propCategories, setpropCategories] = useState([]);
  const [PropertyImage, setPropertyImage] = useState([]);
  const [selectedPropCategory, setSelectedPropCategory] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const navigate = useNavigate();
  const getUserRequest = async () => {
    await axios
      .get("http://localhost:5000/api/test", {
        withCredentials: true,
      }).then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 403) {
            message.error("Authorized token expired, please login again");
            navigate('/login')
          } else if (error.response.status === 401) {
            message.error("Token is not atteched with header");
            navigate('/login')
          }
        }
      });

  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/getAllProperty').then(response => {
      setproperty(response.data);
    });
    axios.get('http://localhost:5000/api/getPropertyCat').then(response => {
      setpropCategories(response.data);
    });
    axios.get('http://localhost:5000/api/getImages').then(response => {
      setPropertyImage(response.data);
    });

  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedPropCategory(categoryId);
    console.log(selectedPropCategory);
  };
  const handleHotelSelect = (hotelId) => {
    setSelectedProperty(hotelId);
    console.log(selectedProperty);
  };
  const filteredHotels = selectedPropCategory
    ? property.filter(hotel => hotel.category === selectedPropCategory)
    : property;

  const filteredPropImages = selectedProperty
    ? PropertyImage.filter(propertyImage => propertyImage.hotelId === selectedProperty)
    : PropertyImage;

  useEffect(() => {
    if (firstrender) {
      getUserRequest();
      firstrender = false;
    }
  }, [])

  function arrayBufferToBase64(buffer) {
    const binary = new Uint8Array(buffer).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return btoa(binary);
  }

  return (
    <>
      <div>
        <h1>Name: {user && user.name}</h1>
      </div>

      <div>
        <h2>Categories</h2>
        <ul>
          {propCategories.map(category => (
            <li><Link
              key={category._id}
              onClick={() => { handleCategorySelect(category._id); }}
            >
              {category.name}
            </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Hotels</h2>
        <ul>
          {filteredHotels.map(hotel => (
            <li>
              <Link key={hotel._id}
                onClick={() => { handleHotelSelect(hotel._id); }}>
                <h3>{hotel.name}</h3>
                <p>{hotel.address}</p>
                <p>{hotel.description}</p>
              </Link>
              
            </li>
          ))}
          <li>
            {filteredPropImages.map(image => (
              <li>
                <img
                  src={`data:image/jpeg;base64,${arrayBufferToBase64(image.image.data.data)}`}
                  alt="images"
                  id='image1'
                />
              </li>
            ))}
          </li>
        </ul>
      </div>
    </>
  )

}

export default Home
