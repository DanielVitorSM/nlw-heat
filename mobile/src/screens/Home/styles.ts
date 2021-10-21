import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BLACK_SECONDARY,
        paddingTop: Constants.statusBarHeight + 17
    }
})