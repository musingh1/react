import { pxToRem } from '../../../../lib'

export interface IButtonVariables {
  [key: string]: string | number

  height: string
  minWidth: string
  maxWidth: string
  color: string
  backgroundColor: string
  backgroundColorHover: string
  circularRadius: string
  paddingLeftRightValue: number
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typePrimaryBackgroundColorHover: string
  typePrimaryBorderColor: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
  typeSecondaryBackgroundColorHover: string
  typeSecondaryBorderColor: string
}

export default (siteVars: any): IButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    color: siteVars.black,
    backgroundColor: siteVars.gray08,
    backgroundColorHover: siteVars.gray06,
    circularRadius: pxToRem(999),
    paddingLeftRightValue: 20,
    typePrimaryColor: siteVars.white,
    typePrimaryBackgroundColor: siteVars.brand,
    typePrimaryBackgroundColorHover: siteVars.brand04,
    typePrimaryBorderColor: 'transparent',
    typeSecondaryColor: siteVars.black,
    typeSecondaryBackgroundColor: siteVars.white,
    typeSecondaryBackgroundColorHover: siteVars.gray06,
    typeSecondaryBorderColor: siteVars.gray06,
  }
}
