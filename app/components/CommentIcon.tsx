'use client'

// Minimal animated icon (SVG) to accompany the "Comentarios de jugadores" heading
// Avoids extra dependencies (e.g., Lottie) while keeping a subtle animation.
export default function CommentIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-padel-red animate-pulse drop-shadow-[0_0_6px_rgba(255,43,43,0.35)]"
      aria-hidden
    >
      <path
        d="M12 2l2.39 4.84L20 7.27l-3.8 3.7.9 5.26L12 14.77 6.9 16.23l.9-5.26L4 7.27l5.61-.43L12 2z"
        fill="currentColor"
      />
    </svg>
  )
}
