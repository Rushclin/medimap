import appConfig from '@/config/app';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface LogoProps {
    withVersion?: boolean;
    withDescription?: boolean;
}

const Logo: React.FC<LogoProps> = ({withDescription=false, withVersion=false }) => {
    return (
        <div className="flex flex-col items-center max-w-xs">
            <Link href="/" className="block mb-4">
                <Image
                    width={231}
                    height={48}
                    src="./images/logo/logo-sedgwick.svg"
                    alt={appConfig.name}
                />
            </Link>
            {
                !withDescription && <p className="text-center text-gray-400 dark:text-white/60">
                Manager vos cas d'assurance avec notre outil.
            </p>
            }
            
        </div>
    )
}

export default Logo