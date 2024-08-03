import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DropdownOption from '@/Components/DropdownOption';

export default function DropdownByGender ( {className="", ...props} ) {
  const [handleOption, setHandleOption] = useState('');
  
  const handleSelectOption = (e) => {
    setHandleOption(e.target.value);
  }

    return (
        <>
          <select {...props} className={className} onChange={handleSelectOption}>
            <DropdownOption optionNameValue="" selected disabled hidden optionName="Gender"/>
            <DropdownOption optionNameValue="men" optionName="Men"/>
            <DropdownOption optionNameValue="women" optionName="Women"/>
            <DropdownOption optionNameValue="mix" optionName="Mix"/>
          </select>

          <p>{handleOption}</p>
        </>
    )
}