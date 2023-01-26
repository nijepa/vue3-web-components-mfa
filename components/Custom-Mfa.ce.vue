<template>
  <div class="comp">
    <div class="header">
      <h1 :style="{ 'font-weight': isEditing ? 600 : 400 }">
        2. {{ translate('notes.2fa_authentication') }}
      </h1>
      <button class="btn-edit" @click="editing">
        <svg
          class="svg-edit"
          viewBox="0 0 33.583 34.179"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          stroke="rgb(255, 255, 255)"
          stroke-width="0"
          :style="{
            fill: isEditing ? 'rgb(210, 210, 210)' : 'rgb(255, 255, 255)',
          }"
        >
          <g transform="matrix(1.3333333,0,0,-1.3333333,0,34.179467)">
            <g transform="translate(21.6945,25.6347)">
              <path
                d="m0 0-0.855-0.856-0.619-0.619-15.054-15.053-1.26-4.791 4.772 1.316 16.509 16.509zM-2.288-3.523 0-1.239 2.255-3.494-0.033-5.777Zm-13.002-13.005 12.045 12.041 2.256-2.254-12.046-12.041z"
              />
            </g>
            <g transform="translate(0,20.6298)">
              <path
                d="m0 0v-20.63h19.703v11.724l-1.037-1v-9.686H1.038v18.556h9.629L11.704 0Z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <Transition name="slide-up" appear>
      <div
        class="error"
        v-if="errorMsg"
        :class="errorMsg ? 'error-msg' : 'success-msg'"
      >
        <svg width="32px" height="32px" viewBox="0 0 16 16" fill="none">
          <path
            v-if="errorMsg"
            fill="rgb(232, 0, 0)"
            d="M6.37119,11.87271h3.2554V14H6.37119ZM6.31551,2l.37063,8.54245H9.31386L9.68449,2Z"
          />
          <path
            v-if="successMsg"
            fill="rgb(12, 125, 12)"
            d="M14,4.69298L5.81846,12.87529l-3.81846-3.81846,1.63615-1.63692,2.25019,2.25019L12.43173,3.12471l1.56827,1.56827Z"
          />
        </svg>
        &nbsp;
        {{ errorMsg }}
      </div>
    </Transition>
    <div class="subhead">
      <h6>{{ translate('notes.status') }}</h6>
      <h4>{{ translateMfaStatus }}</h4>
      <Transition name="fade" appear>
        <button
          v-if="isEditing && templateState === 'backup'"
          @click="changeTemplateState(true)"
          class="btn btn-state"
        >
          {{ translate('buttons.edit_2fa') }}
        </button>
      </Transition>
    </div>
    <hr v-if="isEditing" />

    <Transition name="slide-up" appear>
      <div class="main" v-if="isEditing">
        <!-- <div class="content">
          <div v-for="item in templateFields">
            <h3 v-if="item.tag === 'h3'" :class="item.class">
              {{ translate(item.label) }}
            </h3>
            <p v-if="item.tag === 'p' && !item.isNote">
              {{ translate(item.label) }}
            </p>
            <div class="note" v-if="item.isNote">
              <p>
                <b v-if="item.isNote && item.style === 'b' && item.tag === 'p'">{{
                  translate(item.label)
                }}</b>
              </p>
              <p v-if="item.isNote && item.tag === 'p' && item.style !== 'b'">
                {{ translate(item.label) }}
              </p>
            </div>
          </div>
        </div> -->
        <!-- *********************** INACTIVE *********************** -->
        <div class="content" v-if="templateState === 'inactive'">
          <h3>{{ translate('notes.important_note_title') }}</h3>
          <p>{{ translate('notes.important_note') }}</p>
          <p>{{ translate('notes.important_note2') }}</p>
          <p>{{ translate('notes.important_note3') }}</p>
          <p>{{ translate('notes.important_note4') }}</p>
        </div>
        <!-- *********************** ACTIVATION *********************** -->
        <Transition name="fade" mode="out-in">
          <div class="content" v-if="templateState === 'activation'">
            <h3 class="content-title">
              {{ translate('notes.important_note_title') }}
            </h3>
            <p>{{ translate('notes.mfa_info_01') }}</p>
            <p>{{ translate('notes.mfa_info_011') }}</p>
            <p>{{ translate('notes.mfa_info_012') }}</p>
            <p>{{ translate('notes.mfa_info_013') }}</p>
            <p>
              <b>{{ translate('notes.mfa_info_014') }}</b>
            </p>
          </div>
          <!-- *********************** ACTIVE *********************** -->
          <div class="code" v-else-if="templateState === 'active'">
            <h3>
              {{ translate('buttons.activate_2fa') }}
            </h3>
            <div class="note">
              <p>
                <b>{{ translate('notes.note') }}</b>
              </p>
              <p>{{ translate('notes.mfa_info_02') }}</p>
            </div>
            <p>{{ translate('notes.installation_instruction') }}</p>
            <p>{{ translate('notes.installation_steps') }}</p>
            <a
              href="https://apps.apple.com/de/app/google-authenticator/id388497605"
              target="_blank"
              class="download"
              >{{ translate('notes.download_ios') }}</a
            >
            <a
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=de&gl=US"
              target="_blank"
              class="download"
              >{{ translate('notes.download_android') }}</a
            >
            <p>{{ translate('notes.installation_steps2') }}</p>
            <img :src="qrCodeUrl" alt="qrcode" class="qrcode" />
            <p class="secret">{{ sharedSecret }}</p>
            <p>{{ translate('notes.installation_steps3') }}</p>
            <input
              v-model="verificationCode"
              class="input-code"
              :maxlength="6"
              type="text"
              name=""
              id=""
              ref="code"
            />
          </div>
        </Transition>
        <!-- *********************** CODE *********************** -->
        <div class="content" v-if="templateState === 'code'">
          <h3 class="content-title">
            {{ translate('notes.important_note_title') }}
          </h3>
          <div class="note">
            <p>{{ translate('notes.download_code_info') }}</p>
          </div>
          <p>{{ translate('notes.backup_codes') }}</p>
          <p>{{ translate('notes.backup_codes_info') }}</p>
          <p>
            <b>{{ translate('notes.backup_codes_info2') }}</b>
          </p>
        </div>
        <!-- *********************** BACKUP *********************** -->
        <div class="content" v-if="templateState === 'backup'">
          <p>
            <b>{{ translate('notes.backup_codes') }}</b>
          </p>
          <p>{{ translate('notes.important_codes_info') }}</p>
          <p>
            <b>{{ translate('notes.backup_codes_info2') }}</b>
          </p>
        </div>
        <!-- *********************** DEACTIVATE *********************** -->
        <div class="content" v-if="templateState === 'deactivate'">
          <p>
            <b>{{ translate('notes.disable_2fa') }}</b>
          </p>
          <div class="note">
            <p>
              <b>{{ translate('notes.note') }}</b>
            </p>
            <p>{{ translate('notes.mfa_info_02') }}</p>
          </div>
          <p>{{ translate('notes.change_device') }}</p>
          <p>
            <b>{{ translate('notes.link_device_info') }}</b>
          </p>
          <p>
            {{ translate('notes.device_instructions') }}
          </p>
          <p>
            <b>{{ translate('notes.disable_2fa') }}</b>
          </p>
          <p>
            {{ translate('notes.confirm_disable_2fa') }}
          </p>
        </div>
        <!-- *********************** INPUTS *********************** -->
        <div class="content" v-if="templateState === 'inputs'">
          <p>
            <b v-if="inputState === 'backup'">{{
              translate('notes.save_codes')
            }}</b>
            <b v-else>{{ translate('notes.deactivate') }}</b>
          </p>
          <p v-if="inputState === 'backup'">
            {{ translate('notes.received_codes_info') }}
          </p>
          <p v-else>{{ translate('notes.generate_codes') }}</p>
          <p v-if="templateState === 'backup'">
            <b>{{ translate('notes.received_codes_info2') }}</b>
          </p>
          <input
            v-model="verificationCode"
            class="input-code code-enter"
            :maxlength="6"
            type="text"
            name=""
            id=""
            ref="code"
          />
        </div>
        <!-- *********************** BUTTONS *********************** -->
        <div class="actions">
          <button
            v-if="templateState === 'backup' || templateState === 'inputs'"
            class="btn"
            :class="templateState !== 'backup' && 'btn-abort'"
            @click="leftAction"
          >
            {{ translate(mapStates[templateState].leftBtn) }}
          </button>
          <button
            class="btn btn-right"
            @click="handleClick"
            :disabled="isDisabled"
            :class="{ 'btn-disabled': isDisabled }"
          >
            {{ getButtonLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, watch, nextTick } from 'vue';
import { useFetch } from '../composables/useFetch';
import { store } from '../store/store';
import { config } from '../config/config';

// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#000',
  },
  font: {
    type: String,
    default: "'Open Sans', sans-serif",
  },
  logoUrl: {
    type: String,
    default: '',
  },
  mfaStatusUrl: {
    type: String,
    default: '',
  },
  mfaActivateUrl: {
    type: String,
    default: '',
  },
  mfaDeactivateUrl: {
    type: String,
    default: '',
  },
  mfaCheckVerificationCodeUrl: {
    type: String,
    default: '',
  },
  mfaDownloadBackupCodesUrl: {
    type: String,
    default: '',
  },
  mfaGenerateQrCodeUrl: {
    type: String,
    default: '',
  },
  mfaGenerateNewBackupCodesUrl: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  props.mfaStatusUrl && getMfaStatus();
  mfaStatus.value = true;
});

