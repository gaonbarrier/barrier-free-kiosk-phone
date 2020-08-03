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

export default class OrderComponents extends Component {
  render() {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail small source={this.props.thumbnail} />
          </Left>
          <Body>
            <Text>{this.props.name}</Text>
            {this.props.options.map((option, i) => {
              return (
                <Text note key={i} numberOfLines={i}>
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
