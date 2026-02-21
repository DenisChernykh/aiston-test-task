import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    tokens: {
      colors: {
        neutral: {
          white: { value: '#FFFFFF' },
          0: { value: '#FEFEFE' },
          50: { value: '#F1F1F1' },
          100: { value: '#E8E8E8' },
          150: { value: '#DDDDDD' },
          300: { value: '#D9E1EC' },
          400: { value: '#B0B0B0' },
          450: { value: '#ABABAB' },
          900: { value: '#1C1C1C' },
          925: { value: '#111111' },
          black: { value: '#000000' },
        },
        blue: {
          500: { value: '#2D60FD' },
        },
        green: {
          100: { value: '#A2E3A4' },
          700: { value: '#0E7411' },
        },
        yellow: {
          100: { value: '#FFEBB3' },
          700: { value: '#CC892A' },
        },
        red: {
          700: { value: '#B93C3C' },
        },
        purple: {
          100: { value: '#F0CDFA' },
        },
        overlay: {
          scrim: { value: 'rgba(0,0,0,0.5)' },
        },
      },
      radii: {
        xs: { value: '4px' },
        sm: { value: '5px' },
        md: { value: '6px' },
        lg: { value: '8px' },
        xl: { value: '14px' },
        '2xl': { value: '15px' },
        pill: { value: '20px' },
        full: { value: '9999px' },
      },
      spacing: {
        0: { value: '0px' },
        2: { value: '2px' },
        4: { value: '4px' },
        5: { value: '5px' },
        6: { value: '6px' },
        8: { value: '8px' },
        10: { value: '10px' },
        12: { value: '12px' },
        13: { value: '13px' },
        14: { value: '14px' },
        16: { value: '16px' },
        17: { value: '17px' },
        20: { value: '20px' },
        24: { value: '24px' },
        30: { value: '30px' },
        32: { value: '32px' },
        35: { value: '35px' },
        36: { value: '36px' },
        40: { value: '40px' },
        46: { value: '46px' },
      },
      sizes: {
        fieldDesktop: { value: '48px' },
        fieldMobile: { value: '42px' },
        buttonDesktop: { value: '40px' },
        buttonMobile: { value: '50px' },
        tableRow: { value: '40px' },
        headerDesktop: { value: '86px' },
        iconXs: { value: '12px' },
        iconSm: { value: '14px' },
        iconMd: { value: '18px' },
        iconLg: { value: '24px' },
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
      fontSizes: {
        xs: { value: '12px' },
        sm: { value: '13px' },
        md: { value: '14px' },
        lg: { value: '16px' },
        xl: { value: '20px' },
        '2xl': { value: '24px' },
      },
      fontWeights: {
        light: { value: '300' },
        regular: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
      },
      lineHeights: {
        tight: { value: '15px' },
        sm: { value: '20px' },
        md: { value: '24px' },
        lg: { value: '29px' },
      },

      letterSpacings: {
        titleMobile: { value: '-0.2px' },
        normal: { value: '0px' },
        compact: { value: '0.28px' },
        codeTag: { value: '0.96px' },
      },

      durations: {
        fast: { value: '120ms' },
        normal: { value: '160ms' },
        slow: { value: '220ms' },
      },

      easings: {
        standard: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          canvas: { value: '{colors.neutral.white}' },
          surface: { value: '{colors.neutral.50}' },
          field: { value: '{colors.neutral.0}' },
          overlay: { value: '{colors.overlay.scrim}' },
        },
        text: {
          primary: { value: '{colors.neutral.900}' },
          secondary: { value: '{colors.neutral.450}' },
          muted: { value: '{colors.neutral.400}' },
          inverse: { value: '{colors.neutral.white}' },
          success: { value: '{colors.green.700}' },
          danger: { value: '{colors.red.700}' },
        },
        border: {
          subtle: { value: '{colors.neutral.300}' },
          default: { value: '{colors.neutral.400}' },
          hover: { value: '{colors.neutral.450}' },
          strong: { value: '{colors.neutral.900}' },
          error: { value: '{colors.red.700}' },
          focus: { value: 'rgba(28,28,28,0.28)' },
        },
        status: {
          newBg: { value: '{colors.purple.100}' },
          inProgressBg: { value: '{colors.yellow.100}' },
          doneBg: { value: '{colors.green.100}' },
          closedBg: { value: '{colors.neutral.50}' },
          fg: { value: '{colors.neutral.900}' },
        },

        priority: {
          critical: { value: '{colors.red.700}' },
          high: { value: '{colors.red.700}' },
          medium: { value: '{colors.yellow.700}' },
          low: { value: '{colors.blue.500}' },
        },

        sla: {
          ok: { value: '{colors.green.700}' },
          breach: { value: '{colors.red.700}' },
          neutral: { value: '{colors.neutral.900}' },
          empty: { value: 'rgba(28,28,28,0.3)' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
