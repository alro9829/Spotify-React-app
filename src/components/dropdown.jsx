import React, { Component } from "react";

class Dropdown extends Component {}
    data = [
        { value: 1, name: "A" },
        { value: 2, name: "B" },
        { value: 3, name: "C" },
    ];

    render() {
        return (
        <div>
            <select>
            {data.map((item, idx) => (
                <option key={idx} value={item.value}>
                {item.name}
                </option>
            ))}
            </select>
        </div>
        );
    }
export default Dropdown;
