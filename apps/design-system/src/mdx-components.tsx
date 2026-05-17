import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--coded-navy)] mt-12 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--coded-navy)] mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)] mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] leading-7 text-[color:var(--text-secondary)] my-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 text-[color:var(--text-secondary)] space-y-1.5">
      {children}
    </ul>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-[color:var(--surface-2)] px-1.5 py-0.5 font-mono text-[13px] text-[color:var(--coded-navy)]">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-[color:var(--accent)] underline-offset-2 hover:underline"
    >
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
