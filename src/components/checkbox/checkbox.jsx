import React from 'react';

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
            <span className="module__checkbox-text">{`${sum} рублей `}</span>
            <span className="module__checkbox-text module__checkbox-text--year">{`в ${year}-ый год`}</span>
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
        {/* <li className="modal__item">
          <input className="visually-hidden modal__checkbox" type="checkbox" name="1-year" id="1-year" data-value="" />
          <label className="modal__checkbox-label" htmlFor="1-year">
            <span className="module__checkbox-text">78 000 рублей </span>
            <span className="module__checkbox-text module__checkbox-text--year">в 1-ый год</span>
          </label>
        </li>
        <li className="modal__item">
          <input className="visually-hidden modal__checkbox" type="checkbox" name="2-year" id="2-year" data-value="" />
          <label className="modal__checkbox-label" htmlFor="2-year">
            <span className="module__checkbox-text">78 000 рублей </span>
            <span className="module__checkbox-text module__checkbox-text--year">в 2-ой год</span>
          </label>
        </li>
        <li className="modal__item">
          <input className="visually-hidden modal__checkbox" type="checkbox" name="3-year" id="3-year" data-value="" />
          <label className="modal__checkbox-label" htmlFor="3-year">
            <span className="module__checkbox-text">78 000 рублей </span>
            <span className="module__checkbox-text module__checkbox-text--year">в 3-ий год</span>
          </label>
        </li>
        <li className="modal__item">
          <input className="visually-hidden modal__checkbox" type="checkbox" name="4-year" id="4-year" data-value="" />
          <label className="modal__checkbox-label" htmlFor="4-year">
            <span className="module__checkbox-text">78 000 рублей </span>
            <span className="module__checkbox-text module__checkbox-text--year">в 4-ый год</span>
          </label>
        </li> */}
      </ul>
    </div >
  )
}

export default Checkbox;