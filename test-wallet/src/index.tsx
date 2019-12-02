import React from 'react';
import ReactDOM from 'react-dom';
import { NativeAsset, ERC20Asset, ERC777Asset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway } from '@burner-wallet/core/gateways';
import Exchange, { Uniswap } from '@burner-wallet/exchange';
import ModernUI from '@burner-wallet/modern-ui';
import CollectablePlugin from '@burner-factory/collectable-plugin';
import AdventurePlugin from 'adventure-plugin';
import PushNotificationPlugin from '@burner-factory/push-notification-plugin';
import SchedulePlugin from '@burner-factory/schedule-plugin';
import BurnableENSSubdomainPlugin from 'burnable-ens-subdomain-plugin';
import FortmaticPlugin from 'fortmatic-plugin';
import DAOPlugin from 'dao-plugin';
import schedule from './waterloo.json';


const buff = new ERC777Asset({
  id: 'buff',
  name: 'BuffiDai',
  network: '42',
  address: '0xc0d48A6ED1C9CD4a784A025C366b868574AA33a0',
  icon: 'https://buffidai.io/static/media/bufficorn.e2983bb0.png',
});

const rep = new ERC777Asset({
  id: 'rep',
  name: 'Rep',
  network: '42',
  address: '0xc0d48A6ED1C9CD4a784A025C366b868574AA33a0',
  icon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/emojione/211/flexed-biceps_1f4aa.png',
});

const keth = new NativeAsset({
  id: 'keth',
  name: 'kETH',
  network: '42',
});

const kdai = new ERC20Asset({
  id: 'kdai',
  name: 'kDai',
  network: '42',
  address: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
});

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  assets: [buff, rep, keth, kdai],
});

const exchange = new Exchange({
  pairs: [new Uniswap('dai')],
});

const BurnerWallet = () =>
  <ModernUI
    title="ETHDenver"
    core={core}
    plugins={[
      exchange,
      new BurnableENSSubdomainPlugin('myburner.eth'),
      new CollectablePlugin('42', '0xdc6Bc87DD19a4e6877dCEb358d77CBe76e226B8b'),
      new PushNotificationPlugin(process.env.REACT_APP_VAPID_KEY!, '0'),
      new FortmaticPlugin(),
      new DAOPlugin(),
      new AdventurePlugin(),
      new SchedulePlugin(schedule),
    ]}
  />



ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
