//RESUELVE TUS EJERCICIOS AQUI
//Dog API 
//1 - Declara una funcion getAllBreeds que devuelva todas las razas de perro.

function getAllBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(breeds => {
            console.log(Object.keys(breeds.message))
            return Object.keys(breeds.message)
        });
};


//2

function getRandomDog() {
    return fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(image => image.message);
}


//3 getAllImagesByBreed

function getAllImagesByBreed() {
    return fetch("https://dog.ceo/api/breed/komondor/images")
        .then(res => res.json())
        .then(image => image.message);
}


//4
function getAllImagesByBreed2(raza) {
    return fetch(`https://dog.ceo/api/breed/${raza}/images`)
        .then(res => res.json())
        .then(image => image.message);
}

//GitHub API
//5

function getGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json());
}


//6 
function printGithubUserProfile(username) {
    try {
        return fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(usuario => {
                let imagen = document.createElement("img");
                let nombre = document.createElement("h1");
                imagen.src = usuario.avatar_url;
                nombre.innerHTML = usuario.name;
                document.querySelector("body").appendChild(imagen);
                document.querySelector("body").appendChild(nombre);
                return { img: { src: usuario.avatar_url }, name: usuario.name }
            })
    } catch (error) {
        console.error('Error:', error);
    };
};


//7 - Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma

function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then((usuario) => {
            let img = usuario.avatar_url;
            let name = usuario.name;
            let num = usuario.public_repos

            return `<section>
                        <img src="${img}" alt="${name}">
                        <h1>${name}</h1>
                        <p>Public repos: ${num}</p>
                    </section>`

        });
};


// 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.(Esto no se testea).
let buscador =
`<input type= "text name="username" value="username">
<button type="submit"><i class="fa fa-search"></i></button>
`

document.querySelector("body").appendChild(buscador)


function fetchGithubUsers(userNames){
    return fetch('https://api.github.com/users/${name}')
    .then(res => res.json())
}