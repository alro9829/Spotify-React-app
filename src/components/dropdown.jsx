import React from "react";

const Dropdown = (props) => {
  const dropdownChanged = (e) => {
    props.changed(e.target.value);
  };

  return (
    <div class="col-sm-3 form-group row px-0">
      <label class="row form-label col-sm-2">{props.label}</label>
      <select
        value={props.selectedValue}
        onChange={dropdownChanged}
        class="form-control form-control-sm col-sm-10"
      >
        <option key={0}>Select an option...</option>
        {props.options.map((item, idx) => (
          <option key={idx} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
