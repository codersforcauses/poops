type Props = {
  buttonText: string
}

function DisabledButton(props: Props) {
  return (
    <button className='relative m-2 h-[30px] w-[120px] cursor-default rounded-lg bg-dark-gray text-lg font-semibold text-white'>
      {props.buttonText}
    </button>
  )
}

export default DisabledButton
