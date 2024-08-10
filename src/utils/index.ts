/* eslint-disable react-hooks/rules-of-hooks */

import { usePathname } from "next/navigation";

export const getSubPathName = () => {
  const pathname = usePathname();
};