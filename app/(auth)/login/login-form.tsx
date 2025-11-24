'use client'

import { LoginInput, LoginSchema } from '@/global/validators/login.schema';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { authenStore } from '@/app/store/user/loginAuthStore';
import { useUsersStore } from '@/app/store/user/userStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RiLockPasswordLine } from 'react-icons/ri';
import { LuSquareUser } from 'react-icons/lu';

interface ILoginFormProps {
}

export default function LoginForm(props: ILoginFormProps) {

  const [isLoading, setLoading] = useState(false)
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

    // console.log("data :", data)

    try {
      setLoading(true);
      const resp: any = await loginUser(require);
      if (resp.status === 201 || resp.status === 200) {
        toast.success('ຍິນດີຕ້ອນຮັບ')
        localStorage.setItem('token', resp?.data?.accessToken);

        // Save login timeStamp
        localStorage.setItem('lastLoginTime', Date.now().toString())

        setAuthData(resp?.data)

        setTimeout(() => {
          router.push('/')
          setLoading(false)
        }, 2000)
      }



    } catch (error) {
      setLoading(false)

    }

  }

  return (
    <form id='LoginForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex align-items-center mb-2'>
        <div className='flex align-items-center border-bottom-1 border-primary pb-1' style={{ width: 'fit-content' }}>
          <LuSquareUser size={20} className="mr-2 text-900" />
          <label htmlFor="email" className="text-900 text-lg sm:text-xl font-medium">
            ອີເມວ
          </label>
        </div>
      </div>

      <div className="mb-4 sm:mb-5">
        <InputText
          {...register('username')}
          id="username"
          type="text"
          placeholder="ກະລຸນາປ້ອນອີເມວຂອງທ່ານ"
          className="w-full"
          style={{ padding: '0.875rem 1rem' }}
        />
        {errors?.username?.message ? <span style={{ color: 'red' }}>{errors?.username?.message}</span> : ''}
      </div>


      <div className="mb-4 sm:mb5">
        <div className='flex align-items-center mb-2'>
          <div className='flex align-items-center border-bottom-1 border-primary pb-1' style={{ width: 'fit-content' }}>
            <RiLockPasswordLine size={20} className="mr-2 text-900" />
            <label htmlFor="password1" className="text-900 font-medium text-lg sm:text-xl">
              ລະຫັດຜ່ານ
            </label>
          </div>
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Password
              value={value}
              onChange={onChange}
              placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານຂອງທ່ານ"
              className="w-full"
              inputClassName="w-full"
              inputStyle={{ padding: '0.875rem 1rem' }}
              feedback={false}
              toggleMask
            />
          )}
        />
        {errors?.password?.message ? <span style={{ color: 'red' }}>{errors?.password?.message}</span> : ''}
      </div>



      <Button
        loading={isLoading}
        loadingIcon={
          <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} />
        }
        label={isLoading ? '' : 'ເຂົ້າສູ່ລະບົບ'}
        className="login-background w-full mt-4 text-lg sm:text-xl border-none flex justify-center items-center"
        style={{
          padding: '0.875rem 1rem',
          transition: 'all 0.3s ease-in-out'
        }}
      />
    </form>
  );
}