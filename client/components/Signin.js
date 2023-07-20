import React, {useEffect, useState} from 'react';

export default function Signin(){
    const [url, setUrl] = useState('');
    const [fetched, setFetched] = useState(false);

    //request to server authentication route to set a random state and store that state on a cookie. server will generate the correct url for the client to be redirected via the sign-in button

    //

    // ! client must go to link themseleves. you cannot make a request to the server to redirect them there otherwise will get cors error

    const getRedirectUrl = async () => {
        try {
            const response = await fetch('api/authentication', {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON'
                }
            });
            const url = await response.json();

            setUrl(url);
            
        } catch (error) {
            console.log('error in signing in: ', err);
        }
    }

    if (fetched === false){
        setFetched(true);
    }

    useEffect(()=>{
        getRedirectUrl()
    }, [fetched]);

    //redirect user to google with the supplied Url 
    const handleRedirect = () => {
        
        window.location.replace(url)
    }

    return (
        <div className='signinPage'>
            <div className='signin'>
                <h1>Welcome to Sheets SQLifier</h1>
            </div>
            <p>
                Please
                <button onClick={handleRedirect}>Sign in</button>
                with Google to verify your account
            </p>
        </div>
    )

}
