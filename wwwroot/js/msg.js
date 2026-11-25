const { ref, reactive, onMounted, shallowRef, toRef } = Vue
const flashMessage = document.getElementById('flash-message')
console.log('flashMessage == ', flashMessage.value)
const snackbar = reactive({ 
  show: flashMessage.value.length > 0, 
  text: flashMessage.value ?? '', 
  color: 'success' 
});

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