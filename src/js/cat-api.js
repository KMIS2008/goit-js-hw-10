

 const url = 'https://api.thecatapi.com/v1';
 const keyBreeds = "live_dTMk3RlHdIQ7dS6WdmN5lk4rELcOasVPOWSUfgtHjQkn0qD2MY4IcpWvhNIGQKrD";

 
 
 export function fetchBreeds() {
     return fetch(`${url}/breeds?api_key=${keyBreeds}`)
         .then(response => {
             if (!response.ok) {
                 throw new Error(response.status);
             }
             return response.json();
         });       
 };
 
 export function fetchCatByBreed(breedId) {
     return fetch(`${url}/images/search?api_key=${keyBreeds}&breed_ids=${breedId}`)
         .then(response => {
             if (!response.ok) {
                 throw new Error(response.status);
             }
             return response.json();
         });  
 };
// console.log(fetchCatByBreed("asho"));

