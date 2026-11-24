const { ref, reactive, onMounted, shallowRef, toRef } = Vue

const snackbar = reactive({ show: false, text: '', color: 'success' });

  function msg (text) {
    snackbar.text = text;
    snackbar.color = 'success';
    snackbar.show = true;
  };
  function error (text) {
    snackbar.text = text;
    snackbar.color = 'error';
    snackbar.show = true;
  };