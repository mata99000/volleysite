import React, { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputImage from '@/Components/InputImage';

export default function UploadImageTournament({props, className = ""}) {
    const [tournament, setTournament] = useState();

    function handleSubmitImage(e) {
        e.preventDefault();

        setTournament(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <section className={className}>
        <header>
            <h2 className="text-lg font-medium text-gray-900">Upload Image</h2>

            <p className="mt-1 text-sm text-gray-600">
                Upload your image here.
            </p>
        </header>
                <div className="mt-6 space-y-6">
                    <ul className="flex flex-wrap">
                        <img className="h-20 border rounded" src={tournament} />
                        <InputLabel htmlFor="image" value="image" name="image"/>
                        <InputImage 
                            onChange={handleSubmitImage} 
                        />
                    </ul>
                </div>

        </section>
    );

}