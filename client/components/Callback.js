import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

//once a user has given permissions on the consent page, if the user's credentials were authenticated by Google, Google redirects the user to the redirect URL we provided ('/callback') along with an authorization code query parameter on the URL
//GET /oauthcallback?code={authorizationCode}

// using that auth code, we will now make a GET request to the server, which will make a GET request here to obtain the access token and refresh token(used as cookie) from Google's API

export default function Callback() {
	const [fetched, setFetched] = useState(false);
	//const navigate = useNavigate();

	//get the redirect URL path (including the code query (authentication code) required to send to retrieve user specific tokens)
	//href, the entire redirect URL appended with the authorization code
	const href = window.location.href;

	const index = href.indexOf('callback');
	//append authorization code to the path for the GET request for user's access/refresh tokens
	const path = '/api/authentication/' + href.slice(index);
	console.log('path: ', path);

	//use authentication code in request query to get access/refresh tokens from Google
	// const getTokens = async () => {
	// 	try {
	// 		const response = await fetch(path, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'Application/JSON',
	// 			},
	// 		});

	// 		console.log('getTokens fetch response: ', response);
	// 		const accessToken = await response.json();

	// 		console.log('Access Token: ', accessToken);
	// 		console.log(typeof accessToken);

	// 		return redirect('/form');
	// 	} catch (error) {
	// 		console.log(
	// 			'Error when making fetch request to URL for access token and refresh token',
	// 			error
	// 		);
	// 	}
	// };

    const handleCallback = async () => {
        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                }
                
            })
            const permission = await response.json();

            if (permission === 'granted'){
                console.log('login successful')
                return redirect('/form');
            }
        } catch (error) {
            console.log('Error, could not authenticate user with Google', error)
        }

    }




	if (fetched === false) {
		setFetched(true);
	}

	useEffect(() => {
		handleCallback();
	}, [fetched]);

	return (
		<div className="signinPage">
			<div className="signin">
				<h2>Confirming Google Account</h2>
				<p>Please wait..</p>
			</div>
		</div>
	);
}
