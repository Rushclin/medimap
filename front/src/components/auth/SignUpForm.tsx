"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";

// Schéma de validation avec Zod
const signUpSchema = z.object({
  firstName: z.string()
    .min(1, "Le prénom est requis")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères"),
  lastName: z.string()
    .min(1, "Le nom est requis")
    .max(50, "Le nom ne doit pas dépasser 50 caractères"),
  email: z.string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions d'utilisation" })
  })
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { register: authRegister, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange'
  });

  const termsChecked = watch('terms');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authRegister({
        id: "",
        ...data,
         createdAt: new Date(),
        updatedAt: new Date(),

      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Créer un compte
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entrez vos différentes informations
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Prénom */}
                  <div className="sm:col-span-1">
                    <Label>
                      Prénom <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="Entrez votre prénom"
                      {...register("firstName")}
                      error={!!errors.firstName}
                      hint={errors.firstName?.message}
                    />
                  </div>
                  {/* Nom */}
                  <div className="sm:col-span-1">
                    <Label>
                      Nom <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="Entrez votre nom"
                      {...register("lastName")}
                      error={!!errors.lastName}
                      hint={errors.lastName?.message}
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="Entrez votre email"
                    {...register("email")}
                    error={!!errors.email}
                    hint={errors.email?.message}
                  />
                </div>
                {/* Mot de passe */}
                <div>
                  <Label>
                    Mot de passe <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Entrez votre mot de passe"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      error={!!errors.password}
                      hint={errors.password?.message}
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
                {/* Checkbox Conditions */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    className="w-5 h-5 mt-0.5"
                    checked={termsChecked}
                    onChange={(checked) => setValue("terms", true)}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    En créant un compte, vous acceptez les{" "}
                    <Link href="/terms" className="text-brand-500 hover:underline">
                      Conditions Générales d'Utilisation
                    </Link>{" "}
                    et notre{" "}
                    <Link href="/privacy" className="text-brand-500 hover:underline">
                      Politique de Confidentialité
                    </Link>
                  </p>
                </div>
                {errors.terms && (
                  <p className="text-sm text-error-500">
                    {errors.terms.message}
                  </p>
                )}
                {/* Bouton d'inscription */}
                <div>
                  <Button
                    className="w-full"
                    // type="submit"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? "Inscription en cours..." : "S'inscrire"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}