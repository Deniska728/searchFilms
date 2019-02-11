class Film{
  constructor(options){
    this.options = options
  }

  openFilm(e, imdbID){
    e.preventDefault()
    getFilms(`http://www.omdbapi.com/?i=${imdbID}&apikey=d5677312`)
    .then( result => {
      createFilm(result)
      document.querySelector('.display-1').style.display = 'none'
      document.querySelector('.display-2').style.display = 'block'

      const buttonExit = document.querySelector('.exit')
      buttonExit.addEventListener('click', clickToExit)
    })
  }

  insertToStorage(e, imdbID){
    const filmClone = document.querySelector(`div[data-id="${imdbID}"`).parentElement.cloneNode(true)
    const favorites = document.querySelector('.favorites')
    favorites.appendChild(filmClone)
    const films = JSON.parse(localStorage.getItem('films') || "[]")
    films.push(this.options)
    try {
      localStorage.setItem('films', JSON.stringify(films))
    } catch (error) {
      alert('Память заполнена.')
    }
  }

  render(){
    const { Poster, imdbID, Title, Year } = this.options
    const itemFilm = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('p')
    const a = document.createElement('a')
    const fav = document.createElement('div')

    fav.dataset.id = imdbID
    fav.addEventListener('click', e => this.insertToStorage(e, imdbID))
    a.href = '#'
    a.innerHTML = 'Узнать больше'
    a.addEventListener('click', e => this.openFilm(e, imdbID))
    img.alt = ''
    img.src = Poster !== 'N/A' ? Poster : './img/notfound.png'
    title.innerHTML = `${Title}(${Year})`
    itemFilm.classList.add('list-item')
    itemFilm.appendChild(img)
    itemFilm.appendChild(a)
    itemFilm.appendChild(fav)
    itemFilm.appendChild(title)

    return itemFilm
  }
}