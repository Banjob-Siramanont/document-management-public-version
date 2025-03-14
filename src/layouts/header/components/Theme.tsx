import { useEffect, useState } from 'react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

export default function Theme({ className }: { className?: string }) {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <div
            className={`rounded-full p-2 transition-colors duration-200 hover:bg-lightGrey dark:hover:bg-black text-orange ${className}`}
            onClick={toggleTheme}
        >
            {theme !== 'light' && (<MdOutlineWbSunny className='text-2xl' />)}
            {theme === 'light' && (<FaMoon className='text-2xl ' />)}
        </div>
    )
}
