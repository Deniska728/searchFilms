import Api from './Api.js'
import { textError, filmContainer } from './helper.js'
import { app } from './index';

export default class SearchForm {
  embeded(url){
    app.films = []
    textError.innerHTML = 'Loading...'
    Api.getFilms(url)
      .then( result => {
        if(result.Response === "False") throw ('Ничего не найдено')
        app.films = result
        textError.innerHTML = ''
      })
      .catch( error => {
        app.films = []
        filmContainer.innerHTML = ''
        textError.innerHTML = error
      })
  }

  searchFilms(){
    document.querySelector('form').onsubmit = e => {
      e.preventDefault()
      const value = document.querySelector('[type="search"]').value.trim()
      value.toLowerCase()

      if(value){
        let valueArray = value.split(' ')
        if(valueArray.length > 1){
          let valueStr = valueArray.join('+')
          this.embeded(`?s=${valueStr}`)
        } else {
          this.embeded(`?s=${value}`)
        }
      } else {
        console.log('Не введено значение');
      }
    }
  }

  render(){
    return `
    <form>
        <input type="search">
        <input type="submit" value="Начать поиск">
    </form>
    `
  }
}

