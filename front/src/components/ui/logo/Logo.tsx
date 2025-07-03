import { appConfig } from '@/config/app';
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
            <Link href="/" className="block">
                <Image
                    width={50}
                    height={48}
                    src="/favicon.jpeg"
                    alt={appConfig.appName}
                    className='rounded-full'
                />
            </Link>
            {
                !withDescription && <p className="text-center text-gray-400 dark:text-white/60">
                Restez en contact avec votre médécin.
            </p>
            }
            
        </div>
    )
}

export default Logo