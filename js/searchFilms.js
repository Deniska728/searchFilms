const form = document.querySelector('form')

const handleSubmit = e => {
  e.preventDefault()
  const search = document.querySelector('[type="search"]')
  let value = search.value.trim()

  value.toLowerCase()

  if(value){
    let valueArray = value.split(' ')
    if(valueArray.length > 1){
      let valueStr = valueArray.join('+')
      embeded(`?s=${valueStr}`)
    } else {
      embeded(`?s=${value}`)
    }
  } else {
    console.log('Не введено значение');
  }
}

const embeded = url => {
  Api.getFilms(url)
    .then( result => {
      if(result.Response === "False") throw new Error('Ничего не найдено')
      textError.innerHTML = ''
      createList(result)
    })
    .catch( error => {
      filmContainer.innerHTML = ''
      textError.innerHTML = error
    })
}

form.addEventListener('submit', handleSubmit)
