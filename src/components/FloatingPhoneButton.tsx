const fabShadow = "shadow-[0_8px_24px_rgba(15,23,42,0.28)]";

const fabBase =
  `fixed bottom-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full ${fabShadow} transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;

export function FloatingPhoneButton() {
  return (
    <>
      <a
        href="viber://chat?number=%2B359894724164"
        className={`${fabBase} right-[92px] bg-[#7360F2] hover:brightness-[0.92]`}
        aria-label="Viber: 0894 724 164"
      >
        <svg
          className="h-6 w-6 shrink-0"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          aria-hidden
        >
          <path d="M11.4 0C6.6.2 2.6 3.6 1.8 8.3c-.4 2.2-.2 4.3.6 6.3.2.5.3 1 .2 1.5l-.6 3.2c-.1.5.3.9.8.8l3.2-.7c.5-.1 1 0 1.5.2 1.5.6 3.1.9 4.8.8 5.3-.3 9.5-4.5 9.7-9.8C22.2 4.5 17.4-.2 11.4 0zm5.4 15.7c-.4.5-.9.8-1.5.9-.3 0-.7-.1-1-.2-1.5-.6-2.9-1.5-4-2.7-1.1-1.1-2-2.5-2.6-4-.2-.6-.2-1.2.1-1.7.3-.5.7-.8 1.2-1 .4-.1.8 0 1.1.3l1.3 1.8c.2.3.2.7 0 1l-.4.5c-.1.2-.1.4 0 .5.5 1 1.3 1.8 2.2 2.3.2.1.4.1.5 0l.5-.4c.3-.2.7-.3 1-.1l1.8 1.2c.4.3.5.9.3 1.4l-.5.2z" />
        </svg>
      </a>
      <a
        href="tel:+359894724164"
        className={`${fabBase} right-6 bg-brand-800 hover:bg-brand-900`}
        aria-label="Обаждане: 0894 724 164"
      >
        <svg
          className="h-6 w-6 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          aria-hidden
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
