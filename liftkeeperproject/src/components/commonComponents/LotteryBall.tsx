import { Avatar } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

interface NumberAvatarProps {
    number: number | null;
    isSelected?: boolean;
}

const LotteryBall = ({ number, isSelected }: NumberAvatarProps) => {
    const bgColor = isSelected ? blue[500] : grey[500];
    const transformValue = isSelected ? 'rotate(360deg)' : 'rotate(0deg)';

    return (
        <Avatar
            key={number}
            sx={{
                width: '40px',
                height: '40px',
                backgroundColor: bgColor,
                color: 'white',
                fontSize: '1rem',
                transition: 'transform 0.5s, background-color 0.5s', // 0.5s duration for the rotation and color change
                transform: transformValue,
            }}
        >
            {number !== null ? number : ""}
        </Avatar>
    );
};

export default LotteryBall;