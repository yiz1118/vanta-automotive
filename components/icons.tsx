import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({ className = "", children }: IconProps & { children: ReactNode }) {
  return <svg className={`ui-icon ${className}`.trim()} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{children}</svg>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>;
}

export function ArrowDownIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 5v14m-7-7 7 7 7-7" /></Icon>;
}

export function ArrowLeftIcon(props: IconProps) {
  return <Icon {...props}><path d="M19 12H5m7-7-7 7 7 7" /></Icon>;
}

export function ArrowRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M5 12h14m-7-7 7 7-7 7" /></Icon>;
}

export function ArrowLeftRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 9h16M8 5 4 9l4 4m12 2H4m12-4 4 4-4 4" /></Icon>;
}

export function CloseIcon(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M6 18 18 6" /></Icon>;
}

export function PlusIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
}

export function CheckIcon(props: IconProps) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
}
