## Análise de imagens utilizando reconhecimento visual e de texto.

### Rodando o projeto:
- Criar a váriavel de ambiente `GOOGLE_APPLICATION_CREDENTIALS` apontando para o arquivo de credenciais `google-vision.json` dentro da pasta `credentials/`
- `tsc -w` na pasta `server/`
- `node server.js` na pasta `dist/`


### Endpoints

#### /image
Parametros: 
 - `image`: `multipart/form-data`
 
Retorna o texto extraido da imagem, e também um array de objetos com as entidades processadas da imagem. 
