import { chakra, type HTMLChakraProps } from '@chakra-ui/react'

type IconProps = HTMLChakraProps<'svg'>

export function PlusIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 24" fill="none" {...props}>
      <path
        d="M6 5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H8V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V13H1C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H6V5Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function ExportIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 15 15" fill="none" {...props}>
      <path
        opacity="0.5"
        d="M4.54765 8.28088H5.22618V6.51618H6.31147C6.50441 6.51618 6.66588 6.45118 6.79588 6.32118C6.92588 6.19059 6.99088 6.02941 6.99088 5.83765V4.75147C6.99088 4.55912 6.92588 4.39794 6.79588 4.26794C6.66588 4.13794 6.50471 4.07294 6.31235 4.07294H4.54765V8.28088ZM5.22618 5.83677V4.75147H6.31147V5.83677H5.22618ZM7.90765 8.28088H9.60441C9.79676 8.28088 9.95794 8.21588 10.0879 8.08588C10.2174 7.95529 10.2821 7.79412 10.2821 7.60235V4.75147C10.2821 4.55912 10.2174 4.39794 10.0879 4.26794C9.95794 4.13794 9.79676 4.07294 9.60441 4.07294H7.90765V8.28088ZM8.58618 7.60147V4.75147H9.60441V7.60147H8.58618ZM11.3691 8.28088H12.0476V6.51618H13.2697V5.83677H12.0476V4.75147H13.2697V4.07206H11.3691V8.28088ZM4.07206 12.3529C3.66618 12.3529 3.32735 12.2171 3.05559 11.9453C2.78382 11.6735 2.64765 11.3344 2.64706 10.9279V1.425C2.64706 1.01912 2.78324 0.680002 3.05559 0.407649C3.32794 0.135296 3.66706 -0.000586334 4.07294 1.90162e-06H13.575C13.9809 1.90162e-06 14.32 0.135884 14.5924 0.407649C14.8647 0.679413 15.0006 1.01853 15 1.425V10.9279C15 11.3338 14.8641 11.6726 14.5924 11.9444C14.3206 12.2162 13.9812 12.3524 13.5741 12.3529H4.07206ZM1.42765 15C1.02 15 0.680002 14.8641 0.407649 14.5924C0.135296 14.3206 -0.000586334 13.9806 1.90162e-06 13.5724V3.19059H0.882355V13.575C0.882355 13.7103 0.938825 13.8347 1.05177 13.9482C1.16471 14.0618 1.28912 14.1182 1.425 14.1176H11.8103V15H1.42765Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14 16L18 12L14 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </chakra.svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 7 5" fill="none" display="block" {...props}>
      <path
        opacity="0.7"
        d="M3.92842 4.78818C3.71754 5.07061 3.28246 5.07061 3.07158 4.78818L0.100854 0.809506C-0.15132 0.471772 0.0983586 3.50314e-07 0.529273 3.87985e-07L6.47073 9.07404e-07C6.90164 9.45076e-07 7.15132 0.471772 6.89915 0.809506L3.92842 4.78818Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function UserCircleIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9.2" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.5 17.2C7.6 15.5 9.6 14.4 12 14.4C14.4 14.4 16.4 15.5 17.5 17.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </chakra.svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function PlusSmallIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M6.22222 14V7.77778H0V6.22222H6.22222V0H7.77778V6.22222H14V7.77778H7.77778V14H6.22222Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function FilterAltIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M5.25192 12C5.03997 12 4.8623 11.9281 4.71892 11.7844C4.57554 11.6406 4.50385 11.4625 4.50385 11.25V6.75L0.165016 1.2C-0.0220022 0.95 -0.050055 0.6875 0.0808581 0.4125C0.211771 0.1375 0.439311 0 0.763476 0H11.2365C11.5607 0 11.7882 0.1375 11.9191 0.4125C12.0501 0.6875 12.022 0.95 11.835 1.2L7.49615 6.75V11.25C7.49615 11.4625 7.42446 11.6406 7.28108 11.7844C7.1377 11.9281 6.96003 12 6.74807 12H5.25192ZM6 6.225L9.70297 1.5H2.29703L6 6.225Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function DotUpChevronIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7.4 15.375L6 13.975L12 7.97501L18 13.975L16.6 15.375L12 10.8L7.4 15.375Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function DotDoubleChevronIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7.4 18.3766L6 16.9766L12 10.9766L18 16.9766L16.6 18.3766L12 13.8016L7.4 18.3766ZM7.4 12.3766L6 10.9766L12 4.97656L18 10.9766L16.6 12.3766L12 7.80156L7.4 12.3766Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function DotDiamondIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 7.5L16.5 12L12 16.5L7.5 12L12 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </chakra.svg>
  )
}

export function SlaCheckIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.4 7.1L6.2 8.9L9.7 5.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </chakra.svg>
  )
}

export function SlaAlertIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 4.2V7.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="9.9" r="0.9" fill="currentColor" />
    </chakra.svg>
  )
}

export function SlaNeutralDashIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M3.5 7H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </chakra.svg>
  )
}

export function SlaNeutralClockIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="9" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 4.8V7L10.6 8.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 4.1H4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 9.1H4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </chakra.svg>
  )
}

export function ArrowBackIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19 11H7.83L13.41 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H19V11Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export function CloseSmallIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M4 4L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </chakra.svg>
  )
}

export function UploadImageIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 4.5H19C20.1 4.5 21 5.4 21 6.5V17.5C21 18.6 20.1 19.5 19 19.5H5C3.9 19.5 3 18.6 3 17.5V6.5C3 5.4 3.9 4.5 5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="8.2" cy="9" r="1.6" fill="currentColor" />
      <path
        d="M20 16.8L15.2 12.3L11.2 16L8.8 13.7L4 18.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </chakra.svg>
  )
}

export function AddIcon(props: IconProps) {
  return (
    <chakra.svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}
