let filmContainer = document.querySelector('.list-films')
let favoritesContainer = document.querySelector('.favorites')
const img = document.querySelector('.display-2-body > img')
const p = document.querySelector('.display-2-body p')
const h3 = document.querySelector('.display-2-body h3')
const genre = document.querySelector('.display-2-body .genre')
const rating = document.querySelector('.rating')
const textError = document.querySelector('.display-1 > p')
const header = document.querySelector('.display-2-header')
const buttonExit = document.querySelector('.exit')

const createList = array => {
  filmContainer.innerHTML = ''

  array.map( item => {
    filmContainer.appendChild(new Film(item).render())
  })
}

const createFilm = options => {
  const { Poster, Title, Year, Plot, Genre, imdbRating } = options

  const buttonFav = document.querySelector('button.fav')
  console.log(buttonFav);
  buttonFav ? header.removeChild(buttonFav) : ''

  const favor = document.createElement('button')
  favor.classList.add('fav')
  favor.innerHTML = 'Добавить в избранное'
  favor.addEventListener('click', e => insertToStorage(options))
  header.appendChild(favor)
  img.src = Poster !== 'N/A' ? Poster : './img/notfound.png'
  p.innerHTML = `<span class="bold">Description:</span> ${Plot}`
  h3.innerHTML = `${Title}(${Year})`
  genre.innerHTML = `<span class="bold">Genre:</span> ${Genre}`
  rating.innerHTML = `<span class="bold">IMDb rating:</span> ${imdbRating}`
}

const clickToExit = () => {
  document.querySelector('.display-1').style.display = 'block'
  document.querySelector('.display-2').style.display = 'none'
}
buttonExit.addEventListener('click', clickToExit)

function renderFilmsToFavorites(){
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  favoritesContainer.innerHTML = ''
  for(let film of films){
    const itemFilm = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('p')
    const a = document.createElement('a')
    const fav = document.createElement('div')

    fav.dataset.id = film.imdbID
    fav.addEventListener('click', e => removeFromStorage(e, film.imdbID))
    a.href = '#'
    a.innerHTML = 'Узнать больше'
    a.addEventListener('click', e => openFilm(e, film.imdbID))
    img.alt = ''
    img.src = film.Poster !== 'N/A' ? film.Poster : './img/notfound.png'
    title.innerHTML = `${film.Title}(${film.Year})`
    itemFilm.classList.add('list-item')
    itemFilm.dataset.idFilm = film.imdbID
    itemFilm.appendChild(img)
    itemFilm.appendChild(a)
    itemFilm.appendChild(fav)
    itemFilm.appendChild(title)
    favoritesContainer.appendChild(itemFilm)
  }
}

const openFilm = (e, imdbID) => {
  e.preventDefault()
  getFilms(`http://www.omdbapi.com/?i=${imdbID}&apikey=d5677312`)
  .then( result => {
    createFilm(result)
    document.querySelector('.display-1').style.display = 'none'
    document.querySelector('.display-2').style.display = 'block'
  })
}

renderFilmsToFavorites()
