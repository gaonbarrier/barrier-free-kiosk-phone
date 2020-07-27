import React, {Component} from 'react';
import {Right, Text, ListItem, Button, Body} from 'native-base';
import {List, Menu} from 'react-native-paper';

const MenuList = (props) => (
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

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="메뉴">
      <List.Accordion
        title="커피"
        left={(props) => <List.Icon {...props} icon="equal-box" />}
        expanded={expanded}
        onPress={handlePress}>
        <MenuList menuName="아메리카노" />
      </List.Accordion>
      <List.Accordion
        title="디저트"
        left={(props) => <List.Icon {...props} icon="equal-box" />}
        expanded={expanded}
        onPress={handlePress}>
        <MenuList menuName="아메리카노" />
        <MenuList menuName="아메리카노" />
      </List.Accordion>
    </List.Section>
  );
};

export default MyComponent;
