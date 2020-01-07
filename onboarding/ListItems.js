import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image ,View, TouchableOpacity } from 'react-native'

const ListItem = ({ views, item }) => (
   
    <View style={{
            flex: 1,
            flexDirection:'column',
            backgroundColor:'#e9e9e9',
            borderRadius:10
        }}>
        <TouchableOpacity onPress={views}>
            <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <Image
                        style={{width: 60, height: 60, tintColor:'#000'}}
                        source={require('@resources/User.png')} 
                    />
                    <View style={{
                            flex: 1,
                            flexDirection:'column',
                            height: 70,
                        }}>
                            <Text  style={{width:"70%",color :'#000' }}>
                                User Name : {item.name}
                            </Text>
                            <Text  style={{ width:"70%",color :'#000' }}>
                                Email Id      : {item.email}
                            </Text>
                            <Text  style={{ width:"70%",color :'#000' }}>
                                Phone N0   : {item.phoneNo}
                            </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={{height:3,backgroundColor: '#000'}}/>
            </View>
);

ListItem.propTypes = {
    views: PropTypes.func.isRequired,
};

export default ListItem;
