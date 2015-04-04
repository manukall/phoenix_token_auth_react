import '../css/app.less';
import React from 'react';
import FluxComponent from 'flummox/component';
import AppFlux from './flux/app_flux.js';


let flux = new AppFlux();

let router = flux.getStore("RouterStore").getRouter();

router.run(function (Handler, state) {
  React.render(
    <FluxComponent flux={flux} connectToStores={['SessionsStore']} >
      <Handler />
    </FluxComponent>,
    document.getElementById('app')
  );
});
