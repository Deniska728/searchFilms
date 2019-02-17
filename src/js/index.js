import SearchForm from './SearchForm'
import { renderFilmsToFavorites } from './helper';
import { FilmItem } from './FilmItem'
import image from '../img/notfound.png'
import '../styles/reset.css'
import '../styles/style.css'
import '../styles/display-2.css'

export const app = new Vue({
  el: '#app',
  data: {
    films: [],
    image: image
  },
  components: {
    'film-item': FilmItem
  }
})

const searchForm = new SearchForm
searchForm.render()
searchForm.searchFilms()
renderFilmsToFavorites()
