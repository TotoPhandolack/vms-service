'use client'

import { LoginInput, LoginSchema } from '@/global/validators/login.schema';
import { useEffect,useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { authenStore } from '@/app/store/user/loginAuthStore';
import { useUsersStore } from '@/app/store/user/userStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ILoginFormProps {
}

export default function LoginForm (props: ILoginFormProps) {

  const [isLoading, setIsLoading] = useState(false)
  const { setAuthData } = authenStore();
  const { loginUser } = useUsersStore();
  const router = useRouter()

  const defaultRowItem = {
    username: '',
    password: '',
  }

    const { control, watch, setValue, register, handleSubmit, formState: { errors }, reset,

    } = useForm<LoginInput>(
        {
            resolver: zodResolver(LoginSchema),
            defaultValues: defaultRowItem,
        }
    );
    useEffect(() => {
        console.log("errors", errors)
    }, [errors])

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        const require = {
  "username": data.username,
  "password": data.password
}

      try {
        setIsLoading(true);
        const resp: any = await loginUser(require);
        if(resp.status === 201 || resp.status === 200) {
          toast.success('ຍິນດີຕ້ອນຮັບ')
          localStorage.setItem('token', resp?.data?.accessToken);

          // Save login timeStamp
          localStorage.setItem('lastLoginTime', Date.now().toString())

          setAuthData(resp?.data)

          setTimeout(() => {
            router.push('/')
            setIsLoading(false)
          },1000)
        }


        
      } catch (error) {
        setIsLoading(false)
        
      }

    }

  return (
    <form id='LoginForm' onSubmit={handleSubmit(onSubmit)}>
        {errors?.username?.message ? <span style={{color: 'red'}}>{errors?.username?.message}</span> : ''}
      <InputText
                {...register('username')}
                id="username"
                type="text"
                placeholder="Enter your ID"
                className={classNames('w-full mb-5', { 'p-invalid': errors.username })}
                style={{ padding: '1rem', borderRadius: '10px', height: "2.5rem" }}
            />
        {errors?.password?.message ? <span style={{color: 'red'}}>{errors?.password?.message}</span> : ''}
            <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Password
                        value={value}
                        onChange={onChange}
                        placeholder="Password"
                        toggleMask
                        className={classNames('w-full mb-5', { 'p-invalid': errors.password })}
                        inputStyle={{ borderRadius: '10px', height: "2.5rem" }}
                        inputClassName="w-full p-3"
                    />
                )}
            />
            <Button
            loading={isLoading}
            label='ເຂົ້າສູ່ລະບົບ'
            form='LoginForm' 
            type='submit'
            // className='w-full p-3 text-sm sm:text-xl'
            // style={{borderRadius:'10px', fontWeight:'none', height: '3rem'}}

            />
      
    </form>
  );
}
