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
      <Transition name="slide-up" appear>
        <button v-if="0 === 1" class="btn btn-state">2-Faktor</button>
      </Transition>
    </div>
    <hr v-if="isEditing" />

    <Transition name="slide-up" appear>
      <div class="main" v-if="isEditing">
        <!-- *********************** INACTIVE *********************** -->
        <div class="content" v-if="templateState === 'inactive'">
          <h3>{{ translate('notes.important_note_title') }}</h3>
          <p>{{ translate('notes.important_note') }}</p>
        </div>
        <!-- *********************** ACTIVATION *********************** -->
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
        <div class="code" v-if="templateState === 'active'">
          <h3>
            {{ translate('buttons.activate_2fa') }}
          </h3>
          <div class="note">
            <p>{{ translate('notes.note') }}</p>
            <p>{{ translate('notes.mfa_info_02') }}</p>
          </div>
          <p>{{ translate('notes.installation_instruction') }}</p>
          <p>{{ translate('notes.installation_steps') }}</p>
          <a href="#" class="download">{{ translate('notes.download_ios') }}</a>
          <a href="#" class="download">{{
            translate('notes.download_android')
          }}</a>
          <p>{{ translate('notes.installation_steps2') }}</p>
          <img src="" alt="qrcode" class="qrcode" />
          <p>{{ translate('notes.installation_steps3') }}</p>
          <input
            v-model="verificationCode"
            class="input-code"
            :maxlength="6"
            type="text"
            name=""
            id=""
          />
          {{ verificationCode }}
        </div>
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
          <p>{{ translate('notes.backup_codes') }}</p>
          <p>{{ translate('notes.important_codes_info') }}</p>
          <p>
            <b>{{ translate('notes.backup_codes_info2') }}</b>
          </p>
        </div>
        <!-- *********************** DEACTIVATION *********************** -->
        <div class="content" v-if="templateState === 'deactivation'">
          <p>
            <b>{{ translate('notes.save_codes') }}</b>
          </p>
          <p>{{ translate('notes.received_codes_info') }}</p>
          <p>
            <b>{{ translate('notes.received_codes_info2') }}</b>
          </p>
          <input
            v-model="verificationCode"
            class="input-code"
            type="number"
            name=""
            id=""
          />
        </div>
        <!-- *********************** BUTTONS *********************** -->
        <div class="actions">
          <button v-if="templateState === 'code'" class="btn">
            {{ translate('buttons.generate_codes') }}
          </button>
          <button class="btn btn-right" @click="handleClick">
            {{ getButtonLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, watch } from 'vue';
import { useFetch } from '../composables/useFetch';
import { store } from '../store/store';

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
  mfaCheckVerificationCodeUrl: {
    type: String,
    default: '',
  },
});
console.log(props);
onMounted(() => {
  props.mfaStatusUrl && getMfaStatus();
});

const templateState = ref(null);
const isEditing = ref(false);
const editing = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) store.error = null;
  templateState.value = !mfaStatus.value
    ? mapStates['activation'].template
    : mapStates['code'].template;
};
const getButtonLabel = computed(() => {
  return translate(mapStates[templateState.value].label);
});

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

const mfaCheckVerificationCode = async () => {
  const received = await useFetch(props.mfaCheckVerificationCodeUrl, 'POST');
  if (!received.error) {
    console.log('mfa verification', received);
  }
};

const mapStates = {
  inactive: { template: 'inactive', label: '' },
  active: { temlplate: 'active', label: '' },
  activation: {
    template: 'activation',
    label: 'buttons.activate_2fa',
    action: mfaActivate,
  },
  code: {
    template: 'code',
    label: 'buttons.activate_2fa',
    action: mfaCheckVerificationCode,
  },
  backup: { template: 'backup', label: '' },
  deactivation: { template: 'deactivation', label: '' },
};
</script>
<style lang="scss">
* {
  color: rgb(93, 93, 93);
}
.comp {
  display: flex;
  flex-direction: column;
  padding: 0 0.8em 0 0.8em;
  font-family: v-bind(font);
  .header {
    display: flex;
    justify-content: space-between;
    background-color: rgb(158, 158, 158);
    align-items: center;
    padding: 0 1em 0 0.5em;
    z-index: 100;
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
        &:hover {
          stroke-width: 1;
          //transform: scale(1.1);
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
      }
      .download:first-of-type {
        margin-top: 1em;
      }
      .download:last-of-type {
        margin-bottom: 1em;
      }
      .qrcode {
        width: 150px;
        height: 150px;
        align-self: center;
      }
    }
    .actions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: 1em;
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
    white-space: nowrap;
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
    &:hover {
      font-weight: 600;
      -webkit-box-shadow: none;
      box-shadow: none;
      color: rgb(255, 255, 255);
      letter-spacing: -0.0075rem;
    }
  }
  .btn-state {
    justify-self: flex-end;
  }
  .btn-right {
    margin-left: auto;
  }
  .input-code {
    position: relative;
    height: 2.5em;
    min-width: 225px;
    padding: 0 20px;
    border: 1px solid rgb(93, 93, 93);
    border-radius: 0;
    font-size: 1.1rem;
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
</style>
