// src/UserContext.js
import { createContext } from 'react';

// Create the context (we export both context and provider/consumer)
export const UserContext = createContext(null);

// Optional: named export for better readability
// export const UserProvider = UserContext.Provider;
// export const UserConsumer = UserContext.Consumer;
