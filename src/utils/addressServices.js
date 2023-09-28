function translateZipCode() {
   if (profile.postCode.length !== 8) {
     return;
 }
 let cepResponse  = axios.get('https://api.postmon.com.br/v1/cep/' + `{{profile.postCode}}`)
 .then(data => data.json())
 console.log(cepResponse)
}
export default translateZipCode

