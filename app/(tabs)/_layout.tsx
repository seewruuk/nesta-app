import { icons } from '@/src/constants/icons';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

const _Layout = () => (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarItemStyle: styles.tabBarItem,
        }}
    >
        {[
            { name: 'index', icon: icons.home },
            { name: 'offers', icon: icons.search },
            { name: 'posts', icon: icons.save },
            { name: 'dashboard', icon: icons.person },
            { name: 'chat', icon: icons.person },
        ].map(({ name, icon }) => (
            <Tabs.Screen
                key={name}
                name={name}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icon} />
                    ),
                }}
            />
        ))}
    </Tabs>
);

export default _Layout;

const TabIcon = ({
                     focused,
                     icon,
                 }: {
    focused: boolean;
    icon: any;
}) => (
    <View
        style={[
            styles.iconWrapper,
            focused && styles.iconWrapperFocused,
        ]}
    >
        <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
        />
    </View>
);

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 60,
        marginHorizontal: 40,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
    },
    iconWrapper: {
        width: 62,
        height: 62,
        borderRadius: 50,
        backgroundColor: '#0B0E0E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapperFocused: {
        backgroundColor: '#C3F22A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: '#C3F22A',
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: '#FFF',
    },
});
