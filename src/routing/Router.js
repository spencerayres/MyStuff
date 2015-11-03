import React, {Component, Navigator, StyleSheet, PixelRatio, Text, TouchableOpacity} from 'react-native';

const NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'blue',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'blue',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

class Router extends Component {

  navigateTo(path) {
    const navigator = this.refs.navigator;
    const route = this.props.routes.getRouteByPath(name);
    const routeList = navigator.getCurrentRoutes();

    if (routeList.indexOf(route) > -1) {
      route.direction = BACK;
      navigator.popToRoute(route);
    } else {
      route.direction = FORWARD;
      navigator.push(route);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentRoute !== nextProps.currentRoute) {
      // change the current page to navigate
      this.navigateTo(nextProps.currentRoute);
    }
  }

  render() {
    const {routes} = this.props;

    return (
      <Navigator
        ref='navigator'
        initialRoute={routes.getInitialRoute()}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromRight}
        renderScene={(route, navigator) => {
          const Component = route.component();
          return <Component route={route} navigator={navigator}  />;
        }
        }
        navigationBar={
          <Navigator.NavigationBar
          style={styles.navBar}
            routeMapper={NavigationBarRouteMapper}
          />
        }
        {...this.props}

        />
    );
  }
}

export default Router;
