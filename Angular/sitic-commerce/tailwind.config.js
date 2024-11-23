const plugin = require('tailwindcss/plugin');

function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`;
        }
        return `rgba(var(${variable}), ${opacityValue})`;
    };
}
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: ':root',
  theme: {
    extend: {
        backgroundColor: theme => ({
            ...theme('colors'),
            base: 'var(--background-base)',
            foreground: withOpacityValue('--background-foreground-rgb'),
            'app-bar': 'var(--background-app-bar)',
            'row-striped': 'var(--background-table-row-striped)',
            hover: 'var(--background-hover)',
            selected: 'var(--background-selected) !important'
        }),
        boxShadow: {
            b: '0 10px 30px 0 rgba(82,63,104,.06)'
        },
        fontFamily: {
            sans: [
                '"Inter var"',
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple ColorDef Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto ColorDef Emoji"',
            ],
            serif: [
                'Georgia',
                'Cambria',
                '"Times New Roman"',
                'Times',
                'serif',
            ],
            mono: [
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        fontSize: {
            '2xs': '0.625rem'
        },
        margin: (theme, { negative }) => ({
            ...negative({
                gutter: 'var(--padding-gutter)'
            })
        }),
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    plugin(function({ addUtilities, addComponents }) {
        addUtilities({
                '.icon-base': {
                    'font-size': '1.5rem !important',
                    'height': '1.5rem !important',
                    'width': '1.5rem !important',
                    'min-width': '1.5rem !important',
                    'min-height': '1.5rem !important',
                    'line-height': '1.5rem !important'
                },
                // Tipografia
                '.body-1': {
                  'font-weight': '400',
                  'line-height': '16px',
                  'font-size': '14px',
              },
              '.body-2': {
                  'font-weight': '500',
                  'line-height': '18px',
                  'font-size': '16px',
              },
              '.subheading-1': {
                  'font-weight': '400',
                  'line-height': '20px',
                  'font-size': '16px',
              },
              '.subheading-2': {
                  'font-weight': '500',
                  'line-height': '22px',
                  'font-size': '18px',
              },
              '.title': {
                  'font-weight': '500',
                  'line-height': '22px',
                  'font-size': '20px',
              },
              '.headline': {
                  'font-weight': '400',
                  'line-height': '24px',
                  'font-size': '22px',
              },
              '.display-1': {
                  'font-weight': '400',
                  'line-height': '35px',
                  'font-size': '32px',
              },
              '.button': {
                  'font-weight': '400',
                  'line-height': '14px',
                  'font-size': '14px',
              },
              '.BUTTON-CAPS': {
                  'font-weight': '500',
                  'line-height': '14px',
                  'font-size': '14px',
              },
              '.label-3': {
                  'font-weight': '400',
                  'line-height': '12px',
                  'font-size': '10px',
              },
              '.label-2': {
                  'font-weight': '500',
                  'line-height': '14px',
                  'font-size': '12px',
              },
              '.label-1': {
                  'font-weight': '500',
                  'line-height': '16px',
                  'font-size': '14px',
              },
              '.tooltip': {
                  'font-weight': '500',
                  'line-height': '11px',
                  'font-size': '12px',
              },
              '.caption-strong': {
                  'font-weight': '600',
                  'line-height': '12px',
                  'font-size': '12px',
              },
              '.caption': {
                  'font-weight': '400',
                  'line-height': '12px',
                  'font-size': '12px',
              },
              '.body-1-strong': {
                  'font-weight': '600',
                  'line-height': '16px',
                  'font-size': '14px',
              },
              '.warn-secondary': {
                    'background-color': '#FFDAD6',
                    'color': '#BA1A1A'
                },
                '.text-secondary': {
                    'color': 'rgba(0, 0, 0, .54) !important'
                },
                '.mat-table': {
                        'border-collapse': 'separate'
                    },
            }),
            addComponents({})
    })
],
}

