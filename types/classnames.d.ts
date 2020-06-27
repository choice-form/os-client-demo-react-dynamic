type ClassNamesType = string
  | { [prop: string]: boolean }
  | (string | { [prop: string]: boolean | string })[];

declare module 'classnames' {
  export default function (...p: ClassNamesType[] | ClassNamesType[][]): string;
}