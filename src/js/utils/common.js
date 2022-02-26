import { RULES } from '../constants/index.js';

export const isEmpty = value => {
  return value === null;
};

export const isZero = value => {
  return value === 0;
};

export const isNotNumber = value => {
  return Number.isNaN(value) || typeof value !== 'number';
};

export const isNegativeNumber = value => {
  return value < 0;
};

export const isNotUnitOfThousand = value => {
  return value % RULES.LOTTO_PRICE !== 0;
};

export const convertToNumber = value => {
  return Number(value);
};

export const pickLottoNumber = count => {
  //로또번호 1 ~ 45를 소유하고 있는 배열
  const lottoNumbers = [...Array(RULES.MAX_LOTTO_NUMBER)].map(
    (_, index) => index + 1,
  );
  shuffleArray(lottoNumbers);

  const numbers = [];

  for (let i = 0; i < count; i++) {
    numbers.push(lottoNumbers.pop());
  }

  return numbers;
};

function shuffleArray(inputArray) {
  inputArray.sort(() => Math.random() - 0.5);
}
