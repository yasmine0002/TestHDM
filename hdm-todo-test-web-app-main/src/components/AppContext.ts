import { Context, createContext } from 'react';

export interface AppContextProps {
}

fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Traitez les données reçues
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  });

export const AppContext: Context<AppContextProps> = createContext<AppContextProps>({
});
