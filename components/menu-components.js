import React, {Component} from 'react';
import {
  View,
  Text,
  ListItem,
  Body,
  Right,
  Button,
  Thumbnail,
  Input,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {getImage} from '../functions/getImage';

// 메뉴 보기에서의 메뉴 리스트
// 간단하게 메뉴 이름 확인하고 삭제 가능
// 메뉴 이름 터치하면 상세내용 확인 가능
export const MenuList = (props) => (
  <ListItem>
    <Body style={{marginLeft: 40}}>
      <Text>{props.menuName}</Text>
    </Body>
    <Right>
      <Button danger>
        <Text>삭제</Text>
      </Button>
    </Right>
  </ListItem>
);

// 메뉴 재료 추가 컴포넌트
export class Ingred_Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbSource: {
        uri: null,
      },
    };
  }
  render() {
    return (
      <View style={{alignItems: 'center', marginHorizontal: 10}}>
        <TouchableOpacity onPress={this.props.is_dummy ? this.props.onPress : () => getImage(this)}>
          <Thumbnail
            large
            source={this.state.thumbSource}
            style={{backgroundColor: '#dedede'}}
          />
        </TouchableOpacity>
        <Input style={{fontSize: 17}}>{this.props.name}</Input>
      </View>
    );
  }
}
