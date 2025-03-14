import React from 'react'
import { useAuth } from "react-oidc-context";

export default function CounsollerProfile() {
      const auth = useAuth();
    
      const signOutRedirect = () => {
        const clientId = "6iacmbs34ua4srv863jguc43vg";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://<user pool domain>";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      };
    
      if (auth.isLoading) {
        return <div>Loading...</div>;
      }
    
      if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
      }
    
      if (auth.isAuthenticated) {
        return (
          <div>
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>
          </div>
        );
      }

  return (
    <div>
      <h1>Counsoller Profile Here</h1>
    </div>
  );
}
