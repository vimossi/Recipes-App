import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ExploreIngredientCards({ recipe, index, type }) {
  const name = `str${type}`;
  const src = `str${type}Thumb`;
  const pathname = type === 'Meal' ? '/comidas' : '/bebidas';
  const id = `id${type}`;
  return (
    <Link
      to={ `${pathname}/${recipe[id]}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img data-testid={ `${index}-card-img` } src={ recipe[src] } alt={ recipe[name] } />
      <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
    </Link>
  );
}

ExploreIngredientCards.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ExploreIngredientCards;
