import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import Shimmer from 'react-native-shimmer';
import { stringConstants } from '../constants/sdomConstants';
import { getCategoryButtonType } from '../helper/SDOMHelper';
import { flatListItemStyles, glancePostStyles } from '../styles/sdomStyles';
import { TourGuideZone } from 'rn-tourguide';
import FastImage from 'react-native-fast-image';

export const sdomCategoryRenderer = (item, index, category, setCategory) => {
    const { categoryCover } = item;
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={async () => {
                category.categories[index].isSelected = !category.categories[index].isSelected;
                const initialCategoryFromStorage = await getCategoryButtonType();
                const initialCategory = ((!initialCategoryFromStorage == stringConstants.EMPTY && initialCategoryFromStorage == 'saveButton')
                    || category.categories.some((item) => { return true == item.isSelected })) && 'saveButton' || 'skipButton';
                setCategory({ ...category, initialCategory: initialCategory });
            }}>
            {
                index == 0 && category.initialCategory == 'skipButton' &&
                <TourGuideZone zone={1} borderRadius={8} shape={`rectangle`}
                    style={glancePostStyles.tourGuideStyle} text={`Select a category`}>
                    <View style={flatListItemStyles.cardSurface}>
                        <FastImage source={{
                            uri: categoryCover,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable
                        }}
                            style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
                                flatListItemStyles.imageBackGround}>
                            <View style={flatListItemStyles.textsView}>
                                <Shimmer direction="right" duration={5000}>
                                    <Text style={flatListItemStyles.textCategoryTitle}>{item.categoryTitle}</Text>
                                </Shimmer>
                                <Shimmer direction="right" duration={5000}>
                                    <Text style={flatListItemStyles.textCategoryCity}>{item.categoryOrigin}</Text>
                                </Shimmer>
                            </View>
                        </FastImage>
                    </View>
                </TourGuideZone> || <View style={flatListItemStyles.cardSurface}>
                    <FastImage source={{
                        uri: categoryCover,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                    }}
                        style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
                            flatListItemStyles.imageBackGround}>
                        <View style={flatListItemStyles.textsView}>
                            <Shimmer direction="right" duration={5000}>
                                <Text style={flatListItemStyles.textCategoryTitle}>{item.categoryTitle}</Text>
                            </Shimmer>
                            <Shimmer direction="right" duration={5000}>
                                <Text style={flatListItemStyles.textCategoryCity}>{item.categoryOrigin}</Text>
                            </Shimmer>
                        </View>
                    </FastImage>
                </View>
            }
        </TouchableOpacity>
    )
}