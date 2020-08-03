import ImagePicker from 'react-native-image-picker';

const options = {
  title: '이미지 찾기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const getImage = (menuItem) =>
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      menuItem.setState({
        thumbSource: source,
      });
    }
  });
