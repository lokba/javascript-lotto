import { EVENT } from '../constants';
import { eventManager } from '../utils/event';

export default class LottoResultModalView {
  constructor() {
    //멤버변수 초기화
    this.app = document.getElementById('app');
    this.lottoResultModal = document.getElementById('lotto-result-modal');
    this.winningCounts = document.querySelectorAll('.winning-count');
    this.totalProfitRate = document.getElementById('total-profit-rate');
    this.restartButton = document.getElementById('restart-button');
    this.closeButton = document.getElementById('close-button');

    //이벤트리스너 등록
    this.closeButton.addEventListener('click', this.hideModal.bind(this));
    eventManager.on(this.restartButton, 'click', () =>
      this.clickRestartButtonHandler(),
    );
  }

  renderLottoResult(lottoResult) {
    const countPerRanking = Object.values(lottoResult);

    this.winningCounts.forEach(
      (winningCount, index) =>
        (winningCount.textContent = `${countPerRanking[4 - index]}개`),
    );
  }

  renderTotalProfitRate(totalProfitRate) {
    this.totalProfitRate.textContent = totalProfitRate.toFixed(2);
  }

  clickRestartButtonHandler() {
    this.hideModal();
    eventManager.emit(this.restartButton, EVENT.CLICK_RESTART, {});
  }

  hideModal() {
    this.lottoResultModal.classList.replace('show', 'hide');
  }
}
