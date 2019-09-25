import React, {Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
