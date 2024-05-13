import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    console.log(email, password);
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas."));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      });
    }
  };

  const startRegister = async ({ name, email, password, password2 }) => {
    console.log(email, password);
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
        password2,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      });
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout())
    }
  };

  const startLogout = async() =>{
    localStorage.clear();
    dispatch( onLogoutCalendar() );
    dispatch( onLogout() );
  };

  return {
    status,
    user,
    errorMessage,
    checkAuthToken,
    startLogin,
    startRegister,
    startLogout,
  };
};
