import {facebook, linkedin, instagram, zenkleus} from '../assets/index'

const Starter = () => {
  return (
    <section>
        <div className='flex border h-[59px] w-full items-center justify-end pr-10'>
            <div className='flex space-x-4'>
                <img src={facebook} alt="facebook"/>
                <img src={linkedin} alt="linkedin"/>
                <img src={instagram} alt="instagram"/>
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
                <img src={zenkleus} alt='zenkleus' className='w-[180px] h-[106px]'/>
            </div>
            <div className='w-[768px] justify-between flex p-10'>
                <p>Home</p>
                <p>Who are we</p>
                <p>What we offer</p>
            </div>
        </div>
        <div className='bg-home_hero bg-cover bg-no-repeat bg-center mb-10 w-full h-[710px] pl-[138px] pr-[139px] opacity-80 justify-center items-center flex'>
            <div className='flex flex-col items-center'>
                <p className='text-white text-8xl font-bold font-mono'>The Support System</p>
                <p className='text-[32px] font-medium text-center w-4/5'>The support system is a platform designed and developed to 
        help provide support systems for clients and patterns.</p>
            </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center pl-9 mb-20'>
            <h2 className='justify-center items-center text-xl font-mono text-[#3F985E] mb-4 leading-6'>Select your portal</h2>
            <button className='button font-mono w-96 h-20 bg-white border-2 border-[#1C51C3] leading-6 rounded-[15px] mb-4'>STAFF</button>
            <button className='button font-mono border-2 bg-white w-96 h-20 border-[#1C51C3] leading-6 rounded-[15px] mb-4'>PARTNER</button>
            <button className='button font-mono border-2 bg-white w-96 h-20 border-[#1C51C3] leading-6 rounded-[15px]'>CLIENT</button>
        </div>
    </section>
  )
}

export default Starter