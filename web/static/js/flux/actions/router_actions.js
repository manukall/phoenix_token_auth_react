import {Actions} from 'flummox';

class RouterActions extends Actions {
  redirect(route) {
    return route;
  }
}

export default RouterActions;
