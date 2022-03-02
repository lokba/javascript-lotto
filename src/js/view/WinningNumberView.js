import { RULES } from '../constants/index.js';
import { convertToNumber } from '../utils/common.js';
import { validateWinningNumberList } from '../utils/validator.js';
import View from './View.js';

//template
const INPUT_ELEMENT = `<input type="text" class="winning-number-input" maxlength='2'/>`;

const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="winning-number-boxes">
      <div id="win-number-box">
        <p>당첨 번호</p>
        <div class="input-box">
        ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
        </div>
      </div>
      <div id="bonus-number-box">
        <p>보너스 번호</p>
        <div class="input-box">
          ${INPUT_ELEMENT}
        </div>
      </div>
    </div>
    <button id="result-button" type="submit">결과 확인하기</button>
  </form>
`;

//class
export default class WinningNumberView extends View {
  constructor() {
    super();

    this.app = document.getElementById('app');
    this.container = document.getElementById('winning-number-container');
    this.modal = document.getElementById('winning-statistics-modal');
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_FORM);

    const winningNumberForm = document.getElementById('winning-number-form');
    this.winningNumberInputs = document.querySelectorAll(
      '.winning-number-input',
    );

    winningNumberForm.addEventListener('submit', this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();

    const winningNumbers = this.winningNumberInputs.map(input =>
      input.value === '' ? null : convertToNumber(input.value),
    );

    try {
      validateWinningNumberList(winningNumbers);
      this.handlers
        .get('winningNumberSubmit')
        .forEach(func => func(winningNumbers));
      this.showModal();
    } catch (error) {
      this.resetInputElementsValue();
      alert(error);
    }
  }

  showModal() {
    this.app.classList.replace('modal-off', 'modal-on');
    this.modal.classList.replace('modal-hide', 'modal-show');
  }

  resetInputElementsValue() {
    this.winningNumberInputs.forEach(input => (input.value = ''));
  }

  resetScreen() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
