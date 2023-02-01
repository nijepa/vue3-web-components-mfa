<template>
  <button @click="generateReport" class="codes-btn">gen</button>
  <!-- <vue3-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    > -->
  <!-- <section slot="pdf-content"> -->
  <div id="pdfTable" class="codes-main" ref="pdfTable">
    <img :src="img" class="codes-img" ref="image" />
    <!-- <canvas id="viewport" ref="image"></canvas> -->
    <hr class="codes-hr" />
    <h1 class="codes-title">
      BackUp-Codes für Ihre 2-Faktor-Authentifizierung
    </h1>
    <div class="code-content">
      <div v-for="(code, i) in codes" :key="i" class="code-block">
        <div class="code-circle">{{ i + 1 }}</div>
        <span class="code-code">{{ code }}</span>
      </div>
    </div>
    <footer>
      <div class="">
        <p>cadooz</p>
        <p>GmbHOsterbekstraße 90b</p>
        <p>22083 Hamburg – Germany</p>
      </div>
      <div class=""></div>
    </footer>
  </div> 
  <!-- </section>
    </vue3-html2pdf> -->
</template>
<!-- 
<script>
import Vue3Html2pdf from 'vue3-html2pdf'
export default {
  props: {
    logoUrl: {
    type: String,
    default: '../../assets/UllaPopken_logo_new.svg',
  },
  primaryColor: {
    type: String,
    default: '',
  },
  codes: {
    type: Array,
    default: [255895, 368965, 257459, 988963, 553569],
  },
  },
    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }
    },
 
    components: {
        Vue3Html2pdf
    }
}
</script> -->
<script setup>
import htmlToPdfmake from 'html-to-pdfmake';
 //import * as pdfFonts from 'pdfmake/build/vfs_fonts';
 //import  pdfMake from 'pdfmake';


import { ref, onMounted } from 'vue';
const props = defineProps({
  logoUrl: {
    type: String,
    default: '../../assets/UllaPopken_logo_new.svg',
  },
  primaryColor: {
    type: String,
    default: '',
  },
  codes: {
    type: Array,
    default: [111111, 222222, 333333, 444444, 555555],
  },
});
const image = ref(null);
let context = undefined;
onMounted(() => {
  setTimeout(()=> {
    const canvas = image.value;
    context = canvas.getContext('2d');

    make_base();
  }, 500)
  
});
let img = props.logoUrl.replace('url("', '').replace('")', '');
console.log(8, img)
let base_image = undefined
function make_base() {
  base_image = new Image();
  
  base_image.src = img
  console.log(img, base_image);
  base_image.onload = function () {
    context.drawImage(base_image, 0, 0);
  };
}
//const img = props.logoUrl.toDataURL()

const pdfTable = ref(null);
//const pdfTable = document.getElementById("pdf-content");
//console.log(pdfTable.innerHTML)
const generateReport = () => {
  console.log(3, image.value);
  
  //var html = htmlToPdfmake(pdfTable.value.innerHTML);
  var html = htmlToPdfmake(image.value, {
  imagesByReference:true
});
  const documentDefinition = {
    content: html.content,
    images:html.images
    // styles: {
    //   red: {
    //     // we define the class called "red"
    //     color: 'red',
    //   },
    // }
  };
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
  pdfMake.createPdf(documentDefinition).open();
};
// const generateReport = () => {
//   console.log(html2Pdf.value)
//   html2Pdf.value.generatePdf()
// html2pdf(document.value, {
//   margin: 0.1,
//   filename: 'BackupCodes.pdf',
//   pagebreak: { after: '.sautDePage' },
//   image: {
//     type: 'jpeg',
//     quality: 0.98,
//   },
//   html2canvas: {
//     scale: 2,
//     letterRendering: true,
//   },
//   jsPDF: {
//     unit: 'in',
//     format: 'a4',
//     orientation: 'portrait',
//   },
// });
// };
</script>
<style lang="scss"></style>
