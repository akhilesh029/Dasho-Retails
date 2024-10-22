import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual client ID

function GoogleAuth() {
  const [googleUser, setGoogleUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = googleUser?.onSignIn((googleUser) => {
      setGoogleUser(googleUser);
      getProfile(googleUser);
    });

    return () => unsubscribe();
  }, [googleUser]);

  const getProfile = async (googleUser) => {
    const profile = await googleUser.getBasicProfile();
    setProfile(profile);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  const handleLogout = () => {
    setGoogleUser(null);
    setProfile(null);
  };

  return (
    <div>
      {googleUser ? (
        <div>
          <h2>Welcome, {profile.getName()}!</h2>
          <img src={profile.getImageUrl()} alt={profile.getName()} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={setGoogleUser}
          onFailure={handleLoginFailure}
        />
      )}
    </div>
  );
}

export default GoogleAuth;