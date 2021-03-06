import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";
import { LOCALES_COUNTRIES } from "../../../../i18n";

const langs = {
    ar: "PS",
    en: "US",
    he: "IL"
};

const LanguageChooser = () => {
    const history = useHistory();
    const [selected, setSelected] = useState(langs[localStorage.langCity] || LOCALES_COUNTRIES[process.env.REACT_APP_DEFAULT_LANG]);

    useEffect(() => {
        if (localStorage.langCity === "en") {
          setSelected("US");
        } else if (localStorage.langCity === "he") {
          setSelected("IL");
        }
    }, []);

    const onSelectLang = (code) => {
        if (code === "US") {
            localStorage.langCity = "en";
        } else if (code === "PS") {
            localStorage.langCity = "ar";
        } else {
            localStorage.langCity = "he";
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