const templateState = ref(null);
const isEditing = ref(false);
const initialActivation = ref(true);
const editing = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) store.error = null;
  // TODO check if new activation proccess
  //initialActivation.value = false;
  templateState.value = !mfaStatus.value
    ? mapStates['activation'].template
    : mapStates['backup'].template;
  console.log(templateState.value, templateFields.value);
};
const templateFields = computed(() => {
  return config[templateState.value];
});
const inputState = ref(null);
const changeTemplateState = (up = false) => {
  if (up) {
    templateState.value = mfaStatus.value
      ? mapStates['deactivate'].template
      : mapStates['activate'].template;
  } else {
    if (mfaStatus.value) {
      templateState.value = mapStates['inputs'].template;
      inputState.value = 'backup';
    } else {
      mapStates['inputs'].template;
    }
  }
};
const getButtonLabel = computed(() => {
  return translate(mapStates[templateState.value].label);
});
const isDisabled = computed(() => {
  if (templateState.value === 'active' || templateState.value === 'inputs') {
    return !verificationCode.value || verificationCode.value?.length !== 6
      ? true
      : false;
  }
  return false;
});
const leftAction = () => {
  templateState.value === 'backup'
    ? mfaGenerateNewBackupCodes()
    : (templateState.value = 'backup');
};
const qrCodeUrl = ref(null);
const sharedSecret = ref(null);

