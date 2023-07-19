import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

//user is redirected to '/callback' from Google after entering their credentials
//if the user's credentials were authenticated by Google, will make a GET request here to obtain the access token and refresh token(used as cookie) from Google

export default function Callback(){
    const [email, setEmail] = useState('');
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();

    //get the redirect URL path (including the code query (authentication code) required to send to retrieve user specific tokens)
    const href = window.location.href;
    const index = href.indexOf('callback');
    const path = '/api/authentication/' + href.slice(index);
    console.log('path: ', path);

    //use authentication code in request query to get access/refresh tokens from Google
    const getTokens = async() => {
        try {
            
        } catch (error) {
            
        }
    }


    //get user email from Google and check our SQL database to see if user exists on our application. redirect user to sign up page or home page based on user status
    const checkUserType = async(accessToken) => {
        try {
            
        } catch (error) {
            
        }
    }

    if (fetched === false) {
        setFetched(true);
    }

    useEffect(()=>{
        getTokens();
    }, [fetched]);

    return (
        <div className='signinPage'>
            <div className='signin'>
                <h2>Confirming Google Account</h2>
                <p>Please wait..</p>
            </div>
        </div>
    )

};