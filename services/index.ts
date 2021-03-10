import cookie from 'js-cookie';
import Router from 'next/router';
import isBrowser from "../utils";
import nextCookie from "next-cookies";
import axios from "axios";
import { makeUseAxios } from 'axios-hooks'

export const login = (_cookie) => {
    if (isBrowser) {
        cookie.set('Token', `Bearer ${_cookie}`, { expires: 100 });
        window.location.assign('/');
    }
};

export const logout = () => {
    cookie.remove('Token');
    // to support logging out from all windows
    window.localStorage.setItem('logout', String(Date.now()));
    window.location.assign('/login');
};

export const authSync = async (ctx: any) => {
    const { Token } = nextCookie(ctx);
    /*
     * This happens on server only, ctx.req is available means it's being
     * rendered on server. If we are on server and Cookie is not available,
     * means user is not logged in.
     */
    if (ctx.req && !Token) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
        return;
    }
    // We already checked for server. This should only happen on client.
    if (!Token) Router.push('/login');

    return { Token };
}

export const authRedirect = async (ctx: any) => {
    const { Token } = nextCookie(ctx);
    // Redirect in the server if a Cookie is present in the request
    if (ctx.req && Token) {
        if (ctx.req) {
            ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end();
            return;
        }
    }

    return { Token };
}

const axiosCustom = axios.create({ baseURL: 'https://pollazaapi.herokuapp.com/' })
axiosCustom.defaults.withCredentials = true

// Add a request interceptor
axiosCustom.interceptors.request.use(config => {

    config.headers.Authorization = cookie.get('Token');
    return config;
});

export const _useAxios = makeUseAxios({
    axios: axiosCustom
})


