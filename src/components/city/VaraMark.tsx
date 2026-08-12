export function VaraMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Vara"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="9" stroke="currentColor" strokeWidth="3" />
      <path
        d="M13 14 L24 34 L35 14"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}