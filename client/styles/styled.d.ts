// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    color: string;
    buyNowLinkBgColor: string;
    textColor: string;
    progressBar: string;
    introTextColor: string;
    startBtnColor: string;
  }
}