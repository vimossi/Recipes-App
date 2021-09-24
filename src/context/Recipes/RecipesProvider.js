import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import fetchApi from '../../services';

const URL = {
  meals: {
    list: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    byCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  },
  drinks: {
    list: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    byCategory: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  },
};
const CATEGORIES_TO_SHOW = 5;
const RECIPES_TO_SHOW = 12;

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const fetchRecipesCategory = useCallback(async (recipeType) => {
    const data = await fetchApi(URL[recipeType].categories);
    const categoriesList = data[recipeType]
      .filter((recipe) => data[recipeType].indexOf(recipe) < CATEGORIES_TO_SHOW)
      .map(({ strCategory }) => strCategory);
    setCategories(categoriesList);
    setType(recipeType);
  }, []);

  const fetchRecipesList = useCallback(async (recipeType) => {
    const data = await fetchApi(URL[recipeType].list);
    const recipesList = data[recipeType]
      .filter((recipe) => data[recipeType].indexOf(recipe) < RECIPES_TO_SHOW);
    setRecipes(recipesList);
  }, []);

  const fetchRecipesByCategory = async (endPoint) => {
    const data = await fetchApi(`${URL[type].byCategory}${endPoint}`);
    const recipesList = data[type]
      .filter((recipe) => data[type].indexOf(recipe) < RECIPES_TO_SHOW);
    setRecipes(recipesList);
  };

  const handleClickCategory = ({ target }) => {
    if (target.innerText === category || target.innerText === 'All') {
      fetchRecipesList(type);
    } else fetchRecipesByCategory(target.innerText);
    setCategory(target.innerText);
  };

  const context = {
    fetchRecipesCategory,
    handleClickCategory,
    fetchRecipesList,
    categories,
    recipes,
  };

  return (
    <div>
      <RecipesContext.Provider value={ context }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipesProvider;
