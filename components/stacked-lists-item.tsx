interface StackedListsItemProps {
    date: string;
    label: string;
    isToday: boolean;
}

export const StackedListsItem: React.FC<StackedListsItemProps> = ({ date, label, isToday }) => {
    return (
        <li key={date} className={`flex gap-x-4 px-3 py-5 ${isToday ? 'bg-emerald-500' : ''}`}>
            <div className={`flex items-center justify-between w-full ${isToday ? 'text-md' : 'text-sm'} ${isToday ? 'text-emerald-900' : 'text-slate-900'}`}>
                <span>{date}</span>
                <span>{label}</span>
            </div>
        </li>
    );
}
