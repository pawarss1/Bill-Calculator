import React from "react";

function Item(props) {
  //Multi Purpose function used to update the utility Item
  const updateFunc = (key, value) => {
    if (value < 0) {
      alert("Only Possitive Numbers allowed!");
      return;
    }
    const utilityArr = [...props.utilityList];
    utilityArr[props.index][key] = value;
    props.setUtilityList(utilityArr);
  };
  const updateConsumption = (value) => {
    updateFunc("consumptionVal", value);
  };
  const updateRate = (value) => {
    updateFunc("rate", value);
  };
  const updateTax = (value) => {
    updateFunc("tax", value);
  };
  return (
    <div className="input-cls">
      <div style={{ display: "flex" }}>
        <div>
          <p style={{ marginLeft: "2%" }}>{props.utility.utility}</p>
        </div>
        <div style={{ marginLeft: "20%" }}>
          <br />
          <input
            type="number"
            placeholder={props.utility.utility}
            onChange={(evt) => updateConsumption(evt.target.value)}
            value={props.utility.consumptionVal}
          />
        </div>
        <div style={{ marginLeft: "35%" }}>
          <br />
          <input
            type="number"
            placeholder={`Rate`}
            onChange={(evt) => updateRate(evt.target.value)}
            value={props.utility.rate}
          />
        </div>
        <div>
          <br />
          <input
            type="number"
            placeholder={`tax`}
            onChange={(evt) => updateTax(evt.target.value)}
            value={props.utility.tax}
          />
        </div>
        <div style={{ marginLeft: "1%" }}>
          <p>{`per ${props.utility.unit}`}</p>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Item;
