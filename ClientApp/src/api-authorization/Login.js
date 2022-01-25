import React from 'react';
import { GoogleLogin } from 'react-google-login';

function Login() {
    const onSuccess = async googleData => {

        const res = await fetch(`api/user/login?googleId=${"123"}&email=${"test@test.com"}`);
        if (res.status === 200) {
            console.log('Successful')
        } else {
            alert(await res.json().then(data => data.error));
        }
    };

    const onFailure = (res) => {
        alert("Google authentication failed.", res)
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