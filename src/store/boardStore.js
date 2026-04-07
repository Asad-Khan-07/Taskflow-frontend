import { create } from 'zustand';
import { boardsAPI, listsAPI, cardsAPI } from '../services/api';

const useBoardStore = create((set, get) => ({
  boards: [],
  currentBoard: null,
  lists: [],
  cards: [],
  loading: false,
  error: null,

  // Boards
  fetchBoards: async () => {
    set({ loading: true });
    try {
      const { data } = await boardsAPI.getAll();
      set({ boards: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBoard: async (id) => {
    set({ loading: true });
    try {
      const { data } = await boardsAPI.getOne(id);
      set({ currentBoard: data.board, lists: data.lists, cards: data.cards, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createBoard: async (boardData) => {
    try {
      const { data } = await boardsAPI.create(boardData);
      set((state) => ({ boards: [data, ...state.boards] }));
      return data;
    } catch (err) {
      throw err;
    }
  },

  updateBoard: async (id, updates) => {
    try {
      const { data } = await boardsAPI.update(id, updates);
      set((state) => ({
        boards: state.boards.map(b => b._id === id ? data : b),
        currentBoard: state.currentBoard?._id === id ? data : state.currentBoard,
      }));
    } catch (err) { throw err; }
  },

  deleteBoard: async (id) => {
    try {
      await boardsAPI.delete(id);
      set((state) => ({ boards: state.boards.filter(b => b._id !== id) }));
    } catch (err) { throw err; }
  },

  // Lists
  createList: async (title, boardId) => {
    try {
      const { data } = await listsAPI.create({ title, boardId });
      set((state) => ({ lists: [...state.lists, data] }));
      return data;
    } catch (err) { throw err; }
  },

  updateList: async (id, updates) => {
    try {
      const { data } = await listsAPI.update(id, updates);
      set((state) => ({ lists: state.lists.map(l => l._id === id ? data : l) }));
    } catch (err) { throw err; }
  },

  deleteList: async (id) => {
    try {
      await listsAPI.delete(id);
      set((state) => ({
        lists: state.lists.filter(l => l._id !== id),
        cards: state.cards.filter(c => c.list !== id),
      }));
    } catch (err) { throw err; }
  },

  // Cards
  createCard: async (title, listId, boardId) => {
    try {
      const { data } = await cardsAPI.create({ title, listId, boardId });
      set((state) => ({ cards: [...state.cards, data] }));
      return data;
    } catch (err) { throw err; }
  },

  updateCard: async (id, updates) => {
    try {
      const { data } = await cardsAPI.update(id, updates);
      set((state) => ({ cards: state.cards.map(c => c._id === id ? data : c) }));
      return data;
    } catch (err) { throw err; }
  },

  deleteCard: async (id) => {
    try {
      await cardsAPI.delete(id);
      set((state) => ({ cards: state.cards.filter(c => c._id !== id) }));
    } catch (err) { throw err; }
  },

  // Local optimistic card move
  moveCardLocally: (cardId, newListId, newPosition) => {
    set((state) => ({
      cards: state.cards.map(c =>
        c._id === cardId ? { ...c, list: newListId, position: newPosition } : c
      )
    }));
  },

  setLists: (lists) => set({ lists }),
  setCards: (cards) => set({ cards }),
}));

export default useBoardStore;
