import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DropdownOption from '@/Components/DropdownOption';

export default function DropdownBySurface({ className="", ...props}) {
    const [handleOption, setHandleOption] = useState('');
  
    const handleSelectOption = (e) => {
        setHandleOption(e.target.value);
    }
    
    return (
        <>
          <select {...props} className={className} onChange={handleSelectOption}>
            <DropdownOption optionNameValue="" selected disabled hidden optionName="Surface"/>
            <DropdownOption optionNameValue="indoor" optionName="Indoor"/>
            <DropdownOption optionNameValue="outdoor" optionName="Outdoor"/>
            <DropdownOption optionNameValue="beach" optionName="Beach"/>
          </select>

          <p>{handleOption}</p>
        </>
    )
}