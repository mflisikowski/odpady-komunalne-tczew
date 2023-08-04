"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SwitchData() {
    const [enabled, setEnabled] = useState(false);
    const params = useSearchParams();
    const router = useRouter();

    const street = params.get('street');
    const type = params.get('type');

    useEffect(() => {
        if (type === 'selective') {
            setEnabled(false);
        } else if (type === 'mixed') {
            setEnabled(true);
        }
    }, [type]);

    const switchType = (currentType: string) => currentType === 'mixed' ? 'selective' : 'mixed';

    const handleSwitch = () => {
        if (!street || !type) return;

        const newType = switchType(type);
        router.push(`/${newType}?type=${newType}&street=${street}`);
    };

    return (
        <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
                <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900 mr-4" passive>
                    selektywne
                </Switch.Label>
            </span>

            <Switch
                onChange={handleSwitch}
                className={classNames(
                    enabled ? 'bg-slate-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'
                )}
                checked={enabled}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>

            <span className="flex flex-grow flex-col">
                <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900 ml-4" passive>
                    zmieszane
                </Switch.Label>
            </span>
        </Switch.Group>
    )
}




