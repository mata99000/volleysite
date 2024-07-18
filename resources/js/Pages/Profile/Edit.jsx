import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePersonalInformationForm from './Partials/UpdatePersonalInformationForm';
import UploadImage from './ProfilePartials/UploadImage';

import UpdateEmail from './Partials/UpdateEmail';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Personal Settings</h2>}
        >
            <Head title="Personal Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            className="max-w-xl"
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UploadImage className="max-w-xl" />
                    </div>
                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateEmail className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePersonalInformationForm className="max-w-xl" />
                    </div>

                   
                
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
