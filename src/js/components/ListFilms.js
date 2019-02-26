import FilmItem from './FilmItem';

export default Vue.component('list-films',{
  components: {
    FilmItem
  },
  props: ['films'],
  template: `
    <div class="list-films">
      <film-item
      v-for="film in films"
      :key="film.imdbID"
      :film="film"></film-item>
    </div>
  `
})