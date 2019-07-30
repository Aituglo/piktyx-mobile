import { UPLOAD_PICTURE_SUCCESS, UPLOAD_PICTURE_FAILURE, UPLOAD_PICTURE_REQUEST, RECEIVE_PICTURE_DATA, FETCH_PICTURE_REQUEST, FETCH_PICTURE_FAILURE, DELETE_PICTURE_FAILURE, DELETE_PICTURE_REQUEST, DELETE_PICTURE_SUCCESS } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { upload_picture, fetch_pictures, delete_picture } from '../utils/http_functions';

export function pictureUploadSuccess(data) {
    return {
        type: UPLOAD_PICTURE_SUCCESS,
        payload: {
            files: data.files
        },
    };
}

export function pictureFetchSuccess(data) {
    return {
        type: RECEIVE_PICTURE_DATA,
        payload: {
            files: data.result
        },
    };
}

export function pictureFetchFailure(error) {
    return {
        type: FETCH_PICTURE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function pictureUploadFailure(error) {
    return {
        type: UPLOAD_PICTURE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}


export function pictureUploadRequest() {
    return {
        type: UPLOAD_PICTURE_REQUEST,
    };
}


export function pictureFetchRequest() {
    return {
        type: FETCH_PICTURE_REQUEST,
    };
}

export function pictureDeleteSuccess(success) {
    return {
        type: DELETE_PICTURE_SUCCESS,
        payload: {
            status: success.response.status,
            statusText: success.response.statusText,
        },
    };
}


export function pictureDeleteFailure(error) {
    return {
        type: DELETE_PICTURE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}


export function pictureDeleteRequest() {
    return {
        type: DELETE_PICTURE_REQUEST,
    };
}

export function uploadPicture(data, token) {
    return function (dispatch) {
        dispatch(pictureUploadRequest());
        return upload_picture(data, token)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(pictureUploadSuccess(response));
                } catch (e) {
                    alert(e);
                    dispatch(pictureUploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Upload failed',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(pictureUploadFailure({
                    response: {
                        status: 403,
                        statusText: 'Upload failed',
                    },
                }));
            });
    };
}

export function fetchPictures(token) {
    return function (dispatch) {
        dispatch(pictureFetchRequest());
        return fetch_pictures(token)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(pictureFetchSuccess(response));
                } catch (e) {
                    alert(e);
                    dispatch(pictureFetchFailure({
                        response: {
                            status: 403,
                            statusText: 'Fetch failed',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(pictureFetchFailure({
                    response: {
                        status: 403,
                        statusText: 'Fetch failed',
                    },
                }));
            });
    };
}

export function deletePicture(token, pic) {
    return function (dispatch) {
        dispatch(pictureDeleteRequest());
        return delete_picture(token, pic)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(pictureDeleteSuccess(response));
                } catch (e) {
                    dispatch(pictureDeleteFailure({
                        response: {
                            status: 403,
                            statusText: 'Delete failed',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(pictureDeleteFailure({
                    response: {
                        status: 403,
                        statusText: 'Delete failed',
                    },
                }));
            });
    };
}
