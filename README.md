[Demo](https://ricardo-teixeira.github.io/gmaps-form/)

### Setup
- ```npm install```
- ```npm run dev``` para iniciar alterações em desenvolvimento
- Em outra janela do console execute ```npm start``` para iniciar um servidor local
- Abra no seu navegador o endereço: [http://localhost:8080](http://localhost:8080)

### Parâmetros
A função findGoogleAddress estará disponível globalmente.
Devem ser passados os seguintes parâmetros:

```json
{
  apiKey: [string],
  initialValues: [object]
}, 
callback: [function]
```

A propriedade ```apiKey``` deve conter o tipo de chave, key ou clientID
Ex: *key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8* ou *client=gme-myenterprisename*

O parâmetro ```callback``` será executado quando o usuário submeter o formulário de endereço.

Um elemento HTML deve ser passado como segundo argumento para o retorno da função findGoogleAddress.

```javascript
  const API_KEY = 'key=AIzaSyDkNOmrr3Ec_sbxVZLY5xfP3hfNqLRKoG8';
  const initialData = {
    street: 'Avenida José de Souza Campos',
    country: 'Brasil',
    state: 'São Paulo',
    city: 'Campinas',
    lat: -22.843125677855074,
    lng: -47.00317025184631
  };

  const $appContainer = document.getElementById('myAppContainer');

  findGoogleAddress(
    {
      apiKey: API_KEY,
      initialValues: initialData
    },
    (touched, values) => {
      console.log(touched, values);
    }
    )($appContainer);
```

O ```callback``` retornará dois parâmetros, o primeiro contendo um objeto com cada propriedade do endereço.
Ex.:

```json
{
  city: {
    value: 'Campinas',
    touched: false
  },
  street: {
    value: 'Rua Exemplo',
    touched: true
  },
}
```

A propriedade ```touched``` indica se o campo foi alterado pelo usuário manualmente.

O segundo parâmetro do retorno do ```callback``` retorna os valores do formulário de forma simples ([chave]:[valor]).

Ex.:

```json
{
  city: 'Campinas',
  street: 'Rua Exemplo'
}
```

#### Propriedades disponíveis:

Propriedade | Tipo
------------ | -----------
country | String
state | String
city | String
neighborhood | String
street | String
number | Int
postal_code | Int
lat | Float
lng | Float