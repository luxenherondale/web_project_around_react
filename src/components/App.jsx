import { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  useEffect(() => {
    // Cargar información del usuario al montar el componente
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Error al cargar datos del usuario:", err);
      });
  }, []);

  return (
    <div className="page">
      <Header />
      <Main currentUser={currentUser} onUpdateUser={setCurrentUser} />
      <Footer />
    </div>
  );
}

export default App;
