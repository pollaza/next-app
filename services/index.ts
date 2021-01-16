import cookie from 'js-cookie';
import Router from 'next/router';
import isBrowser from "../utils";
import nextCookie from "next-cookies";

export const login = () => {
  if (isBrowser) {
    cookie.set('token', 'auth-ok', { expires: 100 });
    Router.push('/');
  }
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()));
  window.location.assign('/login');
};

export const authSync = async (ctx: any) => {
  const { token } = nextCookie(ctx);
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }
  // We already checked for server. This should only happen on client.
  if (!token) Router.push('/login');

  return token;
}

export const authRedirect = async (ctx: any) => {
  const { token } = nextCookie(ctx);
  // Redirect in the server if a token is present in the request
  if (ctx.req && token) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
      return;
    }
  }
  // We already checked for server. This should only happen on client.
  //if (token) Router.push('/home');
  return { token };
}


