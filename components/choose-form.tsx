"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

interface Street {
    name: string;
    id: number;
}

interface ChooseFormProps {
    streets: Street[];
}

export default function ChooseForm({ streets }: ChooseFormProps) {
    const [street, setStreet] = useState("");
    const [type, setType] = useState("");
    const router = useRouter();

    useEffect(() => {
        setStreet(localStorage.getItem('lastSelectedStreet') || "");
        setType(localStorage.getItem('lastSelectedType') || "");
    }, []);

    const getUrl = (type: string, street: string) => {
        return `/${type}?street=${street}&type=${type}`;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (['selective', 'mixed'].includes(type)) {
            router.push(getUrl(type, street));
        }
    };

    useEffect(() => {
        const updateLocalStorage = () => {
            localStorage.setItem('lastSelectedStreet', street);
            localStorage.setItem('lastSelectedType', type);
        }

        updateLocalStorage();
    }, [type, street]);

    return (
        <form onSubmit={handleSubmit} method="GET" className="mt-10 flex flex-col items-center justify-center gap-x-6 lg:flex-row space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-1/2">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-slate-900 lg:mr-4">
                    Rodzaj
                </label>
                <select
                    className="mt-2 lg:mt-0 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    name="type"
                    id="type"
                >
                    <option>Wszystkie</option>
                    <option value={'selective'}>Selektywne</option>
                    <option value={'mixed'}>Zmieszane</option>
                </select>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-1/2">
                <label htmlFor="street" className="block text-sm font-medium leading-6 text-slate-900 lg:mr-4">
                    Ulica
                </label>
                <select
                    className="mt-2 lg:mt-0 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10"
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    name="street"
                    id="street"
                >
                    <option>Wszystkie</option>
                    {streets.length > 0 ? streets.map((street: any) => (
                        <option key={street.id} value={street.id}>{street.name}</option>
                    )) : <option>Brak ulic</option>}
                </select>
            </div>

            <div className="flex flex-col w-auto">
                <button
                    className="rounded-md bg-slate-900 px-3 py-2 max-h-fit text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 w-64 h-fit"
                    disabled={streets.length > 0 ? false : true}
                    type="submit"
                >
                    Szukaj
                </button>
            </div>
        </form>
    )
}
