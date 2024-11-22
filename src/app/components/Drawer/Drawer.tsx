import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useAppTheme from '@/hooks/theme.hook';

interface DrawerProps {
  children: ReactNode;
  drawer: boolean;
  toggleDrawer: Dispatch<SetStateAction<boolean>>;
  anchor?: 'right' | 'left' | 'top' | 'bottom';
}

const Drawer: FC<DrawerProps> = ({
  children,
  drawer,
  toggleDrawer,
  anchor,
}) => {
  const isMobile = useAppTheme();

  return (
    <>
      <SwipeableDrawer
        anchor={anchor}
        open={drawer}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        PaperProps={{
          sx: {
            // width: { sm: "50%", md: "50%", lg: "100%" },
            width: `${isMobile ? '450px' : '30%'}`,
            overflowY: 'hidden',
            padding: '24px',
          },
        }}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
