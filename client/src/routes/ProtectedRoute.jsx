import React, { useEffect, useState } from "react";
import { useEcomStore } from "../store/EcomStore";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectedRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false); // use 'ok' in lowercase for consistency
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      const verifyUser = async () => {
        try {
          await currentUser(token);
          setOk(true);
        } catch (error) {
          setOk(false);
        }
      };
      verifyUser();
    }
  }, [user, token]); // Adding user and token as dependencies

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectedRouteUser;
