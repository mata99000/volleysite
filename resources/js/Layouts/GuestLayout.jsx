import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 relative"
            style={{
                backgroundImage: 'url("/storage/auth/background.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Zatamnjenje slike (overlay) */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Logo i forma */}
            <div className="relative z-10 w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
