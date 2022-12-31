import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const defaultTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        margin: 0,
        padding: 0,
        bg: '#DCE4E3',
        fontFamily: "'Poppins', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        boxSizing: 'border-box',
      },
    }),
  },
  colors: {
    yellow: {
      base: '#FBA94C',
    },

    red: '#AB222E',

    gray: {
      '50': '#AAAAAA',
      '100': '#DCE4E3',
      '200': '#A0A1A3',
    },

    green: {
      '300': '#8ED7C6',
      '500': '#27A853',
      '600': '#18C29C',
      '700': '#217463',
      '900': '#084236',
    },

    white: {
      '100': '#FFFFFF',
      '200': '#EEF0F0',
      '300': '#E7E7E7',
    },
  },
  components: {
    Button: {
      variants: {
        sidebarButton: {
          width: '100%',
          padding: '1rem',
          borderRadius: '12px',

          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '0.75rem',

          background: 'transparent',
          color: '#084236',
          font: '400 1rem "Poppins", sans-serif',
          cursor: 'pointer',

          '&:hover': {
            background: '#8ED7C6',
            width: '100%',
          },
        },
        menuButton: {
          background: 'transparent',
          cursor: 'pointer',
        },
      },
    },
    Container: {
      variants: {
        cardContainer: {
          width: '20%',
          height: '6rem',
          background: '#FFFFFF',
          borderRadius: '12px',

          margin: 0,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
        },
        patientContainer: {
          width: '100%',
          height: '4rem',
          background: '#FFFFFF',
          borderRadius: '12px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          padding: '1rem',
        },
        inOutCard: {
          width: '50%',
          height: '8rem',
          background: '#FFFFFF',
          borderRadius: '12px',

          margin: 0,

          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          padding: 0,
        },
      },
    },
    Text: {
      variants: {
        cardLabel: {
          fontSize: '0.875rem',
          fontWeight: '400',
          Color: '#A0A1A3',
          lineHeight: 1,

          strong: {
            color: '#18C29C',
          },
        },
        cardNumber: {
          fontSize: '1.75rem',
          fontWeight: '700',
          Color: '#000000',
          lineHeight: 1,
        },
      },
    },
  },
})
