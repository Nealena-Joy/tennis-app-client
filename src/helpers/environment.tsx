let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'tennis-app-client-njr.herokuapp.com':
        APIURL = 'https://tennis-app-client-njr.herokuapp.com/'
}

export default APIURL;