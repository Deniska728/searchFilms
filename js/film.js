class Film{
  constructor(options){
    this.options = options
    this.favorite = false
    this.favorites = document.querySelector('.favorites')
    this.removeFromStorage = removeFromStorage
    this.openFilm = openFilm
    this.storageData = JSON.parse(localStorage.getItem('films') || "[]")
  }

  renderFilmsToFavorites(){
    const films = JSON.parse(localStorage.getItem('films') || "[]")
    this.favorites.innerHTML = ''
    for(let film of films){
      const itemFilm = this.render(film, this.removeFromStorage)
      this.favorites.appendChild(itemFilm)
    }
  }

  insertToStorage(e, imdbID){
    const films = JSON.parse(localStorage.getItem('films') || "[]")
    const buttonFav = document.querySelector(`.favorites .fav[data-id="${imdbID}"]`)
    const button = document.querySelector(`.list-films .fav[data-id="${imdbID}"]`)
    for(let film of films){
      if(film['imdbID'] == imdbID){
        this.removeFromStorage(null, imdbID)
        buttonFav.classList.remove('fav-click')
        button.classList.remove('fav-click')
        return
      }
    }
    films.push(this.options)
    try {
      localStorage.setItem('films', JSON.stringify(films))
      button.classList.add('fav-click')
      this.renderFilmsToFavorites()
    } catch (error) {
      alert('Память заполнена.')
    }
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
    callback !== undefined || null ?  fav.classList.add('fav-click') : ''
    fav.addEventListener('click', e => {
      callback !== undefined || null ? callback(e, imdbID) : this.insertToStorage(e, imdbID) 
    })
    a.href = '#'
    a.innerHTML = 'Узнать больше'
    a.addEventListener('click', e => this.openFilm(e, imdbID))
    img.alt = ''
    img.src = Poster !== 'N/A' ? Poster : './img/notfound.png'
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

new Film().renderFilmsToFavorites()