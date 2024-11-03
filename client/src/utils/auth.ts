import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return !!this.getToken();
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token) return true;
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp ? Date.now() >= exp * 1000 : true;
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.href = '/';
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.href = '/login';
  }
}

export default new AuthService();
