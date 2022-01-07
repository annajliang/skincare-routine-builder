// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    headingColor: string;
    buyNowBgColor: string;
    buyNowHoverColor: string;
    textColor: string;
    filledProgressColor: string;
    introTextColor: string;
    startBtnColor: string;
    errorTextColor: string;
    secondaryBtn: string;
    secondaryBtnText: string;
    secondaryBtnShadow: string;
    retakeQuizBtn: string;
    secondaryBtnHover: string;
    retakeQuizHover: string
  }
}