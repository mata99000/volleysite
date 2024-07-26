import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import AllTournamentList from './Partials/AllTournamentList';
import NavLink from '@/Components/NavLink';
import TournamentSearch from '@/Pages/Tournaments/Partials/TournamentSearch';

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
                    
                    <div className="pt-6 px-6">
                        <TournamentSearch />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}