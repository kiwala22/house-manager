export const getCSRFToken = (): string | null | undefined => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta?.getAttribute('content');
}