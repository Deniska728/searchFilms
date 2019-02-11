let filmContainer = document.querySelector('.list-films')
const img = document.querySelector('.display-2-body > img')
const p = document.querySelector('.display-2-body p')
const h3 = document.querySelector('.display-2-body h3')
const genre = document.querySelector('.display-2-body .genre')
const rating = document.querySelector('.rating')

const createList = array => {
  filmContainer.innerHTML = ''

  array.map( item => {
    filmContainer.appendChild(new Film(item).render())
  })
}

const createFilm = options => {
  console.log(options);
  const { Poster, Title, Year, Plot, Genre, imdbRating } = options
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

