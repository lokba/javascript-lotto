import { LOTTO_SETTINGS } from './settings.js';

export const ALERT_MESSAGES = {
  UNDER_MIN_PRICE: `최소 ${LOTTO_SETTINGS.LOTTO_PRICE}원 이상의 금액을 입력해야 합니다.`,
  NOT_INTEGER_PRICE: `구입 금액은 정수로 입력해야합니다.`,

  EMPTY_RESULT_INPUT: '당첨 번호와 보너스 번호를 입력해주세요.',
  DUPLICATED_NUMBERS_EXIST: '로또 번호에 중복이 있습니다.',
  NUMBERS_OUT_OF_RANGE: '로또 번호는 1 ~ 45 사이의 숫자여야 합니다.',
}
