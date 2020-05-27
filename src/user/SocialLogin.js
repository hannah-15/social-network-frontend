import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import {socialLogin, authenticate} from "../auth";

class SocialLogin extends Component{
    constructor(){
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
    responseGoogle = response => {
        console.log("------" + JSON.stringify(response));
        const {googleId, name, email, imageUrl} = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        socialLogin(user).then(data => {
            console.log('signin data: ', data);
            if(data.error){
                console.log("Error login. Please try again..");
            }else{
                authenticate(data, ()=>{
                    this.setState({redirectToReferrer: true});
                });
            }
        });
    };
    render(){
        //redirect
        const {redirectToReferrer} = this.state;
        if(redirectToReferrer) {
            return <Redirect to="/" />
        }

        return(
            <GoogleLogin 
            clientId="205428363758-8etnr8rr291uonig15s2rqfeem1sp1v6.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            />
        );
    }
}

export default SocialLogin;