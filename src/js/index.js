import Film from './Film.js';
import SearchForm from './SearchForm';

const searchForm = new SearchForm
searchForm.render()
searchForm.searchFilms()
new Film().renderFilmsToFavorites()