import View from './View';

export default class LottoResultModalView extends View {
  constructor() {
    super();
    //멤버변수 초기화
    this.app = document.getElementById('app');
    this.lottoResultModal = document.getElementById('lotto-result-modal');
    this.winningCounts = document.querySelectorAll('.winning-count');
    this.totalProfitRate = document.getElementById('total-profit-rate');
    this.restartButton = document.getElementById('restart-button');
    this.closeButton = document.getElementById('close-button');

    this.closeButton.addEventListener('click', this.hideModal.bind(this));
    this.restartButton.addEventListener(
      'click',
      this.clickRestartButtonHandler.bind(this),
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
    this.totalProfitRate.textContent = totalProfitRate;
  }

  clickRestartButtonHandler() {
    this.hideModal();
    this.handlers.get('lottoResultModalClick').forEach(func => func());
  }

  hideModal() {
    this.lottoResultModal.classList.replace('show', 'hide');
  }
}
