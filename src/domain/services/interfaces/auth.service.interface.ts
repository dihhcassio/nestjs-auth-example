export interface IAuthService {
  validateUser(uuid: string): Promise<any>;
  login(username: string, password: string): Promise<any>;
  validateToken(jwt: string): Promise<any>;
}
