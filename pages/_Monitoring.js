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

const data = {
  labels: ['Battery', 'Wifi'],
  data: [0.6, 0.8],
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const tabletList = {
  0: {battery: '100', wifi: 'Strong'},
  1: {battery: '100', wifi: 'Strong'},
  2: {battery: '100', wifi: 'Strong'},
};

const width = Dimensions.get('window').width;

export default class _Monitoring extends Component {
  render() {
    return (
      <Content style={{padding: 10}}>
        <TabletListCreator />
      </Content>
    );
  }
}

function TabletListCreator() {
  let rows = [];
  for (let i = 0; i < Object.keys(tabletList).length; i++) {
    rows.push(
      <Card>
        <CardItem>
          <Text>태블릿 {i}</Text>
        </CardItem>
        <CardItem cardBody>
          <ProgressChart
            data={data}
            width={width - 15}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </CardItem>
      </Card>,
    );
  }
  return rows;
}
