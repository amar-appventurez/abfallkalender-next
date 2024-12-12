import React from 'react'
import { default as BgImage } from 'next/image'

const loading = () => {
    return (
        <div className='flex flex-col gap-4 bg-[#F8F8F8]'>
            <div className='h-[44px] w-[100%] flex flex-col justify-center'>
                <BgImage src="/ebwo-logo.svg"
                    width={70}
                    height={35}
                    style={{ marginLeft: "16px" }}
                    alt="picture of ebwo logo"></BgImage></div>
            <div className='flex flex-col ml-[16px]'>
                <span className='text-[#63636B] text-regular-normal-medium font-normal'>{`Selected street`}</span>
                <div className='flex items-center justify-between w-[90%]'>
                    <span className='text-[#1F1F25] text-title-main font-semiBold animate-pulse'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button className='rounded-lg' ><BgImage src="/Signature.svg" width={24} height={24} alt="image of a post envelope" style={{ minHeight: 24, minWidth: 24 }} /></button>
                </div>
            </div>
            <div className='bg-[#FFFFFF] rounded-t-[2.5rem]'>
                <div className="flex flex-col gap-6 mx-4 min-w-[90%] mt-4 mb-4">
                    {[1,2,3,4]?.map(({name}) => (
                        <div
                            className={`rounded-lg`}
                        >
                            <div className='flex justify-between mb-2'>
                                <span className="font-semiBold text-regular-normal-medium">{name}</span>
                                <div className='flex items-center'>
                                    <span className='text-[#F47921] text-semiBold text-title-tight'>{`Add`}</span>
                                    <BgImage src="/Frame.svg" width={20} height={20} alt="image of a post envelope" />
                                </div>
                            </div>
                            <div className="bg-[#F8F8F8] rounded-lg py-3 px-[14px]">
                                <div>
                                    <ul className="flex flex-col gap-2 px-[0.5rem] text-small-tight-regular font-bold-500">
                                        {[<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,<>&nbsp;&nbsp;&nbsp;&nbsp;</>,<>&nbsp;&nbsp;&nbsp;&nbsp;</>,<>&nbsp;&nbsp;&nbsp;&nbsp;</>]?.map((date, index) => (
                                            <div key={index}>
                                                <li className="p-2 text-[#63636B] rounded-lg animate-pulse">
                                                    {date}
                                                </li>
                                                {index < 2 && <hr className='text-[#E0E0E9]' />}
                                            </div>
                                        ))}
                                    </ul>


                                   
                                        <button
                                            className="text-blue-500 mt-2"
                                           
                                        >
                                            <span className='text-[#F47921] text-small-tight-regular font-bold-500'>Show More</span>
                                        </button>
                    


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default loading