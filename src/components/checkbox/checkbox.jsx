import React from 'react';
import {formatNumber, setEndingNumber} from '../../utils/utils';

const Checkbox = ({isCheckboxActive, taxDeductionCountYearsAndSums}) => {
  let checkboxElements = [];
  if (isCheckboxActive && taxDeductionCountYearsAndSums.length) {
    checkboxElements = taxDeductionCountYearsAndSums.map((yearAndSum, index) => {
      const parsingData = Object.entries(yearAndSum);
      const [year, sum] = parsingData[0];
      return (
        <li className="modal__item" key={index}>
          <input className="visually-hidden modal__checkbox" type="checkbox" name={`${year}-year`} id={`${year}-year`} value={sum} defaultChecked />
          <label className="modal__checkbox-label" htmlFor={`${year}-year`}>
            <span className="modal__checkbox-text">{`${formatNumber(sum)} рублей `}</span>
            <span className="modal__checkbox-text modal__checkbox-text--year">{`в ${year}-${setEndingNumber(year)} год`}</span>
          </label>
        </li>
      )
    });
  }

  return (
    <div className={isCheckboxActive ? `modal__checkbox-block` : `modal__checkbox-block modal__checkbox-block--not-active`}>
      <p className="modal__label modal__label--checkbox-title">Итого можете внести в качестве досрочных:</p>
      <ul className="modal__list">
        {checkboxElements}
      </ul>
    </div >
  )
}

export default Checkbox;