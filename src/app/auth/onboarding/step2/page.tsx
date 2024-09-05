import PlanCard from '@/app/components/Cards/PlanCard';
import Stepper from '@/app/components/Steppper/Stepper';
import React from 'react'

export default function Step2() {
    const plan = [
        {
            header: 'Free',
            title: 'Get started with a 7-day free trial, and upgrade anytime.',
            features: ['Employees', 'Payroll', 'Self-service', 'Payments']
        },
        {
            header: 'Standard',
            title: 'Enhanced core HR features for small and growing teams.',
            features: ['Everything in Free plus', 'Leave management', 'Benefits', 'Time-tracking', 'Performance']
        },
        {
            header: 'Enterprise',
            title: 'Comprehensive HR solutions with advanced management tools for larger organizations.',
            features: ['Everything in Standard plus', 'Disciplinary', 'Recruitment', 'Organization management', 'Pentahr AI (AISA)']
        },
        {
            header: 'Custom',
            title: 'Get a fully customized HR solution tailored to your specific needs.',
            features: ['Everything in Enterprise plus', 'Leave management', 'Payments', 'Disciplinary', 'Pentahr AI (AISA)']
        },
    ];

    return (
        <div className="px-[50px] py-[150px] relative">
            <img src='/pentaHR-logo-dark.svg' width={150} className='absolute top-10 left-[50px]' />

            <div className="flex items-center mx-auto w-[750px]">
                <Stepper />
            </div>

            <div className="mb-7 mt-12 text-center">
                <h1 className='text-[#0f1625] text-[32px] font-bold'>Choose the right plan for your team</h1>
                <p className='text-[#0f1625] font-normal text-base'>Select a plan that fits your team&apos;s needs. Enjoy customization and powerful features to manage your HR processes.</p>
            </div>
            <div className='grid sm:grid-cols-4 gap-5'>
                {plan?.map((plan, i) => (
                    <PlanCard
                        key={i}
                        header={plan.header}
                        title={plan.title}
                        features={plan.features}
                    />
                ))}
            </div>
        </div>
    )
}
