import React from 'react'
import { useRouter  } from 'next/navigation';
import { useSession } from 'next-auth/react';
function page() {

    const router = useRouter();

    const {status } = useSession();
    if (status === "loading") {
        return <div  >loading...</div>
    }
    if (status === 'authenticated') {
        router.push("/")

    }
  return (
      <div>
          yo this is writing page , but you are logged out rn
      
    </div>
  )
}

export default page
