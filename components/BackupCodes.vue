<template>
  <button @click="downloadPDF" class="codes-btn">PDF GEN</button>
  <div id="pdfTable" class="codes-main" ref="pdfGenerateTable">
    <div style="display: block; margin: 0 auto; width: fit-content">
      <img width="200" :src="logoImg" class="codes-img" ref="image" />
    </div>
    <hr
      class="codes-hr"
      :style="{ 'background-color': `${primaryColor}`, height: '2em' }"
    />
    <h1
      style="
        text-align: center;
        border-bottom: 1px solid rgb(93, 93, 93);
        align-self: center;
        padding: 1.5em 0 0.5em 0;
        line-height: 1;
        width: fit-content;
        margin: 0 auto;
      "
      class="codes-title"
    >
      BackUp-Codes für Ihre 2-Faktor-Authentifizierung
    </h1>
    <div
      style="display: block; margin: 0 auto; width: fit-content"
      class="code-content"
    >
      <div
        style="display: flex; padding: 1.5em; align-items: center"
        v-for="(code, i) in codes"
        :key="i"
        class="code-block"
      >
        <div
          :style="{
            'background-color': `${primaryColor}`,
            'border-radius': ' 50%',
            height: '2em',
            width: '2em',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'margin-right': '1em',
            'font-weight': '700',
            color: '#fff',
            'font-size': '1.7em',
          }"
        >
          {{ i + 1 }}
        </div>
        <span style="font-size: 1.5em">{{ code }}</span>
      </div>
    </div>
    <footer
      style="
        background-color: rgb(50, 50, 50);
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        color: #fff;
      "
    >
      <div class="info" style="padding: 2em">
        <p style="margin: 0">cadooz</p>
        <p style="margin: 0">GmbHOsterbekstraße 90b</p>
        <p style="margin: 0">22083 Hamburg – Germany</p>
      </div>
      <div class="info" style="padding: 2em">
        <img width="150" :src="footerLogo" :alt="footerLogo" />
      </div>
    </footer>
  </div>
</template>
<script>
import { resolveUrl } from "../utils/resolveUrl";
import { ref } from "vue";
export default {
  setup() {
    const baseurl = resolveUrl("a");
    const footerLogo = ref(
      baseurl.replace("cips/a", "images/cips/cadooz_IPS_Logo_1c.png")
    );
    return {
      baseurl,
      footerLogo,
    };
  },
  data() {
    return {
      backupCodes: ["255895", "368965", "257459", "988963", "553569"],
    };
  },
  props: {
    logoUrl: {
      type: String,
      default: "../../assets/UllaPopken_logo_new.svg",
    },
    primaryColor: {
      type: String,
      default: "",
    },
    codes: {
      type: Array,
      default: [255895, 368965, 257459, 988963, 553569],
    },
  },
  methods: {
    downloadPDF() {
      let w = window.open();
      w.document.write(this.$refs.pdfGenerateTable.innerHTML);
      w.document.close();
      w.setTimeout(() => {
        w.print();
      }, 1000);
    },
  },

  computed: {
    logoImg() {
      return this.logoUrl.replace('url("', "").replace('")', "");
    },
  },
};
</script>

<style lang="scss"></style>
