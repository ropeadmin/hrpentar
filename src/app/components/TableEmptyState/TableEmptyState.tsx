import useGlobalState from '@/hooks/globalstate.hook';
import { useRouter } from 'next/navigation';
import React from 'react'

interface StateProps {
    route: string;
    title: string;
    buttonTitle: string;
    hasButton: boolean;
    actionButton?: boolean;
    action?: any;
}

export default function TableEmptyState({ route, title, buttonTitle, hasButton, actionButton, action }: StateProps) {
    const router = useRouter();
    const { profile } = useGlobalState();
    const hasStore = profile?.user?.merchStore?.id

    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full h-auto">
            <div className="flex flex-col justify-center items-center">
                <img src='/svg/empty.svg' alt="Empty State" />
                <p className="text-center text-odi font-medium text-[17px] mt-5 w-[500px]">
                    {hasStore
                        ? title
                        : title
                    }
                </p>
            </div>
            {hasButton && (
                <div>
                    <button
                        onClick={actionButton ? action: () => router.push(hasStore ? route : '/create-store')}
                        className="bg-odi text-white transition-all duration-500 font-normal rounded-[10px] px-7 py-4"
                    >
                        <span className="text-sm">
                            {hasStore
                                ? buttonTitle
                                : buttonTitle
                            }
                        </span>
                    </button>
                </div>
            )}
        </div>
    )
}
