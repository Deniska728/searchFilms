import Api from './Api.js'
import { createList, textError, filmContainer } from './helper.js'

export default class SearchForm {
  
  embeded(url){
    Api.getFilms(url)
      .then( result => {
        if(result.Response === "False") throw ('Ничего не найдено')
        textError.innerHTML = ''
        createList(result)
      })
      .catch( error => {
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