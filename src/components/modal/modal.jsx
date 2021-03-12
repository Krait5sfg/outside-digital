import React, {useState} from 'react';
import Checkbox from '../checkbox/checkbox';
import {calculateTaxDeductionForYear, calculateYearCount} from '../../utils/utils';
import NumberFormat from 'react-number-format';

const Modal = () => {
  const [isModalError, setModalError] = useState(false);
  const [isCheckboxActive, setCheckboxActive] = useState(false);
  const [salaryInputValue, setSalaryInputValue] = useState(0);
  const [taxDeductionCountYearsAndSums, setTaxDeductionCountYearsAndSums] = useState([]);

  const formRef = React.createRef();
  const classNameModalErrorMessageElement = isModalError ? `modal__error-message` : `modal__error-message modal__error-message--not-active`;
  const classNameModalInputSalaryElement = isModalError ? `modal__input-salary modal__input-salary--error` : `modal__input-salary`;

  const handleCalculateButtonClick = (evt) => {
    evt.preventDefault();
    salaryInputValue ? setModalError(false) : setModalError(true);

    // проверяет чтобы не было слишком маленькой суммы для расчета
    if (salaryInputValue.toString().length < 5) {
      return false;
    }

    if (salaryInputValue) {
      // тут логика расчетов налогового вычета
      const sumTaxDeductionForYear = calculateTaxDeductionForYear(salaryInputValue);
      setTaxDeductionCountYearsAndSums(calculateYearCount(sumTaxDeductionForYear));
      setCheckboxActive(true)
    } else {
      setTaxDeductionCountYearsAndSums([]);
      setCheckboxActive(false);
    }
  }

  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();
    if (!salaryInputValue) {
      setModalError(true);
    }
    if (isCheckboxActive) {
      const xhr = new XMLHttpRequest();
      xhr.open(`POST`, `http://test.loc`);
      const formData = new FormData(formRef.current);
      xhr.send(formData);
    }
  };

  const handleSalaryInput = (inputValue) => {
    const {value} = inputValue;

    // закрывает чекбокс как только поменялись данные в инпуте
    if (+value !== salaryInputValue) {
      setCheckboxActive(false);
    }

    setSalaryInputValue(+value);
    // если в инпуте есть данные убирается ошибка, если нет - прячется чекбокс
    salaryInputValue ? setModalError(false) : setCheckboxActive(false);
  }

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <button className="modal__close" aria-label="Закрыть форму">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6151 6.00057L11.6514 1.96311C11.7605 1.85778 11.8475 1.73179 11.9073 1.59248C11.9671 1.45318 11.9986 1.30335 12 1.15174C12.0013 1.00013 11.9724 0.849774 11.915 0.709449C11.8576 0.569124 11.7728 0.441638 11.6656 0.33443C11.5584 0.227222 11.4309 0.142438 11.2905 0.0850268C11.1502 0.0276153 10.9999 -0.00127433 10.8483 4.31116e-05C10.6967 0.00136056 10.5468 0.032859 10.4075 0.0927004C10.2682 0.152542 10.1422 0.239527 10.0369 0.348583L5.99943 4.3849L1.96311 0.348583C1.85778 0.239527 1.73179 0.152542 1.59248 0.0927004C1.45318 0.032859 1.30335 0.00136056 1.15174 4.31116e-05C1.00013 -0.00127433 0.849774 0.0276153 0.709449 0.0850268C0.569124 0.142438 0.441638 0.227222 0.33443 0.33443C0.227222 0.441638 0.142438 0.569124 0.0850268 0.709449C0.0276153 0.849774 -0.00127433 1.00013 4.31116e-05 1.15174C0.00136056 1.30335 0.032859 1.45318 0.0927004 1.59248C0.152542 1.73179 0.239527 1.85778 0.348583 1.96311L4.3849 5.99943L0.348583 10.0369C0.239527 10.1422 0.152542 10.2682 0.0927004 10.4075C0.032859 10.5468 0.00136056 10.6967 4.31116e-05 10.8483C-0.00127433 10.9999 0.0276153 11.1502 0.0850268 11.2905C0.142438 11.4309 0.227222 11.5584 0.33443 11.6656C0.441638 11.7728 0.569124 11.8576 0.709449 11.915C0.849774 11.9724 1.00013 12.0013 1.15174 12C1.30335 11.9986 1.45318 11.9671 1.59248 11.9073C1.73179 11.8475 1.85778 11.7605 1.96311 11.6514L5.99943 7.6151L10.0369 11.6514C10.1422 11.7605 10.2682 11.8475 10.4075 11.9073C10.5468 11.9671 10.6967 11.9986 10.8483 12C10.9999 12.0013 11.1502 11.9724 11.2905 11.915C11.4309 11.8576 11.5584 11.7728 11.6656 11.6656C11.7728 11.5584 11.8576 11.4309 11.915 11.2905C11.9724 11.1502 12.0013 10.9999 12 10.8483C11.9986 10.6967 11.9671 10.5468 11.9073 10.4075C11.8475 10.2682 11.7605 10.1422 11.6514 10.0369L7.6151 5.99943V6.00057Z" fill="#EA0029" /></svg>
        </button>
        <h2 className="modal__title">Налоговый вычет</h2>
        <p className="modal__description">Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</p>
        <form className="modal__form" action="/" method="post" name="form" ref={formRef}>
          <label className="modal__label" htmlFor="salary">Ваша зарплата в месяц</label>
          <NumberFormat className={classNameModalInputSalaryElement} placeholder="Введите данные" id="salary" name="salary" thousandSeparator=" " suffix=" ₽" onValueChange={handleSalaryInput} allowNegative={false} title="Сумма должна быть минимум из пяти цифр" />
          <p className={classNameModalErrorMessageElement}>Поле обязательно для заполнения</p>
          <button className="modal__label modal__label--calculate" type="button" onClick={handleCalculateButtonClick}>Рассчитать</button>

          <Checkbox isCheckboxActive={isCheckboxActive} taxDeductionCountYearsAndSums={taxDeductionCountYearsAndSums} />

          <span className="modal__label modal__label--reduce">Что уменьшаем?</span>
          <div className="modal__radio-field-set">
            <input className="modal__what-reduce-input visually-hidden" type="radio" id="payments" value="payments" name="what-reduce" defaultChecked />
            <label className="modal__label-for-hidden" htmlFor="payments">Платеж</label>
          </div>
          <div className="modal__radio-field-set">
            <input className="modal__what-reduce-input visually-hidden" type="radio" id="deadline" value="deadline" name="what-reduce" />
            <label className="modal__label-for-hidden" htmlFor="deadline">Срок</label>
          </div>
          {/*modal__submit--sm-margin уменьшает отступ при открытых расчетах вычета*/}
          <button className={isCheckboxActive ? `modal__submit modal__submit--sm-margin` : `modal__submit`} type="submit" onClick={handleSubmitButtonClick}>Добавить</button>
        </form >
      </div>
    </div>
  )
}

export default Modal;