import Film from './Film';

export let filmContainer = document.querySelector('.list-films')
export const textError = document.querySelector('.display-1 > p')

const img = document.querySelector('.display-2-body > img')
const p = document.querySelector('.display-2-body p')
const h3 = document.querySelector('.display-2-body h3')
const genre = document.querySelector('.display-2-body .genre')
const rating = document.querySelector('.rating')
const header = document.querySelector('.display-2-header')
const buttonExit = document.querySelector('.exit')


export const createList = array => {
  filmContainer.innerHTML = ''
  array.map( item => {
    filmContainer.appendChild(new Film(item).render())
  })
}

export const createFilm = options => {
  const { Poster, Title, Year, Plot, Genre, imdbRating } = options
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  const buttonFav = document.querySelector('.display-2-header button.fav')
  buttonFav ? header.removeChild(buttonFav) : ''

  const favor = document.createElement('button')
  favor.classList.add('fav')
  favor.innerHTML = '♥'
  favor.addEventListener('click', e => insertToStorage(options))
  films.map( film => {
    if(film['imdbID'] == options.imdbID){
      favor.classList.add('fav-click')
    }
  }) 
  header.appendChild(favor)
  img.src = Poster !== 'N/A' ? Poster : './img/notfound.png'
  p.innerHTML = `<span class="bold">Description:</span> ${Plot}`
  h3.innerHTML = `${Title}(${Year})`
  genre.innerHTML = `<span class="bold">Genre:</span> ${Genre}`
  rating.innerHTML = `<span class="bold">IMDb rating:</span> ${imdbRating}`
}

export const clickToExit = () => {
  document.querySelector('.display-1').style.display = 'block'
  document.querySelector('.display-2').style.display = 'none'
}
buttonExit.addEventListener('click', clickToExit)

export function removeFromStorage(e, imdbID){
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  films.map( film => {
    if(film['imdbID'] == imdbID){
      films.splice(films.indexOf(film), 1)
    }
  })
  localStorage.setItem('films', JSON.stringify(films))
  new Film().renderFilmsToFavorites()
}

const insertToStorage = options => {
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  const button = document.querySelector(`.list-films .fav[data-id="${options.imdbID}"]`)
  const buttonFav = document.querySelector(`.favorites .fav[data-id="${options.imdbID}"]`)
  const d2Button = document.querySelector('.display-2 .fav')
  for(let film of films){
    if(film['imdbID'] == options.imdbID){
      removeFromStorage(null, options.imdbID)
      button !== null ? button.classList.remove('fav-click') : ''
      d2Button !== null ? d2Button.classList.remove('fav-click') : ''
      buttonFav.classList.remove('fav-click')
      return
    }
  }
  films.push(options)
  try {
    localStorage.setItem('films', JSON.stringify(films))
    button !== null ? button.classList.add('fav-click') : ''
    d2Button.classList.add('fav-click')
    new Film().renderFilmsToFavorites()
  } catch (error) {
    alert('Память заполнена.')
  }
}

