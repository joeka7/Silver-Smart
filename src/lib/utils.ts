/** Joins truthy class names. A minimal stand-in for clsx; the project has no Tailwind, so no merge step is needed. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
