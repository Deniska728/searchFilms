import Api from '../Api';
import { app } from '../index';

export default Vue.component('search-form',{
  data: () => {
    return {
      value: '',
      error: ''
    }
  },
  methods: {
    searchFilms(){
        this.value.toLowerCase()
        if(this.value){
          let valueArray = this.value.split(' ')
          if(valueArray.length > 1){
            let valueStr = valueArray.join('+')
            this.embeded(`?s=${valueStr}`)
          } else {
            this.embeded(`?s=${this.value}`)
          }
        } else {
          console.log('Не введено значение');
        }
    },
    embeded(url){
      app.films = []
      this.error = 'Loading...'
      Api.getFilms(url)
        .then( result => {
          if(result.Response === "False") throw ('Ничего не найдено')
          app.films = result
          this.error = '';
        })
        .catch( error => {
          app.films = []
          this.error = error
        })
    }
  },
  template: `
  <div>
    <form @submit.prevent="searchFilms">
      <input type="search" v-model="value">
      <input type="submit" value="Начать поиск">
    </form>
    <p>{{error}}</p>
  </div>
  `
})