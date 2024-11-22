import Link from 'next/link';

// Tabs.tsx
import { FC } from 'react';
import TabComponent from './component/Tab';
import { StaticImageData } from 'next/image';

// ** Third Party Components
import { ClassNameValue } from 'tailwind-merge';

interface TabsProps {
  tabs: { icon?: StaticImageData; label: string }[];
  activeTab: number;
  onTabChange: (index: number) => void;
  className?: ClassNameValue;
  isSeeAll?: boolean;
}

const Tabs: FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  isSeeAll,
}) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="sm:text-[1.1vw] text-[3.5vw] font-medium text-n900 flex sm:items-start items-center  mt-5 overflow-y-auto">
        {tabs.map((tab, index) => (
          <TabComponent
            key={index}
            active={activeTab === index}
            onClick={() => onTabChange(index)}
            icon={tab.icon}
            label={tab.label}
            className={className}
          />
        ))}
      </div>
      {isSeeAll && (
        <Link href={'/dashboard/loans/all'} className="body-three text-p800 ">
          See all
        </Link>
      )}
    </div>
  );
};

export default Tabs;
