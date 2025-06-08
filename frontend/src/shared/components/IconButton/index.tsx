import { IconButton as ChakraIconButton } from '@chakra-ui/react';

type IconButtonProps = {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  handleClick?: () => void;
};

/**
 * アイコン表示
 * @param label アイコン名
 * @param icon 表示するアイコン
 * @param size アイコンサイズ
 * @param handleClick ボタン押下時イベント
 */
export const IconButton = ({
  label,
  icon,
  size = 'sm',
  handleClick,
}: IconButtonProps) => {
  return (
    <ChakraIconButton
      aria-label={label}
      variant="ghost"
      size={size}
      onClick={handleClick}
    >
      {icon}
    </ChakraIconButton>
  );
};
