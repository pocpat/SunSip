import type { NextApiRequest, NextApiResponse } from 'next'
import type { CocktailData } from '../../utils/cocktailTypes'

interface ApiResponse {
  drinks: CocktailData[]
}

export default async function handlerCocktail(
  req: NextApiRequest,
  res: NextApiResponse<CocktailData | { message: string }>,
) {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = (await response.json()) as ApiResponse
    if (!data.drinks || data.drinks.length === 0) {
      throw new Error('No drinks found')
    }

    const cocktailData = data.drinks[0]

    if (cocktailData) {
      const cocktail: CocktailData = {
        idDrink: cocktailData.idDrink,
        strDrink: cocktailData.strDrink,
        strGlass: cocktailData.strGlass,
        strInstructions: cocktailData.strInstructions,
        strDrinkThumb: cocktailData.strDrinkThumb,
        strIngredient1: cocktailData.strIngredient1,
        strIngredient2: cocktailData.strIngredient2,
        strIngredient3: cocktailData.strIngredient3,
        strIngredient4: cocktailData.strIngredient4,
        strIngredient5: cocktailData.strIngredient5,
        strIngredient6: cocktailData.strIngredient6,
      }

      res.status(200).json(cocktail)
      console.log('cocktail ive got from API is', cocktail)
    } else {
      throw new Error('No cocktail data found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error fetching data from API',
    })
  }
}
