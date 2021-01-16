import cookie from 'js-cookie';
import Router from 'next/router';
import isBrowser from "../utils";
import nextCookie from "next-cookies";
import axios from "axios";
import { makeUseAxios } from 'axios-hooks'

export const login = (_cookie) => {
  if (isBrowser) {
    cookie.set('authCookie', _cookie, { expires: 100 });
    window.location.assign('/');
  }
};

export const logout = () => {
  cookie.remove('authCookie');
  // to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()));
  window.location.assign('/login');
};

export const authSync = async (ctx: any) => {
  const { authCookie } = nextCookie(ctx);
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and authCookie is not available,
   * means user is not logged in.
   */
  if (ctx.req && !authCookie) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }
  // We already checked for server. This should only happen on client.
  if (!authCookie) Router.push('/login');

  return authCookie;
}

export const authRedirect = async (ctx: any) => {
  const { authCookie } = nextCookie(ctx);
  // Redirect in the server if a authCookie is present in the request
  if (ctx.req && authCookie) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
      return;
    }
  }
  // We already checked for server. This should only happen on client.
  //if (authCookie) Router.push('/home');
  return { authCookie };
}

const axiosCustom = axios.create({ baseURL: 'https://pollazatechtalk.azurewebsites.net/' })

axiosCustom.interceptors.response.use(
  config => {
    return config
  },
  error => Promise.reject(error)
);

/*axiosCustom.interceptors.request.use(
  config => {
    console.log("setting up");
    console.log(config)
    const authCookie = cookie.get();
    console.log(authCookie);
    return config
  },
  error => Promise.reject(error)
);*/


export const _useAxios = makeUseAxios({
  axios: axiosCustom
})