const verificationCode = ref(null);
watch(
  () => verificationCode.value,
  (newValue, oldValue) => {
    verificationCode.value = newValue.replace(/[^0-9]/g, '');
  }
);

const mfaStatus = ref(null);
const translateMfaStatus = computed(() => {
  const forTranslation = mfaStatus.value ? 'notes.active' : 'notes.inactive';
  return translate(forTranslation);
});

const prefix = 'cips.mfa.';
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};

const handleClick = () => {
  mapStates[templateState.value].action();
};

const errorMsg = computed(() => {
  setTimeout(() => {
    store.error = null;
  }, 6000);
  return translate(store.error?.replace(prefix, ''));
});
const successMsg = computed(() => {
  setTimeout(() => {
    store.success = null;
  }, 6000);
  return translate(store.success?.replace(prefix, ''));
});

const getMfaStatus = async () => {
  const received = await useFetch(props.mfaStatusUrl, 'GET');
  if (!received.error)
    mfaStatus.value = received.multifactorAuthenticationEnabled;
};

const mfaActivate = async () => {
  const received = await useFetch(props.mfaActivateUrl, 'POST');
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'code';
    console.log('mfa activate', received);
  }
};

const mfaDeactivate = async () => {
  const received = await useFetch(props.mfaDeactivateUrl, 'POST');
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'activation';
    console.log('mfa activate', received);
  }
};

