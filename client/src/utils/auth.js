import decode from "jwt-decode";

// following OOP principles created a series of methods that try one thing only to return a simple true false when calling .loggedIn() from a component
// instantiates a new version for every component that imports it
class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    // checks if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    // retrieves the user token from localStorage
    return localStorage.getItem("id_token");

    window.location.assign("/");
  }
}

export default new AuthService();
