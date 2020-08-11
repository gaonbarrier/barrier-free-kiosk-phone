import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  ListItem,
  Body,
  Right,
  Button,
  Thumbnail,
  Input,
  Item,
  Label,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

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
export const Ingred_Edit = (props) => {
  const [newProps, setNewProps] = useState(props);
  useEffect(() => {
    setNewProps(newProps);
  }, [newProps, props]);

  return (
    <View style={{alignItems: 'center', marginHorizontal: 10}}>
      <TouchableOpacity
        onPress={props.is_dummy ? props.onPress : () => getImage(props)}>
        <Thumbnail
          large
          source={props.thumbSource}
          style={{backgroundColor: '#dedede'}}
        />
      </TouchableOpacity>
      <Input
        onEndEditing={(e) =>
          props.upIngred(
            props.compKey,
            e.nativeEvent.text,
            props.thumbSource.uri,
          )
        }
        style={{fontSize: 17}}>
        {props.name}
      </Input>
    </View>
  );
};

const xButton = (props) => {
  let tag = (
    <Button
      style={{alignSelf: 'center', flex: 1.3}}
      onPress={() => props.deleteEvent(props.compKey)}
      danger
      full>
      <Icon name="minus" type="Foundation" />
    </Button>
  );
  if (props.isLast) {
    tag = (
      <Button
        style={{alignSelf: 'center', flex: 1.3}}
        onPress={() => props.updateEvent()}
        full>
        <Icon name="plus-thick" type="MaterialCommunityIcons" />
      </Button>
    );
  }
  return tag;
};

export class Option_Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLast: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isLast !== prevState.isLast) {
      return {isLast: nextProps.isLast};
    }

    return null;
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Item stackedLabel style={{flex: 2}}>
          <Label>옵션 이름</Label>
          <Input
            onEndEditing={(e) =>
              this.props.updateEvent(
                this.props.compKey,
                e.nativeEvent.text,
                this.props.price,
              )
            }>
            {this.props.name}
          </Input>
        </Item>
        <Item stackedLabel style={{flex: 5}}>
          <Label>옵션 가격</Label>
          <Input
            onEndEditing={(e) =>
              this.props.updateEvent(
                this.props.compKey,
                this.props.name,
                e.nativeEvent.text,
              )
            }>
            {this.props.price}
          </Input>
        </Item>
        {xButton(this.props)}
      </View>
    );
  }
}

let options = {
  title: '이미지 찾기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const getImage = (props) =>
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = {uri: 'data:image/jpeg;base64,' + response.data};
      props.upIngred(props.compKey, props.name, source.uri);
    }
  });
