import React from "react";


function Currency(props) {

    return <form>
        <select class="form-select w-25" aria-label="Default select example" onChange={props.handleChange}>
            <option value="EUR" selected>EUR
            </option>
            <option value="USD" >USD</option>
            <option value="GPB" >GPB</option>
            <option value="CAD" >CAD</option>
            <option value="JPN" >JPN</option>
            <option value="INR" >INR</option>
            <option value="CNY" >CNY</option>
        </select>
    </form>
}


export default Currency;