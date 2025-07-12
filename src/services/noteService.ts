import axios from 'axios'; 
import type { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api'; // Це база для Axios
const NOTES_ENDPOINT = '/notes'; // Це шлях, який додається до baseURL

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
console.log("VITE_NOTEHUB_TOKEN:", token);

if (!token) {
  // Цей console.error спрацює, якщо токен не знайдено
  console.error("Помилка: VITE_NOTEHUB_TOKEN не встановлений. Будь ласка, переконайтеся, що ви додали його до файлу .env і перезапустили сервер розробки.");
  // Можна навіть викинути помилку, щоб зупинити ініціалізацію, якщо токен є обов'язковим.
  // throw new Error("Токен авторизації відсутній!");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // !!! Переконайтеся, що `token` НЕ є `undefined` тут, інакше заголовок буде "Bearer undefined" !!!
    Authorization: token ? `Bearer ${token}` : '', // Заголовок буде встановлений, тільки якщо токен існує
  },
});

// Інтерфейси залишаємо як є, вони правильні
export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes: number;
}

export interface ErrorResponse {
  message: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  // Умовне додавання `search`
  if (search) {
    params.search = search;
  }

  try {
    const response = await axiosInstance.get<FetchNotesResponse>(NOTES_ENDPOINT, {
      params: params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Помилка Axios під час fetchNotes:", error.response?.data || error.message);
      // !!! ВАЖЛИВО: Кидаємо ОРИГІНАЛЬНУ AxiosError !!!
      throw error;
    } else {
      console.error("Невідома помилка під час fetchNotes:", error);
      throw new Error("Невідома помилка під час отримання нотаток");
    }
  }
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: Note['tag'];
}): Promise<Note> => {
  try {
    const response = await axiosInstance.post<Note>(NOTES_ENDPOINT, note);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Помилка Axios під час createNote:", error.response?.data || error.message);
      throw error; // Кидаємо оригінальну AxiosError
    } else {
      console.error("Невідома помилка під час createNote:", error);
      throw new Error("Невідома помилка під час створення нотатки");
    }
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axiosInstance.delete<Note>(`${NOTES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Помилка Axios під час deleteNote:", error.response?.data || error.message);
      throw error; // Кидаємо оригінальну AxiosError
    } else {
      console.error("Невідома помилка під час deleteNote:", error);
      throw new Error("Невідома помилка під час видалення нотатки");
    }
  }
};