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
