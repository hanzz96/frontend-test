// Styles
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import 'vuetify/styles'
import { createVuetify, ThemeDefinition  } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/lib/util/colors'

const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
        themes: { 
         light:{
           colors: {           
             primary: '#1976D2',
             sheet : colors.grey.lighten3,
             copyright : colors.grey.lighten5,
           }
         },
         dark:{
          colors: {           
             primary: '#212121',
             sheet : colors.shades.black,
             copyright : colors.grey.darken4,
          }
         }
        }
    },
    icons: {
      defaultSet: 'mdi', // This is already the default value - only for display purposes
    }
  })

export default vuetify