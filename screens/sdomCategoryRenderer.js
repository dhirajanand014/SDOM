import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { ceil } from 'react-native-reanimated';


export const sdomCategoryRenderer = (props) => {
    const { item, index } = props;
    return (
        <View>
            <TouchableOpacity
                style={{
                    height: 200,
                    alignItems: 'center',
                    width: 200,
                    position: 'relative',
                    borderWidth: 1,
                    borderColor: 'blue',
                }}>
                <ImageBackground
                    source={{ uri: 'https://placehold.it/200x200' }}
                    style={{
                        height: 200,
                        width: 200,
                        opacity: 0.6,
                        position: 'absolute',
                    }}
                />
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Hello World!</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const addCategoryRenderer = () => {
    return (
        <View>
            <Text>asdsd</Text>
        </View>
    )
}