import React, {Component} from 'react';
import {
  Body,
  Button,
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
            <Thumbnail square source={this.props.thumbnail} />
          </Left>
          <Body>
            <Text>{this.props.name}</Text>
            {this.props.options.map((option) => {
              return (
                <Text note numberOfLines={1}>
                  {option}
                </Text>
              );
            })}
          </Body>
          <Right>
            <Button transparent>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    );
  }
}
