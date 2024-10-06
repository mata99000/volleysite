import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    // Handleri za Socialite logine
    const handleGoogleLogin = () => window.location.href = '/auth/google';
    const handleAppleLogin = () => window.location.href = '/auth/apple';
    const handleFacebookLogin = () => window.location.href = '/auth/facebook';
    const handleGitHubLogin = () => window.location.href = '/auth/github';

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/* Login forma */}
            <form onSubmit={submit} className="w-full max-w-md mx-auto">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            {/* Separator "OR" */}
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login dugmad */}
            <div className="text-center">
                <button
                    onClick={handleGoogleLogin}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center mb-2 w-full"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.9 3.2 29.8 1 24 1 14.8 1 7.2 6.5 3.9 14.1l7 5.4c1.8-5.1 6.7-9 13.1-9z"/>
    <path fill="#34A853" d="M9.9 24c0-1.2.2-2.3.5-3.3L3.9 15.3C2.3 17.9 1.5 21 1.5 24s.8 6.1 2.4 8.7l6.5-5.4C10.1 26.3 9.9 25.2 9.9 24z"/>
    <path fill="#FBBC05" d="M24 46.5c4.8 0 9.3-1.6 12.8-4.3L30.3 35c-1.5 1.1-3.4 1.7-5.3 1.7-5 0-9.2-3.4-10.7-8.2l-6.5 5.4C12.4 42.4 17.8 46.5 24 46.5z"/>
    <path fill="#EA4335" d="M46.6 24c0-1.2-.1-2.3-.4-3.3H24v6.8h12.7c-.5 2.7-2 5-4.2 6.4l6.5 5.4C43.9 36.5 46.6 30.6 46.6 24z"/>
</svg>

                    Login with Google
                </button>

                <button
                    onClick={handleAppleLogin}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center justify-center mb-2 w-full"
                >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
    <path fill="white" d="M16.366 1.879C15.24 1.879 13.937 2.655 13.135 3.531 12.391 4.344 11.739 5.653 12.8 6.45c.804.612 2.108.445 2.901-.382.769-.808 1.433-2.107.684-2.851-.56-.557-1.453-.788-2.019-.788zm.68 9.366c-1.425 0-2.03.88-3.03.88-.956 0-1.648-.82-3.045-.82-2.32 0-4.209 1.965-4.209 5.192.001 2.271.839 4.707 2.102 6.275.968 1.16 1.899 2.183 3.273 2.183.944 0 1.372-.6 2.866-.6 1.464 0 1.856.6 2.868.6 1.423 0 2.277-1.059 3.232-2.185.745-.877 1.06-1.324 1.563-2.319-4.09-1.587-3.644-7.222-1.62-9.325-.992-1.047-2.257-1.001-2.772-1.001z" />
</svg>

                    Login with Apple
                </button>

                <button
                    onClick={handleFacebookLogin}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center mb-2 w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
    <path fill="white" d="M22.67 0H1.33C.6 0 0 .6 0 1.33v21.34C0 23.4.6 24 1.33 24H12v-9.294H9.294V11.7H12v-2.353c0-2.674 1.636-4.134 4.02-4.134 1.143 0 2.125.085 2.41.123v2.794h-1.654c-1.295 0-1.546.616-1.546 1.52V11.7h3.085l-.4 3.006h-2.685V24h5.272C23.4 24 24 23.4 24 22.67V1.33C24 .6 23.4 0 22.67 0z" />
</svg>

                    Login with Facebook
                </button>

                <button
                    onClick={handleGitHubLogin}
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 flex items-center justify-center w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
    <path fill="white" d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.188c-3.338.724-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.748.083-.733.083-.733 1.204.084 1.837 1.254 1.837 1.254 1.07 1.837 2.805 1.307 3.493.998.107-.774.418-1.307.763-1.607-2.665-.303-5.467-1.333-5.467-5.93 0-1.311.47-2.382 1.236-3.223-.123-.303-.536-1.52.117-3.167 0 0 1.01-.324 3.3 1.23.96-.267 1.98-.4 3-.404 1.02.004 2.04.137 3 .404 2.29-1.554 3.3-1.23 3.3-1.23.653 1.647.24 2.864.117 3.167.768.84 1.235 1.911 1.235 3.223 0 4.61-2.807 5.625-5.478 5.922.43.372.824 1.102.824 2.222v3.293c0 .32.218.694.825.577C20.565 22.092 24 17.594 24 12.297 24 5.67 18.627.297 12 .297z" />
</svg>

                    Login with GitHub
                </button>
            </div>

            {/* Link za registraciju */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="underline text-sm text-blue-600 hover:text-blue-900"
                    >
                        Sign Up now
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
