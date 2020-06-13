https://developer.github.com/v3/guides/basics-of-authentication/
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
https://github.com/prose/gatekeeper
https://github.com/atulmy/oauth
http://timmyreilly.azurewebsites.net/running-node-and-express-on-ubuntu-vm/

https://github.com/login/oauth/authorize?scope=user:email&client_id=96f0dcdcc027796e4aa7&state=http://localhost:4200
https://github.com/login/oauth/authorize?scope=user:email&client_id=96f0dcdcc027796e4aa7&state=https://metasong.github.io/iam
http://13.77.165.220:3000/authenticate?code=f40bfd26d35fcc35bcb6&state=https%3A%2F%2Fmetasong.github.io%2Fiam
https://metasong.github.io/iam?token=b116506efd2d87fd4ee1f16f5a9259062498c752

.env
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
PORT=3000

 pscp M:\Workspace\i'm\server\*.* echosong@52.175.247.124:iam

Read official flow: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps
Create a new OAuth application: https://github.com/settings/applications/new and fill in following:
Application name enter your application name, eg: Example
Homepage URL enter your website url, eg: https://example.com
Authorization callback URL:
For development, enter http://localhost:3000/authorize/
For production, enter https://example.com/authorize/
Copy Client ID and Client Secret