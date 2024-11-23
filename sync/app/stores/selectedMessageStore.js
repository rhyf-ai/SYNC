// app/stores/selectedMessageStore.js

import { create } from "zustand";

export const useSelectedMessageStore = create((set) => ({
    selectedMessage: null,
    setSelectedMessage: (message) => set({ selectedMessage: message }),
}));
