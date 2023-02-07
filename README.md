# custom-mfa

## Vite, Vue3 web-component *`custom-mfa`*

(standalone web component made with Vue3 & Vite)

<hr>

## Usage

### Import component

#### In HTML header

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

### Place component

#### in velocity template

```html
  <custom-mfa />
```

## Passing data to component

### We can use helper function to pass all the attributes

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

### passing data example:

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
    "logo-url": getComputedStyle(document.querySelector('.customer-logo-frame > a')).backgroundImage,
    "mfa-status-url": "${link.getAction('/myprofile/mfa/checkStatus')}",
    "mfa-generate-qr-code-url": "${link.getAction('/myprofile/mfa/generateQrCode')}",
    "mfa-check-verification-code-url": "${link.getAction('/myprofile/mfa/checkVerificationCode')}",
    "mfa-activate-url": "${link.getAction('/myprofile/mfa/activate')}",
    "mfa-download-backup-codes-url": "${link.getAction('/myprofile/mfa/downloadBackupCodes')}",
    "mfa-deactivate-url": "${link.getAction('/myprofile/mfa/deactivate')}",
    "mfa-generate-new-backup-codes-url": "${link.getAction('/myprofile/mfa/generateNewBackupCodes')}"
  }

  setAttributes(mfa, mfaProps)
```

<hr>

### Props

#### There is 3 types of props:

- #### ***Translations are recived from velocity action as object, need to use `JSON.parse`:***

  ### **`translations`**

    - Type: String

<br/>

- #### ***Styles are received from site elements:***

  ### **`primaryColor`**

    - Type: String
    - Default: "#000"

  ### **`font`**

    - Type: String
    - Default: "'Open Sans', sans-serif"

  ### **`logoUrl`**

  - Type: String
  - Default: ""

<br/>

- #### ***Actions url's are received from velocity actions:***

  ### **`mfaStatusUrl`**

    - Type: String
    - Default: ""

  ### **`mfaGenerateQrCodeUrl`**

    - Type: String
    - Default: ""

  ### **`mfaCheckVerificationCodeUrl`**

    - Type: String
    - Default: ""

  ### **`mfaActivateUrl`**

    - Type: String
    - Default: ""

  ### **`mfaDownloadBackupCodesUrl`**

    - Type: String
    - Default: ""

  ### **`mfaDeactivateUrl`**

    - Type: String
    - Default: ""
  
  ### **`mfaGenerateNewBackupCodesUrl`**

    - Type: String
    - Default: ""

<br/>
<hr>

## Deployment

- build app 
- rename compiled file to **`mfa.js`**
- copy file to **`Doocroot-Explorer -> scripts/path/for/app`**

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
