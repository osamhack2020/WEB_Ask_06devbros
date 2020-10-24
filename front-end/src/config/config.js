export const apiPath = 'api/';

export const APP_HOST = process.env.APP_HOST || 'localhost';        // codespaces로는 원격으로 접속하기 때문에 문제생기는 듯
export const APP_PORT = process.env.APP_PORT || 3000;
export const HOST = `${APP_HOST}:${APP_PORT}`;

// export const API_URL = `http://${HOST}${apiPath}`;
export const API_URL = `http://${HOST}`;
export const JWT_TOKEN = 'token';
