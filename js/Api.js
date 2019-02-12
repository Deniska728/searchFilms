const url = 'http://www.omdbapi.com/'

class Api {
  static async getFilms(query){
    try {
      const responce = await fetch(`${url}/${query}&apikey=d5677312`)
      const result = await responce.json()
      return result.Search || result
    } catch (error) {
      console.log(error); 
    }
  }
}