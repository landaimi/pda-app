import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanEvent from '../Scanner';

export default class Main extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    ScanEvent.on('scanned', this.onScanned);
  }

  componentWillUnmount() {
    ScanEvent.off('scanned', this.onScanned);
  }

  onScanned = data => {
    this.setState({ data });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Main, data: {JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
