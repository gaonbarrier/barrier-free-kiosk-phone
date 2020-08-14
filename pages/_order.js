import React, {Component} from 'react';
import {Content} from 'native-base';
import OrderComponents from '../components/order-components';

export default class _order extends Component {
  constructor() {
    super();
    this.state = {
      4003: {
        Status: 'confirmed',
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
      },
      7315: {
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
      }
    };
  }

  render() {
    const OrderListCreator = () => {
      let rows = [];

      for (const [key, value] of Object.entries(this.state)) {
        console.log(`${key}: ${value}`);
      }

      return rows;
    };
    return (
      <Content style={{backgroundColor: 'white'}}>
        <OrderListCreator />
      </Content>
    );
  }
}
