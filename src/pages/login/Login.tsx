import Swal from 'sweetalert2';
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn'

// Helper
import { loginApi } from '../../helper/api/login';
import { numericWithoutText } from '../../helper/utils/validateValue';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Loading from '../../components/Loading';

export default function Login() {

    const signIn = useSignIn();
    const [tel, setTel] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            const result: string = await loginApi({ user_tel: tel, user_password: password });
            if (result) {
                signIn({
                    auth: {
                        token: result,
                        type: 'Bearer',
                    },
                });
                Swal.fire({
                    title: 'ยินดีต้อนรับเข้าสู่ระบบ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => (window.location as Location).href = '/');
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <form className='flex justify-center items-center h-[95vh]'>
                <CardPrimary className='grid grid-cols-1 gap-y-8 dark:text-smoothWhite max-w-[600px]'>
                    <div className='grid grid-cols-1 gap-y-2'>
                        <div className='text-orange text-center font-bold text-[40px] max-[600px]:text-[25px]'>K.T. Yanyont Login</div>
                        <div className='grid grid-cols-1 gap-y-0.5'>
                            <label>เบอร์โทรศัพท์</label>
                            <input
                                className='border rounded-md px-2 py-1'
                                type='text'
                                value={tel}
                                placeholder='09xyyyzzzz'
                                maxLength={10}
                                onChange={event => setTel(numericWithoutText(event.target.value))}
                            />
                        </div>

                        <div className='grid grid-cols-1 gap-y-0.5'>
                            <label>รหัสผ่าน</label>
                            <input
                                className='border rounded-md px-2 py-1'
                                type='password'
                                value={password}
                                placeholder=''
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => handleSignIn()}
                        className='clickable text-center bg-orange rounded-lg py-1 cursor-pointer text-white'
                    >
                        Login
                    </div>
                </CardPrimary>
            </form>
        </>
    )
}

