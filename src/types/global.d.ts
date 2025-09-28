// Global type declarations for the Mage Creator project

declare module '@mantine/core' {
  export const Box: any
  export const Button: any
  export const Card: any
  export const Center: any
  export const Grid: any
  export const Group: any
  export const Image: any
  export const Stack: any
  export const Text: any
  export const Title: any
  export const Alert: any
  export const NumberInput: any
  export const Checkbox: any
  export const Divider: any
  export const ScrollArea: any
  export const Space: any
  export const Tooltip: any
  export const Modal: any
  export const Select: any
  export const TextInput: any
  export const ActionIcon: any
  export const FileButton: any
  export const Burger: any
  export const Stepper: any
  export const Aside: any
  export const useMantineTheme: any
}

declare module '@mantine/hooks' {
  export const useDisclosure: any
}

declare module '@mantine/notifications' {
  export const notifications: any
}

declare module '@tabler/icons-react' {
  export const IconInfoCircle: any
  export const IconBrandGithub: any
  export const IconBrandReddit: any
  export const IconBrandTwitter: any
}

declare module '@fortawesome/free-solid-svg-icons' {
  export const faFileArrowUp: any
  export const faPlay: any
  export const faTrash: any
  export const faChevronLeft: any
}

declare module '@fortawesome/react-fontawesome' {
  export const FontAwesomeIcon: any
}

declare module 'react-ga4' {
  const ReactGA: any
  export default ReactGA
}

declare module 'zod' {
  export const z: any
}

declare module 'react' {
  export const useState: any
  export const useEffect: any
  export const useRef: any
  export const createRef: any
  export const Component: any
  export const Fragment: any
  export default any
}

declare module 'react-dom' {
  export default any
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}

declare module 'react/jsx-dev-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}

// Declare raw file imports
declare module '*.base64?raw' {
  const content: string
  export default content
}