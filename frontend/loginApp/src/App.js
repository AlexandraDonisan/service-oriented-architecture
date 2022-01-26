import React from 'react';
import './App.css';

class App extends React.Component{
    constructor (props) { 
        super(props);
        this.moveToLogin = this.moveToLogin.bind(this)
        this.moveToRegister = this.moveToRegister.bind(this)
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
        this.sendLoginRequest = this.sendLoginRequest.bind(this)
        this.state = {login: true}
    }

    handleSubmitRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        this.sendRegisterRequest(formData)
    }
    handleSubmitLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        this.sendLoginRequest(formData)
    }

    sendRegisterRequest(form) {
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
                localStorage.setItem('token', result["access_token"])
                window.location.replace("index.html")
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    sendLoginRequest(form) {
        console.log("Login clicked")
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
                localStorage.setItem('token', result["access_token"]);
                window.location.replace("index.html")
            })
            .catch(error => {
                console.error(error);
            });
    };

    moveToRegister() {
        console.log("Clicked")
        this.setState({login: false});
    };

    moveToLogin() {
        this.setState({login: true});
    };

    render() {
        return <div className={this.state.login ? 'container' : 'container right-panel-active'} id="container">
        <div className="form-container sign-up-container">
            <form onSubmit={this.handleSubmitRegister}>
                <h1 style={{color: "black"}}>Create Account</h1>
                <input name="name" id="name" type="name" placeholder="Name" />
                <input name="email" id="email" type="email" placeholder="Email" />
                <input name="password" id="password" type="password" placeholder="Password" />
                <button id="submitRegisterButton" type="submit">Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form onSubmit={this.handleSubmitLogin}>
                <h1 style={{color: "black"}}>Sign in</h1>
                <input name="email" id="email" type="email" placeholder="Email" />
                <input name="password" id="password" type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button id="submitLoginButton" type="submit">Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={this.moveToLogin}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={this.moveToRegister}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>;
      };
}

export default App;