https://developer.github.com/v3/guides/basics-of-authentication/
https://github.com/prose/gatekeeper
https://github.com/atulmy/oauth
https://github.com/login/oauth/authorize?scope=user:email&client_id=96f0dcdcc027796e4aa7&state=http://localhost:4200
https://github.com/login/oauth/authorize?scope=user:email&client_id=96f0dcdcc027796e4aa7&state=https://metasong.github.io/iam
http://52.175.247.124:3000/authenticate?code=081a4cf33d8fbc45aed0
https://metaseed.github.io/iam/?token=56ae6c4cb41e49461bd1ddb8ba76e66287b316fb

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