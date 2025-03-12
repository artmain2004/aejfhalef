
import { create } from 'zustand';

// Create Zustand store
export const useClientSecretStore = create((set) => ({
  clientSecret: '',

  setClientSecret: (newSecret) => set({ clientSecret: newSecret })
}));

