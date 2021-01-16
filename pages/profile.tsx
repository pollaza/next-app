import {authSync, logout} from "../services";
import AppLayout from "../components/AppLayout";
import Button from "@material-ui/core/Button";
import React from "react";
import useAxios from "axios-hooks";

const Profile = () => {
  const [{ data, loading }, executeLogout] = useAxios(
    { url: 'https://pollazaapi.herokuapp.com/account/logout', method: 'POST' },
    { manual: true }
  )

  const handleLogout = () => {
    executeLogout();
    logout();
  };

  return (
    <AppLayout>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleLogout}
      >
        Cerrar la sesión
      </Button>
    </AppLayout>
  );
};

Profile.getInitialProps = authSync;

export default Profile