const mfaCheckVerificationCode = async () => {
  console.log('enter', templateState.value);
  const received = await useFetch(props.mfaCheckVerificationCodeUrl, 'POST');
  if (!received.error) {
    console.log('success');
    templateState.value === 'inputs' ? mfaDeactivate() : mfaActivate();
    console.log('mfa verification', received);
  }
  console.log('error');
};

const mfaDownloadBackupCodes = async () => {
  const received = await useFetch(props.mfaDownloadBackupCodesUrl, 'GET');
  if (!received.error) {
    console.log('mfa download codes', received);
  }
};

const code = ref(null);
const mfaGenerateQrCode = async () => {
  const received = await useFetch(props.mfaGenerateQrCodeUrl, 'GET');
  if (!received.error) {
    qrCodeUrl.value = received.QrCodeUrl;
    sharedSecret.value = received.sharedSecret;
    templateState.value = 'active';
    setTimeout(() => {
      code.value?.focus();
    }, 300);
    console.log('mfa qrcode', received);
  }
};

const mfaGenerateNewBackupCodes = async () => {
  const received = await useFetch(props.mfaGenerateNewBackupCodesUrl, 'POST');
  if (!received.error) {
    console.log('mfa new backup codes', received);
  }
};

const mapStates = {
  inactive: { template: 'inactive', label: 'buttons.activate_2fa' },
  active: {
    template: 'active',
    label: 'buttons.activate_2fa',
    action: mfaCheckVerificationCode,
  },
  activation: {
    template: 'activation',
    label: 'buttons.activate_2fa',
    action: mfaGenerateQrCode,
  },
  code: {
    template: 'code',
    label: 'buttons.download_save_codes',
    action: mfaDownloadBackupCodes,
  },
  backup: {
    template: 'backup',
    label: 'buttons.download_save_codes',
    action: changeTemplateState,
    leftBtn: 'buttons.generate_codes',
  },
  deactivate: {
    template: 'deactivate',
    label: 'buttons.2fa_disable',
    action: changeTemplateState,
  },
  inputs: {
    template: 'inputs',
    label: 'buttons.confirm_entry',
    action: mfaCheckVerificationCode,
    leftBtn: 'buttons.abort',
  },
};
</script>
<style lang="scss">
$small: 768px;
$medium: 1200px;
* {
  //color: rgb(93, 93, 93);
}
.comp {
  display: flex;
  flex-direction: column;
  padding: 0;
  font-family: v-bind(font);
  @media screen and (min-width: $medium) {
    padding: 0 0.8em;
  }
  .header {
    display: flex;
    justify-content: space-between;
    background-color: rgb(158, 158, 158);
    align-items: center;
    padding: 17px 15px;
    z-index: 100;
    @media screen and (min-width: $small) {
      padding: 31px 24px;
    }
    @media screen and (min-width: $medium) {
      padding: 0 1em 0 0.5em;
    }

    h1 {
      padding-left: 0.5em;
      font-size: 1.33333em;
      font-weight: 400;
      line-height: 1.44444rem;
      color: #fff;
    }
    .btn-edit {
      background-color: transparent;
      border: none;
      .svg-edit {
        cursor: pointer;
        transition: all 0.25s ease;
        height: 50px;
        width: 50px;
        &:hover {
          stroke-width: 1;
          //transform: scale(1.1);
        }
        @media screen and (min-width: $small) {
          height: 40px;
          width: 40px;
        }
        @media screen and (min-width: $medium) {
          height: 32px;
          width: 32px;
        }
      }
    }
  }
  .error {
    padding: 1em;
    // background-color: rgb(255, 194, 194);
    display: flex;
    align-items: center;
  }
  .error-msg {
    color: rgb(232, 0, 0);
  }
  .success-msg {
    color: rgb(12, 125, 12);
  }
  .subhead {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    height: 5em;
    padding: 1em;
    @media screen and (max-width: $small) {
      grid-template-columns: repeat(2, 1fr);
      height: 6em;
      button {
        grid-column: 1/3;
      }
    }
    h4 {
      margin: 0;
    }
    h6 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.33333rem;
      color: v-bind(primaryColor);
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 0;
    padding: 0;
  }
  .main {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      padding: 1em;
      .content-title {
        margin-bottom: 2em;
      }
    }
    .code {
      display: flex;
      flex-direction: column;
      width: 100%;
      .download {
        text-align: center;
        &:hover {
          color: v-bind(primaryColor);
        }
        &:first-of-type {
          margin-top: 1em;
        }
        &:last-of-type {
          margin-bottom: 1em;
        }
      }
      .qrcode {
        width: 150px;
        height: 150px;
        align-self: center;
        margin: 1em 0;
      }
      .secret {
        margin: 0 auto;
        color: #c31a19;
      }
    }
    .actions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: 1em;
      flex-wrap: wrap;
    }
  }
  .note {
    background-color: #fffbc6;
    padding: 0.5em 1em;
    margin: 1em 0;
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    //white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid trans;
    background-color: v-bind(primaryColor);
    border-color: v-bind(primaryColor);
    font-weight: 400;
    letter-spacing: 0.01rem;
    padding: 0.5em 2em;
    border: 1px solid v-bind(primaryColor);
    border-radius: 0;
    font-size: 1.25rem;
    color: rgb(255, 255, 255);
    vertical-align: middle;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    width: 100%;
    margin-top: 0.5em;
    &:hover {
      font-weight: 600;
      -webkit-box-shadow: none;
      box-shadow: none;
      //color: rgb(255, 255, 255);
      letter-spacing: -0.0075rem;
    }
    @media screen and (min-width: $small) {
      font-size: 1.1rem;
      width: 350px;
    }
    @media screen and (min-width: $medium) {
      font-size: 1rem;
    }
  }
  .btn-state {
    justify-self: flex-end;
  }
  .btn-right {
    margin-left: auto;
  }
  .btn-abort {
    background-color: transparent;
    color: rgb(93, 93, 93);
    border-color: rgb(93, 93, 93);
  }
  .btn-disabled {
    background-color: rgb(158, 158, 158);
    border-color: rgb(158, 158, 158);
    pointer-events: none;
  }
  .input-code {
    position: relative;
    height: 2.5em;
    min-width: 225px;
    padding: 0 20px;
    border: 1px solid rgb(93, 93, 93);
    border-radius: 0;
    font-size: 1.25rem;
    background: rgb(255, 255, 255);
    -webkit-box-shadow: none;
    box-shadow: none;
    text-overflow: ellipsis;
    align-self: center;
    text-align: center;
    &:focus {
      border-color: v-bind(primaryColor);
      outline: 0px none;
      -webkit-box-shadow: 0 0 0 1px v-bind(primaryColor);
      box-shadow: 0 0 0 1px v-bind(primaryColor);
    }
  }
  .code-enter {
    width: 100%;
    padding: 0;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
