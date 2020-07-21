import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import OrderList from './components/orderList';
export default class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content>
          <OrderList
            thumbnail={require('./images/coffee.jpg')}
            name="아메리카노!"
            options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
          />
          <OrderList
            thumbnail={require('./images/coffee.jpg')}
            name="아메리카노!"
            options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
          />
          <OrderList
            thumbnail={require('./images/coffee.jpg')}
            name="아메리카노!"
            options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
          />
          <OrderList
            thumbnail={require('./images/coffee.jpg')}
            name="아메리카노!"
            options={['휘핑크림: 추가', '샷: 3', '시럽: 없음']}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button badge vertical>
              <Badge>
                <Text>2</Text>
              </Badge>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button active badge vertical>
              <Badge>
                <Text>51</Text>
              </Badge>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
