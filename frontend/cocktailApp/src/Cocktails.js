import './styles.css';
import React from 'react';

class Cocktails extends React.Component {
    constructor(props) {
        super(props);
        this.getCocktailRequest = this.getCocktailRequest.bind(this);
    }

    getCocktailRequest(event) {
        console.log(event)
        event.preventDefault();
        const formData = new FormData(event.target);
        const cocktail_name = formData.get("name");
        const token = localStorage.getItem('token');
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${token}`)
        const request = new Request(`http://localhost:3000/cocktail/${cocktail_name}`, { method: 'GET', headers: headers,});
    
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    window.localStorage.removeItem('token');
                } else if (response.status === 404){
                    alert("Cocktail not found! Search for another beverage!");
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
    }

    render() {
        return <div className="cocktailContainer">  <div className="flip-card-container">
            <div className="flip-card no-spin">
    
                <div className="card-front">
                    <figure>
                        <img src="https://media.istockphoto.com/photos/empty-wooden-bar-counter-picture-id624494724?k=20&m=624494724&s=612x612&w=0&h=0THwjtmTH8JEU0HgEjRVpyJ2z8kfOz5WC-tl2mx9K-E="
                            alt="Brohm Lake" />
                        <figcaption>Search for a cocktail</figcaption>
                    </figure>
                    <form onSubmit={this.getCocktailRequest}>
                        <label id="icon"><i className="fas fa-envelope"></i></label>
                        <input className="inputDrink" type="text" name="name" id="name" placeholder="Cocktail Name" required />
                        
                        <button id="searchDrinkButton" type="submit">Search Drink</button>
                        
                    </form>
                </div>
    
            </div>
        </div>
        
        <div className="flip-card-container">
            <div className="flip-card">
    
                <div className="card-front">
                    <figure>
                        <div className="img-bg"></div>
                        <img id="cocktailPictureFront"
                            src="https://media.istockphoto.com/photos/empty-wooden-bar-counter-picture-id624494724?k=20&m=624494724&s=612x612&w=0&h=0THwjtmTH8JEU0HgEjRVpyJ2z8kfOz5WC-tl2mx9K-E="
                            alt="Image 2" />
                        <figcaption id="cocktailFigcaption">Cocktail</figcaption>
                    </figure>
    
                    <ul id="ingredients">
                    </ul>
                </div>
    
                <div className="card-back">
                    <figure>
                        <div className="img-bg"></div>
                        <img id="cocktailPictureBack"
                            src="https://media.istockphoto.com/photos/empty-wooden-bar-counter-picture-id624494724?k=20&m=624494724&s=612x612&w=0&h=0THwjtmTH8JEU0HgEjRVpyJ2z8kfOz5WC-tl2mx9K-E="
                            alt="image-2" />
                    </figure>
    
                    <div id="instructions"></div>
    
                    <div className="design-container">
                        <span className="design design--1"></span>
                        <span className="design design--2"></span>
                        <span className="design design--3"></span>
                        <span className="design design--4"></span>
                        <span className="design design--5"></span>
                        <span className="design design--6"></span>
                        <span className="design design--7"></span>
                        <span className="design design--8"></span>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
    }
}

export default Cocktails;