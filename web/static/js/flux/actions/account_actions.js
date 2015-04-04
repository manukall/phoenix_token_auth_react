import {Actions} from 'flummox';
import WebAPIUtils from "../../utils/web_api_utils";

class AccountActions extends Actions {
  constructor(flux) {
    super();
    this.flux = flux;
  }

  updateAccount(email, password) {
    WebAPIUtils.updateAccount(this.flux, email, password);
    return {
      email: email,
      password: password
    };
  }
}

export default AccountActions;
