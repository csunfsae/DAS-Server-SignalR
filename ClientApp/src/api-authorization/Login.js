import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { OAuth2Client } from "google-auth-library";

function Login() {
    const onSuccess = async googleData => {

        const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

        const token = googleData.tokenId;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });

        const { sub, email } = ticket.getPayload();

        const res = await fetch(`api/user/login?googleId=${sub}&email=${email}`);
        if (res.status === 200) {
            console.log('Successful')
        } else {
            alert(await res.json().then(data => data.error));
        }
    };

    const onFailure = (res) => {
        //alert("Google authentication failed.", res)
    };

    return (
        <div id="login-button">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={false}
            />
        </div>
    );
}

export default Login;