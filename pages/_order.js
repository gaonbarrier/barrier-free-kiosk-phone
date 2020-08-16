import React, {Component} from 'react';
import {
  Body,
  Container,
  Header,
  Left,
  Title,
  Right,
} from 'native-base';
import OrderList from '../components/order-list';

export default class _order extends Component {
  constructor() {
    super();
    this.state = {
      3445: {
        Status: 'none',
        Date: '2020/07/24 2:52PM',
        OrderList: [
          {
            Menu: '아메리카노',
            Count: 3,
            Options: ['휘핑크림: 추가', '샷: 3', '시럽: 0'],
          },
          {
            Menu: '라떼',
            Count: 2,
            Options: ['휘핑크림: 없음', '샷: 1', '시럽: 1'],
          },
          {Menu: '쿠키', Count: 5, Options: ['초코칩']},
        ],
      },
      4003: {
        Status: 'confirmed',
        Date: '2020/07/24 2:52PM',
        OrderList: [
          {
            Menu: '아메리카노',
            Count: 3,
            Options: ['휘핑크림: 추가', '샷: 3', '시럽: 0'],
          },
          {
            Menu: '라떼',
            Count: 2,
            Options: ['휘핑크림: 없음', '샷: 1', '시럽: 1'],
          },
          {Menu: '쿠키', Count: 5, Options: ['초코칩']},
        ],
      },
      7315: {
        Status: 'rejected',
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
    };
  }

  render() {
    const OrderListCreator = () => {
      let row = [];
      let orderId = 1234;
      let menu = [];

      for (const [key, value] of Object.entries(this.state)) {
        console.log(`${key}: ${value}`);
        orderId = key;
        for (const [k, v] of Object.entries(value.OrderList)) {
          console.log(`${k}: ${v}`);
          menu.push(v.Menu + ` X ${v.Count} {` + v.Options.toString() + '}');
        }

        row.push(
          <OrderList
            thumbnail={require('../images/coffee.jpg')}
            orderId={orderId}
            menu={menu}
            orderPage={this}
          />,
        );
        orderId = 1234;
        menu = [];
      }

      return row;
    };

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>주문 열람</Title>
          </Body>
          <Right />
        </Header>
        <OrderListCreator />
      </Container>
    );
  }
}
