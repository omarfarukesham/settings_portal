import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/ui/Button';
import { DEFAULT_REDIRECTION_PATH } from '@/configuration/config';
import { LOGO_LIGHT } from '@/configuration/resources';
import { useAuthContext } from '@/context/authContext';
import { useLogin } from '@/services/auth/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthContext();

  const setContextUser = (user) => {
    setUser(user);
  };

  const onLoginSuccess = () => {
    toast.success('Login successful');
    navigate(location.state?.from || DEFAULT_REDIRECTION_PATH, {
      replace: true,
    });
  };
  const onLoginFailure = (error) => {
    toast.error(error.message);
  };

  const { isLoading, mutate: login } = useLogin(setContextUser);
  const handleLogin = (user) => {
    login(user, {
      onSuccess: onLoginSuccess,
      onError: onLoginFailure,
    });
  };

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='rounded-2xl overflow-hidden md:h-[500px] lg:w-1/2 flex flex-col md:flex-row border border-white'>
        <div className='bg-primary md:flex-1 flex flex-col md:justify-center gap-5 p-10 bg-[url(@/assets/images/img_login_left.jpg)] bg-contain'>
          <img src={LOGO_LIGHT} alt='logo' className='w-40' />
          <div className='text-white text-xl md:text-4xl'>
            <div>Welcome Back</div>
            <div className='hidden md:block'>Please Login</div>
          </div>
        </div>
        <div className='bg-white md:w-1/2 flex justify-center items-center'>
          <div className='w-full flex flex-col gap-3 p-10'>
            <h4 className='font-bold '>Login</h4>
            <Form onSubmit={handleLogin} className='flex flex-col gap-3'>
              <FormInput
                name='username'
                label='Username'
                placeholder='name@domain.com'
                validations={{ required: 'Please enter a valid username' }}
              />
              <FormInput
                name='password'
                label='Password'
                placeholder='******'
                type='password'
                validations={{ required: 'Please enter a valid password' }}
              />
              <Button
                type='submit'
                className='w-2/3 mx-auto mt-5'
                loading={isLoading}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
