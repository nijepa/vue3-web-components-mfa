# custom-toast

## Vite, Vue3 web-component `custom-mfa`
### (standalone web component made with Vue3 & Vite)

## [![Generic badge](https://urldefense.com/v3/__https://img.shields.io/badge/:-HTML-red.svg?style=flat&logo=HTML5)*(https:**Adeveloper.mozilla.org*en-US*docs*Web*Guide*HTML*HTML5__;XS8vLy8vLy8v!!AasEvJkIHxxHjNOey1g!XNzdr-fXHbBDXGwdWtPeGrgYisdEo5TjispGPrZJDccHMKZMbSUAbADA-UPof845Dv6ucPtdad6J98409ht6HA$ ) [![Generic badge](https://urldefense.com/v3/__https://img.shields.io/badge/:-CSS-blue.svg?style=flat&logo=CSS3)*(https:**Awww.tutorialrepublic.com*css-tutorial*__;XS8vLy8!!AasEvJkIHxxHjNOey1g!XNzdr-fXHbBDXGwdWtPeGrgYisdEo5TjispGPrZJDccHMKZMbSUAbADA-UPof845Dv6ucPtdad6J985F5hm2Pg$ ) [![Generic badge](https://urldefense.com/v3/__https://img.shields.io/badge/:-JavaScript-yellow.svg?style=flat&logo=JavaScript)*(https:**Adeveloper.mozilla.org*en-US*docs*Web*JavaScript__;XS8vLy8vLw!!AasEvJkIHxxHjNOey1g!XNzdr-fXHbBDXGwdWtPeGrgYisdEo5TjispGPrZJDccHMKZMbSUAbADA-UPof845Dv6ucPtdad6J987-9JVkyg$ ) [![Generic badge](https://urldefense.com/v3/__https://img.shields.io/badge/:-VUE.js-BRIGHTGREEN.svg?style=flat&logo=Vue.js)*(https:**Avuejs.org*__;XS8vLw!!AasEvJkIHxxHjNOey1g!XNzdr-fXHbBDXGwdWtPeGrgYisdEo5TjispGPrZJDccHMKZMbSUAbADA-UPof845Dv6ucPtdad6J986YTYmv7w$ ) [![Generic badge](https://urldefense.com/v3/__https://img.shields.io/badge/:-Vite-darkblue.svg?style=flat&logo=Vite)*(https:**Avitejs.dev*__;XS8vLw!!AasEvJkIHxxHjNOey1g!XNzdr-fXHbBDXGwdWtPeGrgYisdEo5TjispGPrZJDccHMKZMbSUAbADA-UPof845Dv6ucPtdad6J985xDrw12w$ )
<hr>

## Usage
## Import component
#### In HTML header:
```html
  <script type="importmap">
    {
      "imports": {
        "vue": "/scripts/path/to/vue.js"
      }
    }
  </script>
  <script type="module" crossorigin src="/scripts/path/to/mfa.js"></script>

```

## Place component
#### in velocity template
```html
  <custom-mfa />
```
## Passing data to component
#### We can use helper function to pass all the attributes:
```js
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      const attr =
        typeof attrs[key] !== "string"
          ? JSON.stringify(attrs[key])
          : attrs[key];
      el.setAttribute(key, attr);
    }
  }
```
#### *passing data example:*
```js
  const mfa = document.querySelector('custom-mfa')

  const mfaProps = {
    translations: {
      #foreach($resource i $(messages.getResourcesWithPrefix('cips.mfa')))
        '$!{resource.getKey()' : '$!{resource.getValue().replace("'", "")}',
      #end
    },
    "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
    font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
    "logo-url": document.querySelector('.customer-logo').src,
    "mfa-status-url": "${link.geAction('/myprofile/mfa/checkStatus')}",
    "mfa-activate-url": "${link.geAction('/myprofile/mfa/activate')}"
  }

  setAttributes(mfa, mfaProps)
```
<hr>


### Props
####   There is 3 types of props:

- ##### ***Translations are recived from velocity action like object:***
    ### **`translations`**
    - Type: String

- ##### ***Styles are received from site elements:***
    ### **`primaryColor`**
    - Type: String
    - Default: "#000"

    ### **`font`**
    - Type: String
    - Default: "'Open Sans', sans-serif"

    ### **`logoUrl`**
    - Type: String
    - Default: ""

- ##### ***Actions url's are received from velocity actions:***
    ### **`mfaStatusUrl`**
    - Type: String
    - Default: ""

    ### **`mfaActivateUrl`**
    - Type: String
    - Default: ""

    ### **`mfaCheckVerificationCodeUrl`**
    - Type: String
    - Default: ""

<hr>

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```
