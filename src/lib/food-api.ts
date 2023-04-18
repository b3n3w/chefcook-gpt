export async function fetchIngredient(param: string): Promise<any> {

  const url = 'https://edamam-food-and-grocery-database.p.rapidapi.com/auto-complete?q=' + param;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
  };

  let data: string[] = []
  const res = await fetch(url, options)
    .then(res => res.json())
    .then(json => data = json)
    .catch(err => console.error('error:' + err));
  return data;
}