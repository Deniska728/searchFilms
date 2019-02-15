import Film from './Film.js'
import SearchForm from './SearchForm'
import '../styles/reset.css'
import '../styles/style.css'
import '../styles/display-2.css'

const searchForm = new SearchForm
searchForm.render()
searchForm.searchFilms()
new Film().renderFilmsToFavorites()