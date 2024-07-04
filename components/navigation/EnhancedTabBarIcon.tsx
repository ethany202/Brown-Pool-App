// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function EnhancedTabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
    return <MaterialIcons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
