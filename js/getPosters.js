const getFilms = url => {
  return new Promise( (resolve, reject) => {

    const xhr = new XMLHttpRequest()

    xhr.open('GET', url)

    xhr.onload = () => {
      if(xhr.status === 200){
        resolve(xhr.response)
      } else {
        reject( new Error(`Ошибка: ${xhr.statusText}, ${xhr.status}`))
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network Error'))
    }

    xhr.send()
  })
}

const embeded = url => {
  getFilms(url)
    .then( result => {
      let posts = JSON.parse(result)
      return posts
    })
    .then( result => {

      if(result.Response === "False") throw new Error('Ничего не найдено')

      removeUnnecessaryElements('.list-films')
      removeUnnecessaryElements('body > p')

      createList(result.Search)
    })
    .catch( error => {

      removeUnnecessaryElements('.list-films')
      removeUnnecessaryElements('body > p')

      const p = document.createElement('p')
      p.innerHTML = error
      document.body.appendChild(p)
    })
}