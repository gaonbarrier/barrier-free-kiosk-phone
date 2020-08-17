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
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.status !== prevProps.status) {
      this.setStatus(this.props.status);
    }
  }

  comfirmedColor() {
    switch (this.state.status) {
      case 'confirmed':
        return '#d6ff9f';
      case 'rejected':
        return '#ff6868';
      default:
        return '#f3f3f3';
    }
  }

  setStatus(newStatus: String) {
    this.setState({status: newStatus});
  }

  render() {
    return (
      <List style={{backgroundColor: this.comfirmedColor()}}>
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
              <Picker
                selectedValue={this.state.status}
                onValueChange={this.setStatus.bind(this)}
                mode="dropdown"
                style={{backgroundColor: '#b3edff', fontSize: 14}}>
                <Picker.Item label="결제 대기" value="none" />
                <Picker.Item label="결제 완료" value="confirmed" />
                <Picker.Item label="결제 취소" value="rejected" />
              </Picker>
            </Form>
          </Right>
        </ListItem>
      </List>
    );
  }
}
