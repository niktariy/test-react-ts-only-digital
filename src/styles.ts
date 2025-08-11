import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: 255, 255, 255;

    --blue-1: 244, 245, 249;
    --blue-9: 56, 119, 238;
    --blue-12: 66, 86, 122;

    --fuschia-8: 241, 120, 182;
    --fuschia-9: 239, 93, 168;

    --text-color: rgb(var(--blue-12));
    --bg-color: rgb(var(--blue-1));

    --font-primary: 'PT Sans', 'Segoe UI', Roboto, Arial, sans-serif;;
    --font-accent: 'Bebas Neue', 'Arial Narrow', Arial, sans-serif;

    --content-padding: 1.25rem;

    @media screen and (width > 1200px) {
      --content-padding: 5rem;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    background: var(--bg-color);
    color: var(--text-color);
  }
`;

export const Content = styled.main`
  position: relative;
  width: 100%;
  margin: 0 auto;

  @media screen and (width > 1200px) {
    --line-style: 1px solid rgba(var(--blue-12), 0.1);
    --line-blend: difference;
    --grid-column: calc(100vw / 24);

    width: calc(var(--grid-column) * 18);
    margin-left: calc(var(--grid-column) * 4);
    margin-right: calc(var(--grid-column) * 2);

    &::before,
    &::after {
      content: '';
      height: 100vh;
      position: absolute;
      top: 0;
      border: var(--line-style);
      mix-blend-mode: var(--line-blend);
    }

    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
`;
