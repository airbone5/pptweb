function test1(){
}
function initGoogleAuth (clientId = '481947092768-53dhr9tr3ah7o7devccd6oqpmh5a7goe.apps.googleusercontent.com') {
  gapi.auth2.init({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  }).then(() => {
    document.getElementById('sign-in-btn').disabled = false;
  }).catch(err => {
    console.log(err);
  });
}
initGoogleAuth();