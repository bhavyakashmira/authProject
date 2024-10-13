import React from 'react'
import Image from 'next/image';

type Books = {
  _id: string;
  slug: string;
  title: string;
};

function BookCard({dat}) {
  return (
    <div className='p-4 '  >
      <Image className=' shadow-xl'  src="https://d1b14unh5d6w7g.cloudfront.net/0007448031.01.S001.JUMBOXXX.jpg?Expires=1728810813&Signature=NHIvs4vYlU09E14tqShMBrNTjl435LAqmmmGJKTR~rnOxmeyUP2gpG6wdMcc48whcCfqFNEWAROwKWyK6s7jp6uvZDG~2l61uhI6X0culw~ZuH0VPuewu1X2WtfMnnWz7N1Z2RPAkO5STLEk30SwR-qmxHfJiRqLt0hxaBfzNcE_&Key-Pair-Id=APKAIUO27P366FGALUMQ" width={300} height={500} alt="" />

      <h1 className='font-bold text-xl m-2 ' >{dat.title}</h1>
    </div>
  )
}

export default BookCard
