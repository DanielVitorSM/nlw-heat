# Mobile - React Native e Expo

### SOBRE
Aplicação desenvolvida com React Native e Expo usando tecnologias como OAuth, Animations, ContextAPI, AsyncStorage e mais.

----------------------------
#### NECESSÁRIO
* Gerenciador de pacotes como o [Yarn](https://classic.yarnpkg.com/en/docs/install/) ou [Npm](https://www.npmjs.com/get-npm);
* Expo 4.10.* ou posterior;
```  bash
$ npm install --global expo-cli
$ yarn global add expo-cli
 ```
 
* Credenciais do [Github OAuth](https://github.com/settings/developers) para usar login com Github;
* Simulador Android/IOS, ou um celular com  o Expo Go na [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US)  ou [AppStore](https://apps.apple.com/br/app/expo-go/id982107779)
* Editor de código como o [Visual Studios Code](https://code.visualstudio.com/) ou de sua preferência (Opcional);
----------------------------
#### INSTALAÇÃO LOCAL
Para instalar e iniciar o aplicativo localmente usando Expo:
``` bash
$ git clone https://github.com/danielvitorsm/nlw-heat
$ cd nlw-heat/mobile/
#! Configure a app.json corretamente colocando as informações da api e github
$ yarn install ou npm install
$ expo start
```
* app.json: GITHUB_CLIENT_ID e API_BASE_URL são necessários
#### INICIANDO A API
Para iniciar a api de mensagens
``` bash
$ cd nlw-heat/backend/
#! Renomeie a .env-pre pra .env e insira as informações
$ yarn install ou npm install
$ yarn dev ou npm run dev
```
----------------------------
#### LINKS
https://www.rocketseat.com.br/
https://www.linkedin.com/school/rocketseat/