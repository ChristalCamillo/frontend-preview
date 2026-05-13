import axios from 'axios';

/**
 * Instância configurada do Axios para comunicação com a API do Bootcamp.
 * Centraliza a URL base e interceptadores, facilitando a manutenção e reutilização em toda a aplicação.
 */
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});