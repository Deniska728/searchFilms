import Api from './Api';
import { removeFromStorage, createFilm } from './helper';
import image from '../img/notfound.png'

export default class Film{
  constructor(options){
    this.options = options
    this.favorite = false
    this.favorites = document.querySelector('.favorites')
    this.removeFromStorage = removeFromStorage
    this.storageData = JSON.parse(localStorage.getItem('films') || "[]")
  }

  openFilm(e, imdbID){
    e.preventDefault()
    Api.getFilms(`?i=${imdbID}`)
    .then( result => {
      createFilm(result)
      document.querySelector('.display-1').style.display = 'none'
      document.querySelector('.display-2').style.display = 'block'
    })
  }

  render(film, callback){
    const { Poster, imdbID, Title, Year } = film || this.options
    const itemFilm = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('p')
    const a = document.createElement('a')
    const fav = document.createElement('button')

    this.storageData.map( film => {
      if(film['imdbID'] == imdbID){
        fav.classList.add('fav-click')
      }
    }) 
    
    fav.dataset.id = imdbID
    fav.innerHTML = '♥'
    fav.classList.add('fav')
    fav.classList.add('fav-click')
    fav.addEventListener('click', e => callback(e, imdbID) )
    a.href = '#'
    a.innerHTML = 'Узнать больше'
    a.addEventListener('click', e => this.openFilm(e, imdbID))
    img.alt = ''
    img.src = Poster !== 'N/A' ? Poster : image
    title.innerHTML = `${Title}(${Year})`
    itemFilm.classList.add('list-item')
    itemFilm.dataset.idFilm = imdbID
    itemFilm.appendChild(img)
    itemFilm.appendChild(a)
    itemFilm.appendChild(fav)
    itemFilm.appendChild(title)

    return itemFilm
  }
}
