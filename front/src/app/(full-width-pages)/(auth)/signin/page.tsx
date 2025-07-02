import SignInForm from "@/components/auth/SignInForm";
import { appConfig } from "@/config/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medimap | Se connecter",
  description: appConfig.description
};

export default function SignIn() {
  return <SignInForm />;
}
