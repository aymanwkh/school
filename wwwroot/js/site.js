// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const app = Vue.createApp({setup})
app.config.warnHandler = (msg, instance, trace) => {
  if (msg.includes('Vuetify: Translation key')) return;
  console.warn(msg, instance, trace); // Log everything else
};
const vuetify = Vuetify.createVuetify({
  locale: {
    locale: 'ar',       // Current locale
    fallback: 'en',
  },
})
const Toast = {
  props: ['show'],
  template: `
  <v-snackbar
      color="success"
      location="bottom start"
      prepend-icon="$success"
      :text="msg"
      timeout="-1"
      title="Success"
      contained
      model-value
      v-model="alert"
  >
      <template v-slot:actions>
      <v-btn
          class="px-3"
          density="comfortable"
          rounded="lg"
          text="Got it!"
          variant="tonal"
          @click.stop
      ></v-btn>
      </template>
  </v-snackbar>
  `,
  data() {
    return {
      msg: '',
      alert: false,
      showMsg(p_msg) {
        this.msg = p_msg
        this.alert = true
      }
    }
  }
};
app.component('toast', Toast);
app.use(vuetify).mount('#app')
