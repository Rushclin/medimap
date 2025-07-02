import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "email" | "password" | "date" | "time";
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  register?: any; // Pour la compatibilité avec react-hook-form
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  className = "",
  disabled = false,
  success = false,
  error = false,
  hint,
  register,
  ...props
}) => {
  // Classes de base
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  // Ajout des classes en fonction des états
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` border-error-500 focus:ring-error-500/10 focus:border-error-500 dark:border-error-500`;
  } else if (success) {
    inputClasses += ` border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:border-success-500`;
  } else {
    inputClasses += ` border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800`;
  }

  // Gestion de la couleur du texte en fonction de l'état
  if (error) {
    inputClasses += ` text-error-800 dark:text-error-400`;
  } else if (success) {
    inputClasses += ` text-success-800 dark:text-success-400`;
  } else {
    inputClasses += ` text-gray-800 dark:text-white/90`;
  }

  return (
    <div className="relative">
      {register ? (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...register(name)}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
      )}

      {/* Message d'aide/hint */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500 dark:text-error-400"
              : success
              ? "text-success-500 dark:text-success-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;