window.onload = function(){
    const submitRegisterButton = document.getElementById('submitRegisterButton')
    const submitLoginButton = document.getElementById('submitLoginButton')
    const searchDrinkButton = document.getElementById('searchDrinkButton')
    document.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        if (event.submitter === submitRegisterButton) {
            sendRegisterRequest(formData)
        }
        else if (event.submitter === submitLoginButton) {
            sendLoginRequest(formData)
        }
        else if (event.submitter === searchDrinkButton) {
            cocktail_name = formData.get("name")
            getCocktailRequest(cocktail_name)
        }
    })  
}

const sendRegisterRequest = (form) => {
    const request = new Request('http://localhost:3000/register', { method: 'POST', body: form, });

    fetch(request)
        .then(response => {
            if (response.status === 201 || response.status === 409) {
                return response.json();
            } else {
                console.log(response);
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(result => {
            console.log(result);
            window.location.replace("index.html")
        })
        .catch(error => {
            console.error(error);
        });
};

const sendLoginRequest = (form) => {
    const request = new Request('http://localhost:3000/login', { method: 'POST', body: form, });

    fetch(request)
        .then(response => {
            if (response.status === 201 || response.status === 409) {
                return response.json();
            } else {
                console.log(response);
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(result => {
            console.log(result);
            window.location.replace("index.html")
        })
        .catch(error => {
            console.error(error);
        });
};

const getCocktailRequest = (cocktail_name) => {
    const request = new Request(`http://localhost:3000/cocktail/${cocktail_name}`, { method: 'GET',});

    fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log(response);
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(result => {
            console.log(result)
            const cocktailFigcaption = document.getElementById("cocktailFigcaption");
            cocktailFigcaption.innerHTML = ""
            let strDrink = document.createTextNode(result["strDrink"]);
            cocktailFigcaption.appendChild(strDrink);
            
            document.getElementById("cocktailPictureFront").src = result["strDrinkThumb"];
            document.getElementById("cocktailPictureBack").src = result["strDrinkThumb"];

            const instruction = document.getElementById("instructions");
            instruction.innerHTML = ""
            let node = document.createTextNode(result["strInstructions"]);
            instruction.appendChild(node);

            var index = 1;
            const container = document.getElementById("ingredients");
            container.innerHTML = "";

            while (result[`strIngredient${index}`] !== null){
                let li = document.createElement("li");
                let list_item = result[`strIngredient${index}`];
                if (result[`strMeasure${index}`] !== null){
                    list_item = list_item + ' - ' + result[`strMeasure${index}`];
                }
                let node = document.createTextNode(list_item);
                li.appendChild(node);
                container.appendChild(li);
                index++;
            }
        })
        .catch(error => {
            console.error(error);
        });
};

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});