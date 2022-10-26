import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`font-hind m-0 p-0 text-base`}
  }
`;

export default GlobalStyle;