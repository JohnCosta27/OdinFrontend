import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@material-ui/core/CircularProgress';

const AuthenticationButton = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <CircularProgress color="secondary" />
    )
  }

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;