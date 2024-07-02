import { TextInput, type TextInputProps } from 'react-native';
import React, { useState } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
}

export function ThemedInput({
    style,
    lightColor,
    darkColor,
    ...rest
}: ThemedTextInputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput
            style={[
                { color },
            ]}
            {...rest}
        />

    );

}