import React, {Component} from 'react';
import {Ingred_Edit, Option_Edit} from '../components/menu-components';
import {
  Button,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Text,
  View,
} from 'native-base';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RunClient} from '../networks/Server';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export default class MenuAdd extends Component {
  constructor() {
    super();
    this.state = {
      menuName: '메뉴 이름',
      category: '카테고리',
      image: null,
      price_1: 1300,
      price_2: 1500,
      ingredients: {
        0: {
          name: '커콩',
          image: null,
        },
        1: {
          name: '물',
          image: null,
        },
      },
      options: [
        {name: '샷', price: 400},
        {name: '크림', price: 300},
      ],
    };
  }

  mockup = {
    Action: 'NewMenu',
    Name: '메뉴이름',
    Category: '카테고리',
    Price_1: '뜨거운메뉴 가격',
    Price_2: '차가운메뉴 가격',
    Images: [
      '카테고리_메뉴이름.PNG',
      '재료_재료1.PNG',
      '재료_재료2.PNG',
      '재료_재료3.PNG',
    ],
    Ingredients: ['재료1', '재료2', '재료3'],
    Options: {
      Option1: '?',
      Option2: '?',
    },
  };

  sendImages = () => {

  }

  updateIngredients = (
    index = Object.keys(this.state.ingredients).length,
    name = '메뉴이름',
    image = null,
  ) => {
    let obj = {};
    obj.name = name;
    obj.image = image;
    this.state.ingredients[index] = obj;
    this.setState({ingredients: this.state.ingredients});
  };

  updateOptions = (index, name = '옵션이름', price = 0) => {
    if (index == null) {
      let _options = Object.keys(this.state.options);
      index = _options[_options.length - 1] + 1;
    }
    let obj = {};
    obj.name = name;
    obj.price = price;
    this.state.options[index] = obj;
    this.setState({options: this.state.options});
  };

  deleteOption = (index) => {
    delete this.state.options[index];
    this.setState({options: this.state.options});
  };

  getMenuImage = () =>
    ImagePicker.showImagePicker(
      {
        title: '이미지 찾기',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // const source = {uri: response.uri};

          // You can also display the image using data:
          // const source = {uri: 'data:image/jpeg;base64,' + response.data};
          ImageResizer.createResizedImage(
            response.uri,
            400,
            400,
            'PNG',
            90,
          ).then(({uri}) => {
            let movedUri = uri.replace(
              uri.split('/').pop(),
              this.state.category + '_' + this.state.menuName + '.PNG',
            );
            console.log('Resized URI=' + movedUri);
            RNFS.unlink(movedUri);
            RNFS.moveFile(uri, movedUri);
            this.state.image = null;
            this.setState({image: this.state.image});
            this.state.image = movedUri;
            this.setState({image: this.state.image});
          });
        }
      },
    );

  sendMenuToTablet() {}

  render() {
    const Ingreds = () => {
      let tag = [];
      for (let index in this.state.ingredients) {
        tag.push(
          <Ingred_Edit
            name={this.state.ingredients[index].name}
            key={index}
            compKey={index}
            thumbSource={{uri: this.state.ingredients[index].image}}
            upIngred={this.updateIngredients}
          />,
        );
      }
      return tag;
    };

    const Options = () => {
      let tag = [];
      for (let index in this.state.options) {
        // 10진수로 파싱
        // index = parseInt(index, 10);
        let flag = false;
        let _options = Object.keys(this.state.options);
        if (index === _options[_options.length - 1]) {
          flag = true;
        }
        tag.push(
          <Option_Edit
            key={index}
            compKey={index}
            isLast={flag}
            name={this.state.options[index].name}
            price={this.state.options[index].price}
            updateEvent={this.updateOptions}
            deleteEvent={this.deleteOption}
          />,
        );
      }
      return tag;
    };

    return (
      <Content
        style={{paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
        <Item stackedLabel style={MenuStyle.item}>
          <Label>메뉴 이름</Label>
          <Input
            onEndEditing={(e) => this.setState({menuName: e.nativeEvent.text})}>
            {this.state.menuName}
          </Input>
        </Item>
        <Item stackedLabel style={MenuStyle.item}>
          <Label>메뉴 카테고리</Label>
          <Input
            onEndEditing={(e) => this.setState({category: e.nativeEvent.text})}>
            {this.state.category}
          </Input>
        </Item>
        <Item stackedLabel style={MenuStyle.item}>
          <Label>메뉴 이미지</Label>
          <TouchableOpacity onPress={() => this.getMenuImage()}>
            <Image
              source={{uri: this.state.image}}
              style={{
                backgroundColor: '#d7d7d7',
                width: 100,
                height: 100,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
        </Item>
        <View style={{flexDirection: 'row'}}>
          <Item stackedLabel style={{flex: 1}}>
            <Label>가격</Label>
            <Input
              onEndEditing={(e) =>
                this.setState({price_1: e.nativeEvent.text})
              }>
              {this.state.price_1}
            </Input>
          </Item>
          <Item stackedLabel style={{flex: 1}}>
            <Label>가격 2</Label>
            <Input
              onEndEditing={(e) =>
                this.setState({price_2: e.nativeEvent.text})
              }>
              {this.state.price_2}
            </Input>
          </Item>
        </View>
        <Item
          stackedLabel
          style={{alignItems: 'space-between', alignSelf: 'stretch'}}>
          <Label>재료</Label>
          <ScrollView horizontal={true} style={{alignSelf: 'stretch'}}>
            <Ingreds />
          </ScrollView>
          <Button
            full
            style={{position: 'absolute', top: 0, right: 0}}
            onPress={() => this.updateIngredients()}>
            <Icon name="plus" type="FontAwesome" />
          </Button>
        </Item>
        <Options />
        <Button
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => {
            this.props.route.params.updateMenu(this.state);
            Alert.alert('완료', this.state.menuName + ' 메뉴를 추가했습니다');
            this.props.navigation.goBack();
            /* RunClient(
              '{' +
                '"Action" : "NewMenu",' +
                '"Name" : "아무메뉴",' +
                '"Category" : "아무카테고리",' +
                '"PriceHot" : "111111",' +
                '"PriceCold" : "2222222",' +
                '"Image" : "테스트",' +
                '"Ingredients" : {"재료1" : "Base64","재료2" : "Base64"},' +
                '"Options" : {"Option1" : "?","Option2" : "?"}' +
                '}',
            ); */
          }}>
          <Icon name="send" />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>추가</Text>
        </Button>
      </Content>
    );
  }
}

const MenuStyle = StyleSheet.create({
  item: {
    margin: 5,
  },
  item_image: {
    margin: 10,
    flexDirection: 'row',
  },
  item_button: {
    marginBottom: 10,
    marginTop: 10,
  },
  test: {width: 80, height: 80, backgroundColor: 'red', margin: 10},
});
