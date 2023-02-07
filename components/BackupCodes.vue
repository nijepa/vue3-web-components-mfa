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
      <div class="info">
        <p>cadooz</p>
        <p>GmbHOsterbekstraße 90b</p>
        <p>22083 Hamburg – Germany</p>
      </div>
      <div class="info">
        <img src="../assets/ips.png" alt="">
      </div>
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
// import htmlToPdfmake from 'html-to-pdfmake';
// import  pdfMake from 'pdfmake/build/pdfmake';
//  import pdfFonts from 'pdfmake/build/vfs_fonts';
 


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
    default: () => ['11111111', '22222222', '33333333', '44444444', '55555555'],
  },
});
 const image = ref(null);
 var base64 
// let context = undefined;
onMounted(async () => {
  


    base64 = await getBase64FromUrl(img.src);
    base64 = base64.replace('text/html', 'image/jpeg')
    console.log(555, base64)
  
});

let img = props.logoUrl.replace('url("', '').replace('")', '');

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    //blob.Properties.ContentType = "image/jpeg"
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}

//const base65 = getBase64FromUrl(img.src)
const getBase64Image = (img) => {
  var canvas = document.createElement("canvas");
console.log(99,img)
if(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  console.log(canvas)
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  console.log(777, dataURL)
  return dataURL//.replace(/^data:image\/?[A-z]*;base64,/);
}
}

//var base64 = getBase64Image(document.getElementById("imageid"));

//getBase64Image(imgag)
 console.log(8, base64)
// let base_image = undefined
// function make_base() {
//   base_image = new Image();
  
//   base_image.src = img
//   console.log(7, base_image);
//   base_image.onload = function () {
//     context.drawImage(base_image, 0, 0);
//   };
// }
//const img = props.logoUrl.toDataURL()


// function getSvgUrl(svg) {
//     //return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
// }
// const png = undefined
// function svgUrlToPng(svgUrl, callback) {
//     const svgImage = document.createElement('img');
//     // imgPreview.style.position = 'absolute';
//     // imgPreview.style.top = '-9999px';
//     document.body.appendChild(svgImage);
//     svgImage.onload = function () {
//         const canvas = document.createElement('canvas');
//         canvas.width = svgImage.clientWidth;
//         canvas.height = svgImage.clientHeight;
//         const canvasCtx = canvas.getContext('2d');
//         canvasCtx.drawImage(svgImage, 0, 0);
//         const imgData = canvas.toDataURL('image/png');
//         png = canvas.toDataURL('image/png');
//         callback(imgData);
//         // document.body.removeChild(imgPreview);
//     };
//     svgImage.src = svgUrl;
//  }

//  svgUrlToPng(props.logoUrl)
//  setTimeout(() => {
//  console.log(9, png)
//  },2000)


var dd = {
	content: [
		'pdfmake (since it\'s based on pdfkit) supports JPEG and PNG format',
		'If no width/height/fit is provided, image original size will be used',
		// {
		// 	image: props.logoUrl,
		// },
		'If you specify width, image will scale proportionally',
		// {
		// 	image: props.logoUrl,
		// 	width: 150
		// },
		'If you specify both width and height - image will be stretched',
		// {
		// 	image: props.logoUrl,
		// 	width: 150,
		// 	height: 150,
		// },
		'You can also fit the image inside a rectangle',
		// {
		// 	image: 'sampleImage.jpg',
		// 	fit: [100, 100],
		// 	pageBreak: 'after'
		// },
	
		// Warning! Make sure to copy this definition and paste it to an
		// external text editor, as the online AceEditor has some troubles
		// with long dataUrl lines and the following image values look like
		// they're empty.
		'Images can be also provided in dataURL format...',

		'or be declared in an "images" dictionary and referenced by name',

		// {
		// 	image: props.logoUrl,
		// 	width: 150,
		// 	opacity: 0.5
		// },
	],
	images: {
		building: base64
	}
	
}



const pdfTable = ref(null);
//const pdfTable = document.getElementById("pdf-content");
console.log(2, pdfTable)
const generateReport = () => {
  console.log(3, base64);
  
  var html = htmlToPdfmake(dd);
//   var html = htmlToPdfmake(image.value, {
//   imagesByReference:true
// });
  const documentDefinition = {
    content: html,
    images:html.images
    // styles: {
    //   red: {
    //     // we define the class called "red"
    //     color: 'red',
    //   },
    // }
  };
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
  pdfMake.createPdf(dd).open();
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
