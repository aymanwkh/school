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
app.use(vuetify).mount('#app')