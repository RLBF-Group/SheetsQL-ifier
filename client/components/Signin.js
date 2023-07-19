import React, {useEffect, useState} from 'react';

export default function Signin(){
    const [url, setUrl] = useState('');
    const [fetched, setFetched] = useState(false);

    //request to server to set a random state and store that state on a cookie. server will generate the correct url for the client to be redirected via the sign-in button 
    // ! client must go to link themseleves. you cannot make a request to the server to redirect them there otherwise will get cors error

    const redirectUrl = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    if (fetched === false){
        setFetched(true);
    }

    useEffect(()=>{
        redirectUrl()
    }, [fetched]);

}
