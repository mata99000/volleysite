import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddClubForm from './ClubPartials/AddClubForm';
import { Head } from '@inertiajs/react';

export default function EditClub({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Club</h2>}
        >
            <Head title="Personal Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <AddClubForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    </div>
                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
