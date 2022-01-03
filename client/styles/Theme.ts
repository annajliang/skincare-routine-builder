import { DefaultTheme } from 'styled-components';
import { COLORS } from './colors';

export const morningTheme: DefaultTheme = {
  body: `${COLORS.lightRose}`,
  headingColor: `${COLORS.terraCotta}`,
  buyNowBgColor: `${COLORS.lightSalmonPink}`,
  buyNowHoverColor: `${COLORS.cornflowerLilac}`,
  textColor: `${COLORS.oldCopper}`,
  filledProgressColor: `${COLORS.lightSalmonPink}`,
  introTextColor: `${COLORS.gunmetal}`,
  startBtnColor: `${COLORS.sunshade}`,
  errorTextColor: `${COLORS.oldCopper}`,
};

export const nightTheme: DefaultTheme = {
  body: `${COLORS.cloudBurst}`,
  headingColor: `${COLORS.carolinaBlue}`,
  buyNowBgColor: `${COLORS.kashmirBlue}`,
  buyNowHoverColor: `${COLORS.glaucous}`,
  textColor: `${COLORS.gunmetal}`,
  filledProgressColor: `${COLORS.carolinaBlue}`,
  introTextColor: `${COLORS.white}`,
  startBtnColor: `${COLORS.carolinaBlue}`,
  errorTextColor: `${COLORS.white}`,
};