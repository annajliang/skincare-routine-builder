import { DefaultTheme } from 'styled-components';
import { COLORS } from '../constants/colors';

export const morningTheme: DefaultTheme = {
  body: `${COLORS.lightRose}`,
  headingColor: `${COLORS.terraCotta}`,
  buyNowBgColor: `${COLORS.lightSalmonPink}`,
  buyNowHoverColor: `${COLORS.cornflowerLilac}`,
  textColor: `${COLORS.oldCopper}`,
  filledProgressColor: `${COLORS.lightSalmonPink}`,
  introTextColor: `${COLORS.oldCopper}`,
  startBtnColor: `${COLORS.sunshade}`,
  errorTextColor: `${COLORS.oldCopper}`,
  secondaryBtn: `${COLORS.lightSalmonPink}`,
  secondaryBtnText: `${COLORS.white}`,
  secondaryBtnShadow: `${COLORS.salmonPink}`,
  secondaryBtnHover: `${COLORS.paleSalmon}`,
  retakeQuizBtn: `${COLORS.terraCotta}`,
  retakeQuizHover: `${COLORS.lightSalmonPink}`,
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
  secondaryBtn: `${COLORS.kashmirBlue}`,
  secondaryBtnText: `${COLORS.white}`,
  secondaryBtnShadow: `${COLORS.rhino}`,
  secondaryBtnHover: `${COLORS.greyBlue}`,
  retakeQuizBtn: `${COLORS.kashmirBlue}`,
  retakeQuizHover: `${COLORS.carolinaBlue}`,
};