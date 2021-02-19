import React from "react";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.handleClose()}>
          &times;
        </span>
        <h2>
          Total Expense: INR{" "}
          {Number(props.finalResponse.TotalExpense).toFixed(2)}
        </h2>
        <h3>
          Total spending for this month: INR{" "}
          {Number(props.finalResponse.MonthlyExpense).toFixed(2)}
        </h3>
        {props.finalResponse.MonthlyUtilityWise.map((utility, index) => {
          return (
            <h4>{`${utility.curMonthWiseExpense["utility"]}: INR ${Number(
              utility.curMonthWiseExpense["expense"]
            ).toFixed(2)}`}</h4>
          );
        })}
        -----------------------------------------------------------------------
        <h2>
          Other Annual Expenses: INR{" "}
          {Number(props.finalResponse.AnnualExpense).toFixed(2)}
        </h2>
        {props.finalResponse.AnuallyUtilityWise.map((utility, index) => {
          return (
            <h4>{`${utility.curAnnualWiseExpense["utility"]}: INR ${Number(
              utility.curAnnualWiseExpense["expense"]
            ).toFixed(2)}`}</h4>
          );
        })}
      </div>
    </div>
  );
}

export default Modal;
