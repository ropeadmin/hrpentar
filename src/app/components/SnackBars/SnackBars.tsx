"use client"
import useAppTheme from '@/hooks/theme.hook';
import { Fade, SlideProps } from '@mui/material';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import RopeSnackBar from './RopeSnackBar';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Fade {...props} />;
}

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `warning` variant
    //   warning: false;
    // adds `myCustomVariant` variant
    //   myCustomVariant: true;
    // adds `reportComplete` variant and specifies the
    // "extra" props it takes in options of `enqueueSnackbar`
    appsuccess: true;
    default: {
      error?: boolean;
      info?: boolean;
    };
    rope_snackbar: {
      error?: boolean;
      info?: boolean;
    };
  }
}

const AppSnackBarProvider = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useAppTheme();

  const mobileAnchorOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'center',
  };

  const desktopAnchorOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
  };

  const anchorOrigin = isMobile ? mobileAnchorOrigin : desktopAnchorOrigin;

  return (
    <SnackbarProvider
      anchorOrigin={anchorOrigin}
      TransitionComponent={TransitionLeft}
      preventDuplicate={true}
      autoHideDuration={2500}
      Components={{
        default: RopeSnackBar,
        rope_snackbar: RopeSnackBar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackBarProvider;
