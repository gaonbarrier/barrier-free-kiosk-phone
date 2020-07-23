import React, {Component} from 'react';
import {Content} from 'native-base';
import OrderList from '../components/OrderList';

export default class _Order extends Component {
  render() {
    return (
      <Content style={{backgroundColor: 'white'}}>
        <OrderList
          thumbnail={require('../images/coffee.jpg')}
          name="아메리카노"
          options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
        />
        <OrderList
          thumbnail={require('../images/coffee.jpg')}
          name="아메리카노"
          options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
        />
        <OrderList
          thumbnail={require('../images/coffee.jpg')}
          name="아메리카노"
          options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
        />
      </Content>
    );
  }
}
