import React, {Component} from 'react';
import {
  Body,
  Form,
  Picker,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';

export default class OrderList extends Component {
  render() {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail small source={this.props.thumbnail} />
          </Left>
          <Body>
            <Text>주문번호 {this.props.orderId}</Text>
            {this.props.menu.map((option, i) => {
              return (
                <Text note key={i} numberOfLines={i}>
                  {option}
                </Text>
              );
            })}
          </Body>
          <Right>
            <Form>
              <Picker note mode="dropdown" style={{backgroundColor: 'red'}}>
                <Picker.Item label="결제 대기" value="key0" />
                <Picker.Item label="결제 완료" value="key1" />
                <Picker.Item label="결제 취소" value="key2" />
              </Picker>
            </Form>
          </Right>
        </ListItem>
      </List>
    );
  }
}
