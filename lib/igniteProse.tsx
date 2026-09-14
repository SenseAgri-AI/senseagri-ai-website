import type { CSSProperties, ReactNode } from "react";

export type IgniteTokens = {
  colorText?: string;
  colorMuted?: string;
  colorPrimary?: string;
  colorBorder?: string;
  fontSans?: string;
  fontHeading?: string;
  radius?: string;
  proseWidth?: string;
  spaceScale?: string;
};

const TOKEN_VARS: Record<keyof IgniteTokens, string> = {
  colorText: "--ignite-color-text",
  colorMuted: "--ignite-color-muted",
  colorPrimary: "--ignite-color-primary",
  colorBorder: "--ignite-color-border",
  fontSans: "--ignite-font-sans",
  fontHeading: "--ignite-font-heading",
  radius: "--ignite-radius",
  proseWidth: "--ignite-prose-width",
  spaceScale: "--ignite-space-scale"
};

function tokensToStyle(tokens?: IgniteTokens): CSSProperties | undefined {
  if (!tokens) return undefined;
  const style: Record<string, string> = {};
  for (const key of Object.keys(TOKEN_VARS) as Array<keyof IgniteTokens>) {
    const value = tokens[key];
    if (value) style[TOKEN_VARS[key]] = value;
  }
  return Object.keys(style).length > 0 ? (style as CSSProperties) : undefined;
}

type ProviderProps = {
  tokens?: IgniteTokens;
  children: ReactNode;
};

export function IgniteTokensProvider({ children }: ProviderProps) {
  return children;
}

type ProseProps = {
  html?: string;
  children?: ReactNode;
  tokens?: IgniteTokens;
  injectCss?: boolean;
};

export function IgniteProse({ html, children, tokens }: ProseProps) {
  return (
    <div className="ignite ignite-prose" style={tokensToStyle(tokens)}>
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </div>
  );
}

type FrameProps = {
  tokens?: IgniteTokens;
  children: ReactNode;
  injectCss?: boolean;
};

export function IgniteFrame({ tokens, children }: FrameProps) {
  return (
    <div className="ignite" style={tokensToStyle(tokens)}>
      {children}
    </div>
  );
}
