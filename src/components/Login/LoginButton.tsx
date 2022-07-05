export interface LoginButtonInterface {
  handlerFunction: () => void;
  icon: string;
  buttonlabel: string;
}


const LoginButton = (props: LoginButtonInterface) => {
  return (
    <button
      className='border-gray-300 h-12 rounded-full border-2 px-6 transition duration-300 '
      onClick={() => { props.handlerFunction }}
    >
      <div className='relative flex items-center space-x-4'>
        <div className='w-5'>{props.icon}</div>
        <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
          {props.buttonlabel}
        </span>
      </div>
    </button>
  );
}

export default LoginButton;