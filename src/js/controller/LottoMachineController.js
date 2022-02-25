import Lottos from '../model/Lottos.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
import { isEmpty } from '../utils/common.js';

export default class LottoMachineController {
  constructor() {
    //멤버변수 초기화
    this.model = new Lottos();
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
    };

    //이벤트 리스너 등록
    this.view.purchaseMoneyView.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(purchaseMoney) {
    const lottos = this.model.getLottos();

    if (isEmpty(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.reset();
      this.purchaseLotto(purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    const lottos = this.model.makeLottos(lottoCount);

    this.view.purchasedLottoView.render(lottos, lottoCount);
    this.view.winningNumberView.render();
  }

  tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  reset() {
    this.model.resetStatus();
    this.view.purchasedLottoView.resetScreen();
    this.view.winningNumberView.resetScreen();
  }
}
