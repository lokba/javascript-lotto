import { convertToNumber } from '../utils/common.js';
import { validatePurchaseMoney } from './validator.js';
import { eventManager } from '../utils/event.js';
import { EVENT } from '../constants/index.js';

export default class InputMoneyView {
  constructor() {
    //멤버변수 초기화
    this.purchasedMoneyForm = document.getElementById('purchase-money-form');
    this.purchaseMoneyInput = document.getElementById('purchase-money-input');

    //이벤트리스너 등록
    eventManager.on(this.purchasedMoneyForm, 'submit', e =>
      this.handlePurchasedMoneyFormSubmit(e),
    );
  }

  handlePurchasedMoneyFormSubmit(e) {
    e.preventDefault();
    const purchaseMoney = convertToNumber(this.purchaseMoneyInput.value);

    try {
      validatePurchaseMoney(purchaseMoney);
      eventManager.emit(this.purchasedMoneyForm, EVENT.SUBMIT_MONEY, {
        purchaseMoney,
      });
    } catch (error) {
      this.resetInputValue();
      alert(error);
    }
  }

  resetInputValue() {
    this.purchaseMoneyInput.value = '';
  }
}
