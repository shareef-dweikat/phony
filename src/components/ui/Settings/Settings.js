import React, { useState } from "react";
import classnames from "classnames";
import LanguageChooser from "./Language/LanguageChooser";
import SizeChooser from "./Size/SizeChooser";
import "./style.css";
import translate from "../../../i18n/translate";

function Settings() {
  const [open, isOpen] = useState(false)
  const onToggle = () => {
    isOpen(!open);
  }
  return (
    <div className={classnames("settings-tools", {
      "opened": open
      })}>
      <div className="settings-tools-inner">
          <div className="settings-tools-toggle" onClick={onToggle}><i className="fas fa-cog"></i></div>
          <div className="settings-tools-content">
            <div className="nav-tabs-horizontal">
              <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="lang-tab" data-bs-toggle="tab" data-bs-target="#lang" type="button" role="tab" aria-controls="Language" aria-selected="false">
                    {translate("Language")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="size-tab" data-bs-toggle="tab" data-bs-target="#size" type="button" role="tab" aria-controls="Size" aria-selected="false">
                    {translate("Size")}
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active" id="lang" role="tabpanel" aria-labelledby="lang-tab">
                  <h5 className="settings-tools-title">{translate("Select Language")}</h5>
                  <LanguageChooser />
                </div>
                <div className="tab-pane" id="size" role="tabpanel" aria-labelledby="size-tab">
                  <h5 className="settings-tools-title">{translate("Select Size")}</h5>
                  <SizeChooser type="radio"/>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Settings;
