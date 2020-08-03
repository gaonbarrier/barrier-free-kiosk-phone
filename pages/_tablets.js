import React, {Component} from 'react';
import {Dimensions, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import {ProgressChart} from 'react-native-chart-kit';

const tabletList = {
  0: {battery: '100', wifi: 'Strong'},
  1: {battery: '100', wifi: 'Strong'},
  2: {battery: '100', wifi: 'Strong'},
};

export default class _tablets extends Component {
  render() {
    return (
      <Content style={{padding: 10, backgroundColor: 'white'}}>
        <TabletListCreator />
      </Content>
    );
  }
}

function TabletListCreator() {
  let rows = [];
  for (let i = 0; i < Object.keys(tabletList).length; i++) {
    rows.push(
      <Card key={i}>
        <CardItem>
          <Text>태블릿 {i}</Text>
        </CardItem>
        <CardItem cardBody style={{alignSelf: 'center'}}>
          <ProgressChart
            data={[0.4, 0.6, 0.8]}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
              },
            }}
          />
        </CardItem>
      </Card>,
    );
  }
  return rows;
}
