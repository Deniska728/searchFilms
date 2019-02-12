class Film{
  constructor(options){
    this.options = options
    this.favorite = false
    this.favorites = document.querySelector('.favorites')
    this.removeFromStorage = removeFromStorage
    this.openFilm = openFilm
  }

  insertToStorage(e, imdbID){
    const films = JSON.parse(localStorage.getItem('films') || "[]")
    for(let film of films){
      if(film['imdbID'] == imdbID){
        this.removeFromStorage(null, imdbID)
        return
      }
    }
    films.push(this.options)
    try {
      localStorage.setItem('films', JSON.stringify(films))
      renderFilmsToFavorites()
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
    itemFilm.dataset.idFilm = imdbID
    itemFilm.appendChild(img)
    itemFilm.appendChild(a)
    itemFilm.appendChild(fav)
    itemFilm.appendChild(title)

    return itemFilm
  }
}