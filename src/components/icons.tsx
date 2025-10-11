import type { SVGProps } from "react";

export function Castle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 20v-9H2l10-11 10 11z" />
      <path d="M18 20v-4h-4v4" />
      <path d="M10 20v-4H6v4" />
      <path d="M2 20h20" />
      <path d="M14 11V7" />
    </svg>
  );
}

export function Dragon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l2 4h-4l2-4z" />
      <path d="M17.71 6.29a9 9 0 1 1-11.42 0" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M22 12h-3" />
      <path d="M5 12H2" />
      <path d="M12 22v-3" />
      <path d="M12 5V2" />
      <path d="m19.07 4.93-2.12 2.12" />
      <path d="m7.05 16.95-2.12 2.12" />
      <path d="m4.93 4.93 2.12 2.12" />
      <path d="m16.95 16.95 2.12 2.12" />
    </svg>
  );
}

export function Gem(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path d="M12 21V9" />
            <path d="m2 9h20" />
        </svg>
    )
}


export const Icons = {
    Castle,
    Dragon,
    Gem,
};
