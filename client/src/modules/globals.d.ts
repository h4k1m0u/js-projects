// avoids error in vim from ycm/tsserver about variable passed from webpack to js code
// https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables
declare const serverURL: string;
