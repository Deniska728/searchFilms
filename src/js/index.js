import FilmInfo from './components/FilmInfo'
import DisplayOne from './components/DisplayOne'
import '../styles/reset.css'
import '../styles/style.css'
import '../styles/display-2.css'

export const app = new Vue({
  el: '#app',
  data: {
    films: [],
    filmInfo: [],
    isOpen: true
  },
  components: {
    DisplayOne,
    FilmInfo
  },
})