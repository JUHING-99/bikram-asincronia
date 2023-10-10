//RESUELVE TUS EJERCICIOS AQUI
//Dog API 
//1 - Declara una funcion getAllBreeds que devuelva todas las razas de perro.

function getAllBreeds(){
    return fetch("https://dog.ceo/api/breeds/list/all")
            .then(res=>res.json())
            .then(breeds => Object.keys(breeds.message)); 
};


//2

function getRandomDog() {
   return fetch("https://dog.ceo/api/breeds/image/random")
                .then(res=>res.json())
                .then(image => image.message);
}


//3 getAllImagesByBreed

function getAllImagesByBreed() {
    return fetch("https://dog.ceo/api/breed/komondor/images")
                 .then(res=>res.json())
                 .then(image => image.message);
 }


//4
function getAllImagesByBreed2(raza) {
    return fetch(`https://dog.ceo/api/breed/${raza}/images`)
                 .then(res=>res.json())
                 .then(image => image.message);
}

//GitHub API
//5

function getGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
                    .then(res=>res.json());
}


//6 
function printGithubUserProfile(username) {
    try{
        return fetch(`https://api.github.com/users/${username}`)
                .then(res=> res.json())
                .then(usuario=> {
                    let imagen = document.createElement("img");
                    let nombre = document.createElement("h1");
                    imagen.src = usuario.avatar_url;
                    nombre.innerHTML = usuario.name;
                    document.querySelector("body").appendChild(imagen);
                    document.querySelector("body").appendChild(nombre);
                    console.log(usuario.avatar_url);
                    return {img: {src: usuario.avatar_url}, name: usuario.name}
                })
    } catch (error){
        console.error('Error:', error);
    };
};