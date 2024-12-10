/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function fetchCities() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data)
    } catch (error) {
      console.log("error", error)
      alert("There was an error fetching data")
    } finally {
      setIsLoading(false)
    }
  }

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data)
    } catch (error) {
      console.log("error", error)
      alert("There was an error fetching data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(function() {
    fetchCities()
  }, [])

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider")
  return context;
}

export { CitiesProvider, useCities }
