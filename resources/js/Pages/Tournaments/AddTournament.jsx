import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddTournamentForm from './Partials/AddTournamentForm';
import UploadImageTournament from './Partials/UploadImageTournament';

export default function AddTournament({ auth, status }) {
    
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tournaments</h2>}>
        
            <Head title="Tournaments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <AddTournamentForm
                            className="max-w-xl"
                            status={status}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}