import React from "react";
import Container from "../../components/Container";
import { connect } from 'react-redux';
import Button from "../../components/Button";
import { Spinner } from "native-base";
import { StyleSheet, View, Text, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionCreatorsData from '../../actions/data';
import * as actionCreatorsPic from '../../actions/pictures';
import * as actionCreatorsFolders from '../../actions/folders';
import Gallery from 'react-native-image-gallery';

import '../../assets/require.min';

import { FlatGrid } from 'react-native-super-grid';

import { withTranslation } from 'react-i18next';

function mapStateToProps(state) {
  return {
      data: state.data,
      files: state.pictures.files,
      pictures_loaded: state.pictures.pictures_loaded,
      folders: state.folders.folders,
      folders_loaded: state.folders.folders_loaded,
      token: state.auth.token,
      loaded: state.data.loaded,
  };
}


function mapDispatchToProps(dispatch) {
  return {
      actions: {
          picActions: bindActionCreators(actionCreatorsPic, dispatch),
          dataActions: bindActionCreators(actionCreatorsData, dispatch),
          folderActions: bindActionCreators(actionCreatorsFolders, dispatch)
      }
  };
}
class MainScreen extends React.Component {
  state = {
    searchInput: ""
  };

  componentDidMount() {
    this.fetchData();
    this.fetchPictures();
  }


  fetchData() {
      const token = this.props.token;
      this.props.actions.dataActions.fetchProtectedData(token);
  }
  
  fetchPictures(){
    this.props.actions.picActions.fetchPictures(this.props.token);
    this.props.actions.folderActions.fetchFolders(this.props.token);
  }

  render() {
    const { t } = this.props;
    
    return (
      <Container title={t("HEADER_MAIN")}>
        {!this.props.loaded
                    ? <Spinner color='blue' />
                    :
                    !this.props.pictures_loaded
                      ? 
                        <Spinner color='blue' />
                      :
                        <FlatGrid
                          itemDimension={130}
                          items={this.props.files}
                          style={styles.gridView}
                          // staticDimension={300}
                          fixed
                          spacing={0}
                          renderItem={({ item, index }) => {
                            console.log(item.path)
                            return (
                              <View style={[styles.itemContainer]}>
                                <Image
                                  style={{width: 130, height: 130}}
                                  source={{uri: '../../' + item.path}}
                                />
                              </View>
                            )
                          }
                            
                          }
                        />

                   
                }
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    height: 130,
  }
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(MainScreen))