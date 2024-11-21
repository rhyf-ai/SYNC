// app/stores/showChatStore.js
import { create } from 'zustand';

export const useShowChatStore = create((set) => ({
  isShow: true,
  isMinimized: false,
  setIsShow: (value) => set({ isShow: value }),
  setIsMinimized: (value) => set({ isMinimized: value }),
}));
