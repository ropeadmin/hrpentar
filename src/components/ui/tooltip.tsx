import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#0F1625",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#0F1625",
    color: "white"
  },

}));

export default BootstrapTooltip