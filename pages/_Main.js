import React, {Component} from 'react';
import {Card, CardItem, Content, Text} from 'native-base';
import {Dimensions} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';

export default class _Main extends Component {
  render() {
    return (
      <Content style={{padding: 10, backgroundColor: 'white'}}>
        <Card key={1}>
          <CardItem>
            <Text style={{fontWeight: 'bold'}}>매상 정보</Text>
          </CardItem>
          <CardItem cardBody style={{alignSelf: 'center'}}>
            <LineChart
              data={{
                labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fry', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: [
                      125000,
                      189000,
                      405000,
                      206000,
                      192000,
                      325000,
                      451400,
                    ],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50}
              height={220}
              yAxisLabel="₩"
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#fafafa',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(217, 56, 32, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </CardItem>
        </Card>
        <Card key={2}>
          <CardItem>
            <Text style={{fontWeight: 'bold'}}>품목</Text>
          </CardItem>
          <CardItem cardBody style={{alignSelf: 'center'}}>
            <BarChart
              data={{
                labels: [
                  '아메리카노',
                  '카페라떼',
                  '쿠키',
                  '케이크',
                  '오렌지주스',
                ],
                datasets: [
                  {
                    data: [20, 5, 11, 9, 14],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50}
              height={220}
              chartConfig={{
                // backgroundColor: '#f4129e',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#fafafa',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(217, 56, 32, ${opacity})`,
              }}
            />
          </CardItem>
        </Card>
      </Content>
    );
  }
}
