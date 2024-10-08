import { useAppSelector } from '@/store';
import { companyState } from '@/store/company.slice';


interface ICompanyState {
  company: companyState;
}

const useCompanyState = (): ICompanyState => {
  const company = useAppSelector((state: { company: any; }) => state.company) as any;

  return { company };
};

export default useCompanyState;
