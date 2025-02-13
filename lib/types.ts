export type SignInFlow = "signIn" | "signUp";
export interface SignInStateProps {
  setState: (state: SignInFlow) => void;
}
