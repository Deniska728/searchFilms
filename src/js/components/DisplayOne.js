import ListFilms from './ListFilms';
import SearchForm from './SearchForm';

export default Vue.component('display-one',{
  components: {
    ListFilms,
    SearchForm
  },

  props: ['films'],
  template: `
    <div class="display-1">
      <search-form></search-form>
      <list-films
        :films="films"
        ></list-films>
    </div>
  `
})