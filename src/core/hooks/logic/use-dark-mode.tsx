import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useColorScheme as useRNColorScheme } from 'react-native';


export const useDarkMode = () => {
    const systemColorScheme = useRNColorScheme();
    const { colorScheme: nativeWindScheme, setColorScheme } = useNativeWindColorScheme();
    const resolvedColorScheme = nativeWindScheme || systemColorScheme || 'light';
    const isDark = resolvedColorScheme === 'dark';

    return {
        isDark,
        setColorScheme
    }
}