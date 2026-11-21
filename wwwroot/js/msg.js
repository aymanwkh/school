const { ref, reactive, onMounted, shallowRef, toRef } = Vue

const snackbar = reactive({ show: false, text: '', color: 'success' });

  function msg (text, color = 'success') {
    snackbar.text = text;
    snackbar.color = color;
    snackbar.show = true;
  };
