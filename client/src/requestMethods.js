import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

//admin token
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGQzMTExMzFmMGRkNDBjNzA3OThjMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTQ2ODUwNjQsImV4cCI6MTY1NDk0NDI2NH0.u5cXaWnd5v0VaWGuxMXOYBrop3ywqczEXglgjsuZnRY";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});