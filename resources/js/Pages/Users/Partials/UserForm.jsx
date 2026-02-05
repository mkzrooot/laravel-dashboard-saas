import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function UserForm({ show, onClose, user = null }) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        role: 'user',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name,
                email: user.email,
                role: user.role || 'user',
                password: '',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [user, show]);

    const submit = (e) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            onClose();
        };

        if (user) {
            put(route('users.update', user.id), { onSuccess });
        } else {
            post(route('users.store'), { onSuccess });
        }
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <form onSubmit={submit} className="p-6 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 dark:text-gray-100">
                    {user ? 'Edit User' : 'Create New User'}
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Role */}
                <div className="mb-4">
                    <InputLabel htmlFor="role" value="Role" className="dark:text-gray-300" />
                    <select
                        id="role"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <InputLabel htmlFor="password" value={user ? "Password (leave blank to keep current)" : "Password"} />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required={!user}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <SecondaryButton type="button" onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Saving...' : (user ? 'Update User' : 'Create User')}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
