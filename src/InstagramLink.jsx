const instagramUrl = "https://www.instagram.com/wild.hogshohnstorf/";

export function InstagramLink({ className = "", children = "Instagram-Kanal" }) {
  return (
    <a className={`instagram-link ${className}`.trim()} href={instagramUrl} target="_blank" rel="noopener noreferrer">
      <svg className="instagram-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.75" cy="6.25" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span>{children}</span>
      {className.includes("instagram-cta") && <span className="instagram-arrow" aria-hidden="true">↗</span>}
    </a>
  );
}
