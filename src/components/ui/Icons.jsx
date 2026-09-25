// One icon set, one stroke (1.75), one viewBox. Every icon is decorative by default (aria-hidden):
// the text next to it, or the aria-label of the button, carries the meaning.

function Icon({ size = 20, children, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconCart = (props) => (
  <Icon {...props}>
    <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.47 1.2h8.9a1.5 1.5 0 0 0 1.46-1.15L21 8H6.2" />
    <circle cx="9.5" cy="20" r="1.25" />
    <circle cx="17.5" cy="20" r="1.25" />
  </Icon>
)

export const IconHeart = ({ filled = false, ...props }) => (
  <Icon {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8.2a4.3 4.3 0 0 1 7.5 2.3c0 5.4-7.5 10-7.5 10Z" />
  </Icon>
)

export const IconSearch = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Icon>
)

export const IconFilter = (props) => (
  <Icon {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Icon>
)

export const IconClose = (props) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const IconMenu = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const IconPlus = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const IconMinus = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
)

export const IconCheck = (props) => (
  <Icon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
)

export const IconInfo = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Icon>
)

export const IconArrowRight = (props) => (
  <Icon {...props}>
    <path d="M4 12h16M13 5l7 7-7 7" />
  </Icon>
)

export const IconArrowUpRight = (props) => (
  <Icon {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
)

export const IconTrash = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </Icon>
)

export const IconPin = (props) => (
  <Icon {...props}>
    <path d="M12 21s6.5-6 6.5-11.5a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.25" />
  </Icon>
)

export const IconPhone = (props) => (
  <Icon {...props}>
    <path d="M5.5 3h3l1.7 4.2-2 1.5a12 12 0 0 0 6.1 6.1l1.5-2L20 14.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </Icon>
)

export const IconClock = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Icon>
)

export const IconMail = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
)

export const IconStar = ({ filled = false, ...props }) => (
  <Icon {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8Z" />
  </Icon>
)

export const IconChevronDown = (props) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
)

export const IconChevronLeft = (props) => (
  <Icon {...props}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
)

export const IconSpinner = (props) => (
  <Icon {...props} className={`animate-spin ${props.className ?? ''}`}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </Icon>
)

export const IconLeaf = (props) => (
  <Icon {...props}>
    <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
    <path d="M5 19c3-4 6-7 10-10" />
  </Icon>
)

export const IconFlame = (props) => (
  <Icon {...props}>
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-3 2-5 3.5-7 .5 1.5 1.5 2.5 2.5 3 0-3 1-6 4-8 0 3 1.5 4.5 2.5 6 1 1.5 1.5 3 1.5 5 0 4-3 7-7.5 7Z" />
  </Icon>
)

export const IconShare = (props) => (
  <Icon {...props}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
  </Icon>
)
