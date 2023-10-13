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
                return { img: usuario.avatar_url , name: usuario.name }
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
document.addEventListener("DOMContentLoaded", function() {     //Cuando se carga el contneido de la página se ejecuta esta función
    let buscador = document.createElement("form");       //Creamos un elemento "form" que contiene el template string (este cachito lo tenía hecho, pero no sabía como introducirlo en la función y que se pinte en la página!)
    buscador.id = "buscador";
    buscador.innerHTML = `<label for="nombre">Write the name you want to search</label>
                            <input type="text" id="nombre" name="nombre"placeholder="Name"><br>
                            <button type="submit">Submit</button>`;
    document.querySelector("body").appendChild(buscador);    //se lo pegamos al body

    document.getElementById("buscador").addEventListener("submit", function(event) {   //una validación de formulario
        event.preventDefault();
        let user = event.target.nombre.value;  //el nombre del input
        let info = getAndPrintGitHubUserProfile(user);   //se llama a la función anterior poniendole como parámetro el usuario que quiere buscar el cliente y ha introducido en el input.
        let article = document.createElement("article");  

        info.then(resultado => article.innerHTML = resultado); //después se aplica la información obtenida de llamar a la funcion y se introduce dentro del "article" creado previamente
        document.querySelector("body").appendChild(article);
    });
});


//9
function fetchGithubUsers(userNames) {
    //Se crea una variable usuarios y a ella le asignamos como valor toda una callback function. En esta callback hacemos un map a todos los parámetros introducidos en la función. Este map llama a la api y devuelve un objeto con el nombre y la url del repositorio del usuario. Es decir que la variable "usuarios" al final contiene esos objetos.
    let usuarios = userNames.map(user => fetch(`https://api.github.com/users/${user}`) 
                                                        .then(res => res.json())
                                                        .then(usuario => {
                                                            let repo = usuario.html_url;
                                                            let nombre = usuario.name;
                                                            return {name: nombre, html_url: repo};
                                                        }));

    //Promise.all : Crea una promesa que se cumple en formato de que te devuelve un array de los resultados cuando todas las promesas del fetch se cumplen, pero si alguna de esas promesas es rechazada, se rechaza todo. Así que cuando todas las promesas del fetch se cumplen te devuelve un array con los usuarios (que on objetos). A esos usuarios se les pasa un bucle for y se introduce en un template string con esa estructura.
    return Promise.all(usuarios).then(users => {
        for (let i = 0; i < users.length; i++) {
            let section = document.createElement("section")
            section.innerHTML = `<h1>Name: ${users[i].name}</h1>
                                <p>Repo: ${users[i].html_url}</p>`;
            document.querySelector("body").appendChild(section);
        }
        return users;
    });                                                        
}