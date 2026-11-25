// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const app = Vue.createApp({
  setup() {
    return { snackbar, msg, error, ...main() }
  }
})
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
const Display = {
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    long: {
      type: Boolean,
    },
    path: {
      type: String,
    },
  },
  template: `
  <v-col :md="long ? 12 : 6" cols="12" class="my-0">

  <v-list lines="one" density="compact">
      <v-list-item class="border-b">
        <!-- Label on the left -->
        <v-list-item-title class="text-body-2 text-medium-emphasis">
          {{label}}
        </v-list-item-title>

        <!-- Value on the right using the append slot -->
        <template #append>
          <v-chip v-if="!!path" size="small" label>{{value}}</v-chip>
          <span v-else>{{value}}</span>
        </template>
      </v-list-item>
    </v-list>
    </v-col>
  `,
};
const DisplayPageTitle = {
  props: {
    title: {
      type: String,
    },
    editLink: {
      type: String,
    },
    remove: {
      type: Boolean,
    },
    save: {
      type: Boolean,
    },
    others: {
      type: Boolean,
    },
    addLink: {
      type: String,
    },
    search: {
      type: Boolean,
    },
  },
  template: `
    <v-toolbar :title="title"> 
      <template v-slot:append v-if="!!editLink || remove || others">
      <v-btn icon="mdi-dots-vertical" id="menu-btn"></v-btn>
    </template>
    <template v-slot:append v-if="!!addLink">
      <v-btn icon="mdi-plus" :href="addLink" color="success">
        <template v-slot>
          <v-icon size="24"></v-icon>
        </template>
      </v-btn>
    </template>
    <template v-slot:append v-if="save">
      <v-btn icon="mdi-content-save-outline" :href="addLink" color="success">
        <template v-slot>
          <v-icon size="30"></v-icon>
        </template>
      </v-btn>
    </template>
  </v-toolbar>
    <v-menu activator="#menu-btn" location="bottom end" offset="4">
      <v-list
        bg-color="surface-light"
        class="d-flex flex-column ga-1 pa-1"
        density="compact"
        rounded="lg"
        variant="text"
        slim
      >
        <v-list-item
          v-if="!!editLink"
          append-icon="mdi-pencil"
          rounded="lg"
          title="تعديل"
          :href="editLink"
        ></v-list-item>

        <v-list-item
          v-if="remove"
          append-icon="mdi-trash-can-outline"
          rounded="lg"
          title="حذف"
          link
        ></v-list-item>

        <v-list-item
          v-if="others"
          append-icon="mdi-cog"
          rounded="lg"
          title="اخرى"
          link
        ></v-list-item>
      </v-list>
    </v-menu>

  `,
  data() {
    return {
      menu: false,
    }
  },
};

app.component('display', Display);
app.component('page-title', DisplayPageTitle);
app.use(vuetify).mount('#app')
