import { ReactNode } from "react";

export interface LoginButtonInterface {
  handler: () => void;
  icon: ReactNode;
  buttonlabel: string;
  style: string;
}


const LoginButton = (props: LoginButtonInterface) => {
  return (
    <button
      className={props.style}
      onClick={props.handler}>
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