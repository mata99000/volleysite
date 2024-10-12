import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EditClubForm from './ClubPartials/EditClubForm';
import { Head } from '@inertiajs/react';

export default function EditClub({ auth, data, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Club</h2>}
        >
            <Head title="Edit Club" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {data ? (
                            <EditClubForm data={data} className="max-w-xl" />
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
