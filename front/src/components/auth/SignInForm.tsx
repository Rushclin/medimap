"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Veuillez entrer un email valide" }),
  password: z.string()
    .min(1, { message: "Le mot de passe est requis" })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };
const email = watch("email")
console.log({email})
  console.log({errors})
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Se connecter
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Entrez votre email et mot de passe pour vous connecter
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input 
                  placeholder="info@gmail.com" 
                  type="email"
                  {...register("email")}
                  error={!!errors.email?.message}
                  hint={errors.email?.message || ""}
                />
              </div>
              <div>
                <Label>
                  Mot de passe <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    {...register("password")}
                    error={!!errors.password?.message}
                    hint= {errors.password?.message || ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Button 
                  className="w-full" 
                  size="sm"
                  disabled={isSubmitting }
                >
                  {(isSubmitting ) ? "Connexion..." : "Se connecter"}
                </Button>
              </div>
            </div>
          </form>

           <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Vous n'avez pas encore de compte ? {" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Creer un 
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}