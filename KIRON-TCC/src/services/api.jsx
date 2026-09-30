import axios from "axios";

const api = axios.create({
    baseURL: "https://api.example.com", // NÃO ESQUEÇA DE ALTERAR PARA A URL DA API 
   timeout: 10000, 
});

export default api;