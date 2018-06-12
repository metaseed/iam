import { Injectable, Inject } from "@angular/core";
import { UserInfo } from ".";
import { base64Encode } from "core";
import { GITHUB_AUTHENTICATION } from "./tokens";

@Injectable()
export class AuthService {
  constructor(@Inject(GITHUB_AUTHENTICATION)private userInfo: UserInfo){}
  getToken(){
    if (this.userInfo.token) {
      return 'token ' + this.userInfo.token;
    } else {
        return 'Basic ' + base64Encode(this.userInfo.name + ':' + this.userInfo.password);
    }
  }


}
