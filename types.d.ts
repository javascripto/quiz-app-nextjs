import 'styled-components';
import { Theme } from './src/styles/theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
