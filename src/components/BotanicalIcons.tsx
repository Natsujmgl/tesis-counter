import type { SVGProps } from 'react';

export function RoseIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" {...props}>
    <path d="M32 74c-1.5-15 2-24 0-38" stroke="#6d8c73" strokeWidth="2" strokeLinecap="round" />
    <path d="M31.5 58c-11-1-15-9-15-9 10-1.5 15 9 15 9Zm1-10c11-1.5 14-10 14-10-10 0-14 10-14 10Z" fill="#89a88c" fillOpacity=".35" stroke="#6d8c73" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M32 37c-10 0-16-7-15-15 1-7 7-11 15-11s14 4 15 11c1 8-5 15-15 15Z" fill="#d97b93" fillOpacity=".24" stroke="#b9526f" strokeWidth="1.6" />
    <path d="M22 21c2-6 10-8 16-5 6 3 7 11 1 15-5 3-13 2-15-4-2-4 1-9 6-10 4-1 8 2 7 6-1 3-4 4-6 2-2-1-1-4 1-4" stroke="#b9526f" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M24 34c3 3 13 3 16 0" stroke="#6d8c73" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;
}

export function SunflowerIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" {...props}>
    <path d="M32 74c1-14-1.5-24 0-36" stroke="#6d8c73" strokeWidth="2" strokeLinecap="round" />
    <path d="M31.5 57c-10-1-13-8-13-8 9-1 13 8 13 8Zm1-11c10-1 13-8 13-8-9 0-13 8-13 8Z" fill="#89a88c" fillOpacity=".32" stroke="#6d8c73" strokeWidth="1.5" strokeLinejoin="round" />
    <g fill="#f0c351" fillOpacity=".45" stroke="#c89223" strokeWidth="1.3">
      <ellipse cx="32" cy="11" rx="3.4" ry="7.2" />
      <ellipse cx="32" cy="37" rx="3.4" ry="7.2" />
      <ellipse cx="19" cy="24" rx="7.2" ry="3.4" />
      <ellipse cx="45" cy="24" rx="7.2" ry="3.4" />
      <ellipse cx="22.8" cy="14.8" rx="3.3" ry="6.8" transform="rotate(-45 22.8 14.8)" />
      <ellipse cx="41.2" cy="33.2" rx="3.3" ry="6.8" transform="rotate(-45 41.2 33.2)" />
      <ellipse cx="41.2" cy="14.8" rx="3.3" ry="6.8" transform="rotate(45 41.2 14.8)" />
      <ellipse cx="22.8" cy="33.2" rx="3.3" ry="6.8" transform="rotate(45 22.8 33.2)" />
    </g>
    <circle cx="32" cy="24" r="6.8" fill="#8a5a36" fillOpacity=".75" stroke="#6e4425" strokeWidth="1.4" />
    <circle cx="30" cy="22.5" r="1" fill="#f3d285" />
    <circle cx="34" cy="23" r="1" fill="#f3d285" />
    <circle cx="32" cy="26" r="1" fill="#f3d285" />
  </svg>;
}

export function RosePetalIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M12 3C7 5.5 4.5 11 6.8 16.2 8.4 19.6 11.4 21 12.6 21c3.5-.3 6.8-4.5 6.4-9.8C18.6 6.8 15.2 4 12 3Z" fill="currentColor" fillOpacity=".65" stroke="currentColor" strokeWidth="1.1" />
    <path d="M12.2 6.5c-.8 3.2-.6 7 .2 11.2" stroke="#fff7fa" strokeOpacity=".55" strokeWidth="1" strokeLinecap="round" />
  </svg>;
}
