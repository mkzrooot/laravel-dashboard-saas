import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const menuItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        ...(user?.role === 'admin' ? [{ name: 'Users', href: route('users.index'), icon: Users }] : []),
        { name: 'Settings', href: '#', icon: Settings },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 dark:bg-black text-white flex flex-col transition-colors duration-200">
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b border-gray-800">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-800">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="fixed top-0 left-64 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6 z-10 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-3">
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{user?.name}</span>
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-600">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 pt-16 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
