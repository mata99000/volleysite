import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateEmailForm({ props, mustVerifyEmail, status, className = '' }) {

    const user = usePage().props.auth.user;

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm({
        email: user.email,
    });

    const updateEmail = (e) => {
        e.preventDefault();

        post(route('email.update'));
    };


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Email</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a unique email.
                </p>
            </header>

            <form onSubmit={updateEmail} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        type="email"
                        className="mt-1 block w-full"
                        required
                        autoComplete="username"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Updated.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
