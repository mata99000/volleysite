import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TournamentList from './Partials/TournamentList';
import NavLink from '@/Components/NavLink';

export default function Tournaments({ auth }) {
    return (
        <AuthenticatedLayout
        
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"> Tournaments </h2>}
        >   
            <Head title="Tournaments" />
            

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray flex justify-center overflow-hidden sm:rounded-lg">
                        <div className="">
                            <h1 className="p-4 text-gray-900 text-5xl">All Our Tournaments</h1>
                            <p className="p-0 ml-4 text-gray-900 text-2xl">Database of all volleyball tournaments</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                    <Link href="/add_tournament">
                        <button className="px-4 py-2 font-semibold text-md bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm ring-2 ring-offset-2 ring-offset-slate-50 ring-blue-500 dark:ring-offset-slate-900 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent">
                        Add tournament
                        </button>
                    </Link>
                    </div>
                    {/* Current Tournaments - Start */}
                    <div className="pt-6 px-6">
                    {/* Left side - List */}
                        <div className="grid grid-rows-3 grid-flow-col md:grid-rows-3 gap-4 lg:gap-4">
                        <div className="col-span-2 sm:rounded-lg self-start">
                            <div className="p-1 basis-3/4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Panel
                                </NavLink>
                                <NavLink href={route('profile.set_profile_image')}>
                                    Profile
                                </NavLink>
                                <NavLink href={route('add.tournament')}>
                                    Tournaments
                                </NavLink>
                            </div>
                        </div>
                            <div className="row-span-2 col-span-2 basis-3/4 bg-white overflow-hidden shadow-sm sm:rounded-lg self-start">
                                <h1 className="p-4 text-gray-900 text-2xl">Current Tournaments</h1>
                                <div>
                                    <TournamentList />
                                </div>
                            </div>
                    {/* Right side - Search */}
                        <div className="row-span-3 basis-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg self-start">
                            <h1 className="p-1 text-gray-900 text-lg">Search Tournament</h1>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}