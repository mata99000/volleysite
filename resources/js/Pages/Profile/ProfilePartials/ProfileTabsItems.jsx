import React from 'react'
import { Tab } from '@headlessui/react'

export default function ProfileTabsItems({text}) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
        return (
            
                <Tab
                            
                // Nacin da se selektovanom tabu dodeli odgovarajuca klasa
                className={({ selected }) => 
                classNames(
                "py-2.5 px-14 text-lg font-bold outline-none",
                selected ?
                "bg-white text-blue-500" : "text-gray-700"
                )}
                >
                    {text}
                </Tab>
        
        )
}