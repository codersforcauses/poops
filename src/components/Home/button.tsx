// import React from 'react'
// import { useState } from 'react'
// import Image from 'next/image'

// import Modal from '@/components/Home/modal'

// interface Checkers {
//   open: boolean
//   distance: number
//   visit: string
//   pet: string
// }

// function Button(props: Checkers) {
//   const [modalIsOpen, setModalOpen] = useState(false)
//   const [used, setUsed] = useState(false)
//   const [start, setStart] = useState(0)
//   const [stop, setStop] = useState(0)
//   let visit = false
//   if (props.visit == 'walk') {
//     visit = true
//   }
//   return (
//     <div>
//       <div className='text-center'>
//         {!modalIsOpen && (
//           <button
//             className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
//             onClick={() => {
//               setModalOpen(true), setUsed(true), setStart(Date.now())
//             }}
//           >
//             START VISIT
//           </button>
//         )}
//         {modalIsOpen && (
//           <button
//             className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
//             onClick={() => {
//               setModalOpen(false), setStop(Date.now())
//             }}
//           >
//             STOP VISIT
//           </button>
//         )}
//       </div>
//       <br />
//       <div>{modalIsOpen && <Modal start={start} stop={stop} />}</div>
//       <div>
//         {!modalIsOpen && (
//           <Image
//             alt='logo'
//             src='/images/dog.png'
//             width='350px'
//             height='250px'
//           />
//         )}
//       </div>
//       {/* <div>{used && !modalIsOpen && <Modal stop={stop} start={start} />}</div> */}
//     </div>
//   )
// }

// export default Button
