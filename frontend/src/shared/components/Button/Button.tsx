type ButtonProps = {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
};

export const Button = ({
  label,
  primary = false,
  size = 'medium',
  onClick,
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: primary ? 'blue' : 'gray',
        fontSize:
          size === 'large' ? '20px' : size === 'small' ? '12px' : '16px',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 4,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
