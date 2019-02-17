import Api from './Api'
import { removeFromStorage, createFilm } from './helper';
import image from '../img/notfound.png'

export const FilmItem = Vue.component('film-item', {
  props: ['film', 'image'],
  data: () => {
    return {
      toggle: false
    }
  },
  created: function () {
    const films = JSON.parse(localStorage.getItem('films') || "[]")
    const currentMovie = films.find(film => film.imdbID === this.film.imdbID)
    this.toggle = Boolean(currentMovie)
  },
  methods: {
    openFilm(e){
      e.preventDefault()
      Api.getFilms(`?i=${this.film.imdbID}`)
      .then( result => {
        createFilm(result)
        document.querySelector('.display-1').style.display = 'none'
        document.querySelector('.display-2').style.display = 'block'
      })
    },
    insertToStorage(){
      const films = JSON.parse(localStorage.getItem('films') || "[]")
      const currentMovie = films.find(film => film.imdbID === this.film.imdbID)
      this.toggle = !Boolean(currentMovie)
      if(this.toggle){
        films.push(this.film)
        try {
          localStorage.setItem('films', JSON.stringify(films))
          renderFilmsToFavorites()
        } catch (error) {
          console.log(error);
          alert('Память заполнена.')
        }
        return
      }
      removeFromStorage(null, this.film.imdbID)
    }
  },
  template: `
  <div class="list-item" :id="film.imdbID">
    <img :src="film.Poster !== 'N/A' ? film.Poster : image" alt>
    <a href="#" @click="openFilm">Узнать больше</a>
    <button 
      class="fav" 
      :id="film.imdbID"
      :class="{ 'fav-click' : this.toggle}" alt
      @click="insertToStorage">♥</button>
    <p>{{ film.Title }}</p>
  </div>`
})
