<GoogleLogin
    onSuccess={credentialResponse => {
        console.log(credentialResponse);
    }}
    onError={() => {
        console.log('Login Failed');
    }}
/>;