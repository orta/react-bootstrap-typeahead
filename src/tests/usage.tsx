// This file should pass TypeScript validation, it is not intended to be code which runs!

import React, { useState, Fragment } from "react";
import Typeahead from "../core/Typeahead";

const InputSizeExample = () => {
    const [size ] = useState(1);
  
    const options = [
      { label: 'Small', value: 'small' },
      { label: 'Default', value: undefined },
      { label: 'Large', value: 'large' },
    ];
  
    return (
      <>
        <Typeahead
          id="input-size-example"
          labelKey="name"
          options={options}
          filterBy={(option) => { return option.label === "Small" }}
        />
      </>
    );
  };
  
  console.log(InputSizeExample)