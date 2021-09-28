import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { renderIngredientsCheck, handleDoneRecipes } from '../helper';
import RecipesContext from '../../context/Recipes/RecipesContext';

function ReceitasEmProcesso() {
  const { recipeDetails, fetchRecipeById } = useContext(RecipesContext);
  const { strMeal, strMealThumb, strInstructions, strCategory,
    strDrink, strDrinkThumb } = recipeDetails;
  const history = useHistory();
  const [type, id] = history.location.pathname.split('/').splice(1);

  useEffect(() => {
    const recipeType = type === 'comidas' ? 'meals' : 'drinks';
    fetchRecipeById(recipeType, id);
  }, [history, fetchRecipeById]);

  if (type === 'comidas') {
    return (
      <div>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="foto da comida" />
        <h2 data-testid="recipe-title">
          {strDrink}
        </h2>
        <button
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
          alt="botão compartilhar"
        >
          <img src={ shareIcon } alt="botão de perfil" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeartIcon }
          alt="botão favoritar"
        >
          <img src={ whiteHeartIcon } alt="botão de perfil" />
        </button>
        <h4 data-testid="recipe-category">{ strCategory }</h4>
        { renderIngredientsCheck(recipeDetails) }
        <p data-testid="instructions">{ strInstructions }</p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => handleDoneRecipes(recipeDetails, type) }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="foto da bebida" />
      <h2 data-testid="recipe-title">
        {strMeal}
      </h2>
      <button
        data-testid="share-btn"
        type="button"
        src={ shareIcon }
        alt="botão compartilhar"
      >
        <img src={ shareIcon } alt="botão de perfil" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ whiteHeartIcon }
        alt="botão favoritar"
      >
        <img src={ whiteHeartIcon } alt="botão de perfil" />
      </button>
      <h4 data-testid="recipe-category">{ strCategory }</h4>
      { renderIngredientsCheck(recipeDetails) }
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => handleDoneRecipes(recipeDetails, type) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default ReceitasEmProcesso;