import {Actions} from 'flummox';
import WebAPIUtils from '../../utils/web_api_utils.js';

class SecretActions extends Actions {
  constructor(flux) {
    super();
    this.flux = flux;
  }

  loadSecrets() {
    WebAPIUtils.loadSecrets(this.flux);
    return true;
  }

}

export default SecretActions;
