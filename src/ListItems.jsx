import React, { useState } from "react";
import Item from "./Item";
import Modal from "./Modal";

class Utility {
  constructor(utilityName, rate, unit, consumptionVal, tax, annualy, fixed) {
    this.utility = utilityName;
    this.rate = rate;
    this.unit = unit;
    this.consumptionVal = consumptionVal;
    this.tax = tax;
    this.annualy = annualy;
    this.fixed = fixed;
  }
}
function ListItems() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Final Response is according to the final output expected.
  const [finalResponse, setFinalResponse] = useState({});

  //Using by default Utilities provided in the question
  //Using the concept of Object Oriented Programming to store the Utilites Data.
  //The object has certain attributes that are used below.
  //For any other utility other than the pre defined ones, Miscellaneous row can be used
  let home = new Utility("Home Consumption", 10, "sq feet", 0, 0, true, 0);
  let water = new Utility("Water Consumption", 0.01, "litres", 0, 0, false, 0);
  let electricity = new Utility(
    "Electricity Consumption",
    5,
    "untis",
    0,
    18,
    false,
    0
  );
  let phone = new Utility(
    "Phone Consumption",
    0.01,
    "seconds",
    0,
    5,
    false,
    100
  );
  let gas = new Utility("Gas Consumption", 15, "litre", 0, 0, false, 0);
  let miscellaneous = new Utility(
    "Miscellaneous Consumption",
    0,
    "unit",
    0,
    0,
    false,
    0
  );
  const [utilityList, setUtilityList] = useState([
    home,
    water,
    electricity,
    phone,
    gas,
    miscellaneous,
  ]);
  const calBill = () => {
    let finalResponse = {
      AnnualExpense: 0,
      MonthlyExpense: 0,
      TotalExpense: 0,
      MonthlyUtilityWise: [],
      AnuallyUtilityWise: [],
    };
    utilityList.forEach((utility) => {
      if (utility.consumptionVal !== 0) {
        const tempExpense =
          Number(utility.consumptionVal) * Number(utility.rate) +
          Number(utility.fixed);
        //Adding the fixed charge, if in case provided. for eg- for Phone consumption, fixed charge is INR 100.
        const curExpenseTax = `${
          utility.tax === 0 ? 0 : Number(utility.tax / 100) * tempExpense
        }`;
        const curTotalExpense = Number(tempExpense) + Number(curExpenseTax);
        if (utility.annualy) {
          //If annually then will include this expense in Other annual expenses.
          finalResponse.AnnualExpense += curTotalExpense;
          const curAnnualWiseExpense = {};
          curAnnualWiseExpense["utility"] = utility.utility;
          curAnnualWiseExpense["expense"] = curTotalExpense;
          finalResponse.AnuallyUtilityWise.push({
            curAnnualWiseExpense,
          });
        } else {
          finalResponse.MonthlyExpense += curTotalExpense;
          const curMonthWiseExpense = {};
          curMonthWiseExpense["utility"] = utility.utility;
          curMonthWiseExpense["expense"] = curTotalExpense;
          finalResponse.MonthlyUtilityWise.push({
            curMonthWiseExpense,
          });
        }
        finalResponse.TotalExpense += curTotalExpense;
      }
    });
    setFinalResponse(finalResponse);
    handleShow(); //Method used to invoke the modal and show the final details.
  };
  return (
    <div className="box-cls">
      <div className="left">
        <div style={{ display: "flex" }}>
          <p style={{ marginLeft: "20%" }}>Consumption</p>
          <p style={{ marginLeft: "60%" }}>Rate</p>
          <p style={{ marginLeft: "22%" }}>Tax</p>
        </div>
        {utilityList.map((utility, index) => {
          return (
            <Item
              utility={utility}
              key={index}
              index={index}
              setUtilityList={setUtilityList}
              utilityList={utilityList}
            />
          );
        })}
        <button onClick={calBill}>Calculate Monthly Bill</button>
      </div>
      {show && (
        <Modal handleClose={handleClose} finalResponse={finalResponse} />
      )}
    </div>
  );
}

export default ListItems;
