import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const USER_POOL_ID = 'us-east-1_sDlsXbIFE';
const CLIENT_ID    = '2d0jpgo1sb6msc560tdnll4e0';

export const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export function signIn(email, password) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const auth = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(auth, {
      onSuccess: session => resolve({ user, session }),
      onFailure: err => reject(err),
      newPasswordRequired: attrs => reject({ code: 'NEW_PASSWORD_REQUIRED', attrs }),
    });
  });
}

export function signUp(email, password, name, preferredUsername) {
  const attrs = [];
  if (name) attrs.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
  if (preferredUsername) {
    attrs.push(new CognitoUserAttribute({ Name: 'preferred_username', Value: preferredUsername }));
  }

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attrs, [], (err, data) => (err ? reject(err) : resolve(data)));
  });
}

export function confirmSignUp(email, code) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, res) => (err ? reject(err) : resolve(res)));
  });
}

export function getCurrentUser() {
  return userPool.getCurrentUser();
}

export function signOut() {
  const u = getCurrentUser();
  if (u) u.signOut();
}
