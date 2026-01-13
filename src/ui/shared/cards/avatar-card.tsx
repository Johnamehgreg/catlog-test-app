import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { semiBoldFontFamily } from '@core/styles/text-style';
import { StyleProp, ViewStyle } from 'react-native';

interface IAvatarCard {
  name: string;
  imageUrl?: string;
  showBadge?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  size?: 'xs' | 'sm' | 'smd' | 'md' | 'lg' | 'xl' | '2xl';
}

export const AvatarCard = ({
  name,
  imageUrl,
  showBadge,
  className,
  style,
  size,
}: IAvatarCard) => {
  return (
    <Avatar
      size={size}
      className={className}
      style={{
        ...style,
      }}
    >
      {imageUrl ? (
        <AvatarImage
          source={{
            uri: imageUrl,
          }}
        />
      ) : (
        <AvatarFallbackText
          style={{ fontFamily: semiBoldFontFamily }}
          className="text-white"
        >
          {name}
        </AvatarFallbackText>
      )}
      {showBadge && <AvatarBadge />}
    </Avatar>
  );
};
