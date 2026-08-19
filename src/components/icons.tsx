import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: P, children: ReactNode) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Marque : grand livre équilibré */
export const LogoMark = ({ size = 30, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <rect width="32" height="32" rx="7" fill="currentColor" className="text-pine" />
    <path
      d="M8 22V10m0 0h12M8 16h9M8 22h12"
      stroke="#F6F4EC"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <circle cx="23" cy="22" r="3.4" fill="#D9992F" />
  </svg>
);

export const IconHome = (p: P) =>
  base(
    p,
    <>
      <path d="M4 20V9.5L12 4l8 5.5V20" />
      <path d="M4 20h16" />
      <path d="M8 16.5V20m4-6v6m4-3.5V20" strokeWidth={2.1} />
    </>
  );

export const IconBook = (p: P) =>
  base(
    p,
    <>
      <path d="M12 6.5C10.5 5 8.4 4.5 5.5 4.5c-.6 0-1 .4-1 1v13c0 .6.4 1 1 1 2.9 0 5 .5 6.5 2 1.5-1.5 3.6-2 6.5-2 .6 0 1-.4 1-1v-13c0-.6-.4-1-1-1-2.9 0-5 .5-6.5 2Z" />
      <path d="M12 6.5v15" />
    </>
  );

export const IconQuiz = (p: P) =>
  base(
    p,
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3.5m6 1V3.5M9 2v2m6-2v2" />
      <path d="M8.5 11h7M8.5 14.5h4" />
      <path d="m8.5 18 1.2 1.2 2-2.4" />
    </>
  );

export const IconCards = (p: P) =>
  base(
    p,
    <>
      <path d="M7.5 6.5h11a1.5 1.5 0 0 1 1.5 1.5v10" />
      <rect x="4" y="9" width="13" height="11" rx="1.5" />
      <path d="M7 13.5h7M7 16.5h4.5" />
    </>
  );

export const IconPen = (p: P) =>
  base(
    p,
    <>
      <path d="M4 20l4.5-1 11-11a1.9 1.9 0 0 0 0-2.7l-.8-.8a1.9 1.9 0 0 0-2.7 0l-11 11L4 20Z" />
      <path d="M13.5 6.5l4 4" />
    </>
  );

export const IconNews = (p: P) =>
  base(
    p,
    <>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h10A1.5 1.5 0 0 1 17 6.5V19h2.5a.5.5 0 0 0 .5-.5v-9" />
      <path d="M4 6.5V19a1.5 1.5 0 0 0 1.5 1.5H19" />
      <path d="M7 9h7M7 12.5h7M7 16h4" />
    </>
  );

export const IconFlame = (p: P) =>
  base(
    p,
    <>
      <path d="M12 3.5c.6 2.6-.7 4.2-2.1 5.7C8.5 10.7 7 12.3 7 14.8a5 5 0 0 0 10 0c0-1.6-.6-3-1.5-4.3-.3 1-.9 1.8-1.8 2.3.3-2.9-.5-6.4-1.7-9.3Z" />
      <path d="M12 20a2.6 2.6 0 0 1-2.6-2.6c0-1.5 1.2-2.3 2.6-3.6 1.4 1.3 2.6 2.1 2.6 3.6A2.6 2.6 0 0 1 12 20Z" />
    </>
  );

export const IconBolt = (p: P) =>
  base(
    p,
    <>
      <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z" />
    </>
  );

export const IconCheck = (p: P) =>
  base(
    p,
    <>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </>
  );

export const IconArrow = (p: P) =>
  base(
    p,
    <>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </>
  );

export const IconChevronL = (p: P) =>
  base(
    p,
    <>
      <path d="M14.5 5 8 12l6.5 7" />
    </>
  );

export const IconClock = (p: P) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  );

export const IconTarget = (p: P) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  );

export const IconTrend = (p: P) =>
  base(
    p,
    <>
      <path d="M4 19h16" />
      <path d="m5.5 14.5 4-4 3 3 5.5-6" />
      <path d="M14.5 7.5H18V11" />
    </>
  );

export const IconRefresh = (p: P) =>
  base(
    p,
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 3.5v3.6h-3.6" />
    </>
  );

export const IconSpark = (p: P) =>
  base(
    p,
    <>
      <path d="M12 3.5c.7 4.4 2.1 5.8 6.5 6.5-4.4.7-5.8 2.1-6.5 6.5-.7-4.4-2.1-5.8-6.5-6.5 4.4-.7 5.8-2.1 6.5-6.5Z" />
      <path d="M18.5 15.5c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />
    </>
  );

export const IconScale = (p: P) =>
  base(
    p,
    <>
      <path d="M12 4v16m-5 0h10" />
      <path d="M5 7h14" />
      <path d="M7 7 4.5 12.5a2.7 2.7 0 0 0 5 0L7 7ZM17 7l-2.5 5.5a2.7 2.7 0 0 0 5 0L17 7Z" />
    </>
  );

export const IconInfo = (p: P) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </>
  );

export const IconClose = (p: P) =>
  base(
    p,
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  );
