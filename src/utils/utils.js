const MONTH_COUNT = 12;
const TAX_DEDUCTION = 0.13;
const MAX_SUM_TAX_DEDUCTION_LIMIT = 260000;
const NUMBER_ENDINGS = [`ый`, `ой`, `ий`];
export const LIMIT_NUMBER_LENGTH = 5;

export const EscapeCode = {
  STRING: `Escape`,
  NUMBER: 27
}

export const calculateTaxDeductionForYear = (salary) => {
  return (salary * MONTH_COUNT) * TAX_DEDUCTION;
}

export const calculateYearCount = (sumTaxDeductionForYear) => {
  const yearCount = Math.ceil(MAX_SUM_TAX_DEDUCTION_LIMIT / sumTaxDeductionForYear);
  let maxSumTaxDeduction = MAX_SUM_TAX_DEDUCTION_LIMIT;
  const results = [];
  for (let i = 1; i <= yearCount; i++) {
    if (maxSumTaxDeduction > sumTaxDeductionForYear) {
      maxSumTaxDeduction -= sumTaxDeductionForYear;
      results.push({[`${i}`]: sumTaxDeductionForYear % 2 === 0 ? sumTaxDeductionForYear : sumTaxDeductionForYear.toFixed(2)});
    } else {
      results.push({[`${i}`]: maxSumTaxDeduction % 2 === 0 ? maxSumTaxDeduction : maxSumTaxDeduction.toFixed(2)});
    }
  }
  return results;
}

export const formatNumber = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
}

export const setEndingNumber = (numberYear) => {
  const number = +numberYear;
  if (number === 3) {
    return NUMBER_ENDINGS[2];
  }
  if (number === 2 || number === 6 || number === 7 || number === 8) {
    return NUMBER_ENDINGS[1];
  }
  return NUMBER_ENDINGS[0];
}