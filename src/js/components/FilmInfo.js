import image from '../../img/notfound.png'
import { app } from '../index';
import { removeFromStorage } from '../helper';

export default Vue.component('film-info',{
  props: ['film'],
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
    clickToExit(){
      app.isOpen = true
    },
    insertToStorage(){
      const films = JSON.parse(localStorage.getItem('films') || "[]")
      const currentMovie = films.find(film => film.imdbID === this.film.imdbID)
      this.toggle = !Boolean(currentMovie)
      if(this.toggle){
        films.push(this.film)
        try {
          localStorage.setItem('films', JSON.stringify(films))
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
  <div class="display-2">
    <div class="display-2-header">
      <button class="exit" @click="clickToExit">&#8592;</button>
      <button 
        class="fav" 
        @click="insertToStorage"
        :class="{ 'fav-click' : this.toggle}">♥</button>
    </div>
    <div class="display-2-body">
      <img :src="film.Poster !== 'N/A' ? film.Poster : image" alt="">
      <div class="film-info">
        <h3>{{film.Title}}({{film.Year}})</h3>
        <p class="description"><span class="bold">Description:</span> {{film.Plot}}</p>
        <p class="genre"><span class="bold">Genre:</span> {{film.Genre}}</p>
        <p class="rating"><span class="bold">IMDb rating:</span> {{film.imdbRating}}</p>
      </div> 
    </div>
  </div>
  `
})