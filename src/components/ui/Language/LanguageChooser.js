import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const langs = {
    ar: "PS",
    en: "US",
    is: "IL"
};

const LanguageChooser = () => {
    const [selected, setSelected] = useState(langs[localStorage.langCity]);

    const onSelectLang = (code) => {
        if (code === "US") {
            localStorage.langCity = "en";
        } else if (code === "PS") {
            localStorage.langCity = "ar";
        } else {
            localStorage.langCity = "is";
        }
        window.location.reload();
    };
        
  return (
    <ReactFlagsSelect
        color={"#fff"}
        countries={["PS", "US", "IL"]}
        selected={selected}
        customLabels={{ US: "English", PS: "Arabic", IL: "Hebrew" }}
        onSelect={(code) => onSelectLang(code)}
        selectedSize={14}
        optionsSize={14}
        showLabal={true}
        className="custom-lang"
    />
  );
};
export default LanguageChooser;