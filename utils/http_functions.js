/* eslint camelcase: 0 */

import axios from 'axios';

const api_url = "http://192.168.0.15:5000";

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post(`${api_url}/api/is_token_valid`, {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(username, email, password) {
    return axios.post(`${api_url}/api/create_user`, {
        username,
        email,
        password,
    });
}

export function upload_picture(data, token) {
    return axios({
        method: 'post',
        url: `${api_url}/api/upload_picture/` + token,
        data: data,
        config: { headers: {'Content-Type': 'multipart/form-data'} }
    });
}

export function fetch_pictures(token) {
    return axios.get(`${api_url}/api/fetch_pictures`, tokenConfig(token));
}

export function delete_picture(token, pic) {
    return axios.post( `${api_url}/api/delete_picture/` + token, {
        pic,
    });
}

export function add_folder(folder, tags, token) {
    return axios.post(`${api_url}/api/add_folder/` + token, {
        folder,
        tags,
    });
}

export function add_picture_folder(pic, folders, token) {
    return axios.post(`${api_url}/api/add_picture_folder/` + token, {
        pic,
        folders,
    });
}

export function delete_picture_folder(pic, folder, token) {
    return axios.post(`${api_url}/api/delete_picture_folder/` + token, {
        pic,
        folder,
    });
}

export function fetch_folders(token) {
    return axios.get(`${api_url}/api/fetch_folders`, tokenConfig(token));
}

export function delete_folder(token, id) {
    return axios.post( `${api_url}/api/delete_folder/` + token, {
        id,
    });
}

export function change_lang(token, lang) {
    return axios.post( `${api_url}/api/change_lang/` + token, {
        lang,
    });
}

export function get_token(email, password) {
    return axios.post(`${api_url}/api/get_token`, {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get(`${api_url}/api/has_github_token`, tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get(`${api_url}/api/user`, tokenConfig(token));
}
