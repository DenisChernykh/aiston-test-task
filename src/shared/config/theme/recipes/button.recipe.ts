import { defineRecipe } from '@chakra-ui/react'

export const appButtonRecipe = defineRecipe({
  className: 'app-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12',
    w: 'fit-content',
    h: 'buttonDesktop',
    px: '17',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 'xs',
    fontSize: 'lg',
    lineHeight: 'md',
    fontWeight: 'regular',
    userSelect: 'none',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, color, opacity, box-shadow',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    _focusVisible: {
      outline: 'none',
      boxShadow: '0 0 0 3px var(--chakra-colors-border-focus)',
    },
    _disabled: {
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  variants: {
    variant: {
      solid: {
        bg: 'button.solid.bg',
        color: 'button.solid.fg',
        _hover: { bg: 'button.solid.hoverBg' },
        _active: { bg: 'button.solid.activeBg' },
        _disabled: {
          bg: 'button.solid.disabledBg',
          color: 'button.solid.disabledFg',
        },
      },
      solidMuted: {
        bg: 'button.solidMuted.bg',
        color: 'button.solidMuted.fg',
        _hover: { bg: 'button.solidMuted.hoverBg' },
        _active: { bg: 'button.solidMuted.activeBg' },
        _disabled: {
          bg: 'button.solidMuted.disabledBg',
          color: 'button.solidMuted.disabledFg',
        },
      },
      soft: {
        bg: 'button.soft.bg',
        color: 'button.soft.fg',
        _hover: { bg: 'button.soft.hoverBg' },
        _active: { bg: 'button.soft.activeBg' },
        _disabled: {
          bg: 'button.soft.disabledBg',
          color: 'button.soft.disabledFg',
        },
      },
      softBordered: {
        bg: 'button.softBordered.bg',
        color: 'button.softBordered.fg',
        borderColor: 'button.softBordered.border',
        _hover: {
          bg: 'button.softBordered.hoverBg',
          borderColor: 'button.softBordered.hoverBorder',
          _active: {
            bg: 'button.softBordered.activeBg',
            borderColor: 'button.softBordered.activeBorder',
          },
        },
        _active: {
          bg: 'button.softBordered.activeBg',
          borderColor: 'button.softBordered.activeBorder',
        },
        _disabled: {
          bg: 'button.softBordered.disabledBg',
          color: 'button.softBordered.disabledFg',
          borderColor: 'button.softBordered.disabledBorder',
        },
      },
      outline: {
        bg: 'button.outline.bg',
        color: 'button.outline.fg',
        borderColor: 'button.outline.border',
        _hover: {
          bg: 'button.outline.hoverBg',
          borderColor: 'button.outline.hoverBorder',
        },
        _active: {
          bg: 'button.outline.activeBg',
          borderColor: 'button.outline.activeBorder',
        },
        _disabled: {
          bg: 'button.outline.disabledBg',
          color: 'button.outline.disabledFg',
          borderColor: 'button.outline.disabledBorder',
        },
      },
      floatingOutline: {
        bg: 'button.floatingOutline.bg',
        color: 'button.floatingOutline.fg',
        borderColor: 'button.floatingOutline.border',
        borderWidth: 'floating',
        _hover: {
          bg: 'button.floatingOutline.hoverBg',
          borderColor: 'button.floatingOutline.border',
        },
        _active: {
          bg: 'button.floatingOutline.activeBg',
          borderColor: 'button.floatingOutline.border',
        },
        _disabled: {
          bg: 'button.floatingOutline.disabledBg',
          color: 'button.floatingOutline.disabledFg',
          borderColor: 'button.floatingOutline.disabledBorder',
        },
      },
    },
    size: {
      desktop: {
        h: 'buttonDesktop',
        minH: 'buttonDesktop',
        px: '17',
        borderRadius: 'xs',
        fontSize: 'lg',
        lineHeight: 'md',
        fontWeight: 'regular',
      },
      desktopCompact: {
        h: 'buttonDesktop',
        minH: 'buttonDesktop',
        px: '10',
        borderRadius: 'xs',
        fontSize: 'lg',
        lineHeight: 'md',
        fontWeight: 'regular',
      },
      desktopModal: {
        h: 'buttonDesktop',
        minH: 'buttonDesktop',
        px: '17',
        borderRadius: 'sm',
        fontSize: 'lg',
        lineHeight: 'md',
        fontWeight: 'regular',
      },
      mobile: {
        h: 'buttonMobile',
        minH: 'buttonMobile',
        px: '20',
        borderRadius: 'xs',
        fontSize: 'lg',
        lineHeight: 'md',
        fontWeight: 'medium',
        _disabled: {
          opacity: 0.5,
        },
      },
      floating: {
        h: 'buttonDesktop',
        minH: 'buttonDesktop',
        px: '12',
        borderRadius: 'xs',
        fontSize: 'lg',
        lineHeight: 'md',
        fontWeight: 'regular',
      },
    },
  },
  defaultVariants: {
    variant: 'soft',
    size: 'desktop',
  },
})
