import React, {Component} from 'react';
import {Content} from 'native-base';
import OrderComponents from '../components/order-components';

const json = {
  Action: 'OrderSubmit',
  OrderID: 4003,
  Date: '2020/07/24 2:52PM',
  OrderList: {
    0: {
      Menu: '아메리카노',
      Count: 3,
      Options: ['휘핑크림: 추가', '샷: 3', '시럽: 0'],
    },
    1: {
      Menu: '라떼',
      Count: 2,
      Options: ['휘핑크림: 없음', '샷: 1', '시럽: 1'],
    },
    2: {Menu: '쿠키', Count: 5, Options: ['초코칩']},
  },
};

export default class _order extends Component {
  render() {
    return (
      <Content style={{backgroundColor: 'white'}}>
        <OrderListCreator />
      </Content>
    );
  }
}

function OrderListCreator() {
  let rows = [];
  for (let i = 0; i < Object.keys(json.OrderList).length; i++) {
    rows.push(
      <OrderComponents
        key={'OrderComponents' + i}
        thumbnail={require('../images/coffee.jpg')}
        name={json.OrderList[i].Menu + ' X ' + json.OrderList[i].Count}
        options={json.OrderList[i].Options}
      />,
    );
  }
  return rows;
}
