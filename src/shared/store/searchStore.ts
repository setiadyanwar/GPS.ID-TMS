/**
 * Global search store menggunakan Zustand.
 * Digunakan oleh HeaderSearch (writer) dan halaman yang butuh filter data (reader).
 *
 * Aturan: Hanya berisi state & setter. Tidak ada logika filter di sini.
 */
import { create } from 'zustand';

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: '' }),
}));
