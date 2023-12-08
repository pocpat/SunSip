import type { CocktailData } from '~/utils/cocktailTypes'


export const fetchCocktailData = (location: string) => {
    return new Promise<CocktailData>((resolve, reject) => {
      if(location.trim() !== ''){
        fetch('/api/cocktail1')
          .then((response) => response.json())
          .then((data: CocktailData) => {
            resolve(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            reject(error);
          });
      }
    });
  };