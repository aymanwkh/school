const { createApp } = Vue;

    // Step 1: Define the component options object
    const CustomButton = {
      props: ['buttonText'],
      template: `
        <button @click="count++" style="padding: 10px; background: #42b983; color: white;">
          {{ buttonText }} - Clicked {{ count }} times
        </button>
      `,
      data() {
        return {
          count: 0
        }
      }
    };

    // Step 2: Initialize Vue and register the component
    const app = createApp({});

    // Register globally: (Component Name, Component Object)
    app.component('custom-button', CustomButton);

    app.mount('#app');
