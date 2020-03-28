export type Modify<T, R> = Omit<T, keyof R> & R;

export type State<T> = {
  loaded: boolean;
  value: T;
}
