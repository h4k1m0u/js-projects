// ambient module prevents jsconfig linter error when importing *.png images in js
// https://www.typescriptlang.org/docs/handbook/modules.html#working-with-other-javascript-libraries
declare module "*.png" {
  const pathImage: string;
  export default pathImage;
}
