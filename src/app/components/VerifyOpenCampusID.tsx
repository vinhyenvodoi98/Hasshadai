'use client'
import { DecodedToken } from "@/interfaces/OIDC";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import LoginButton from "./OCLoginButton";

export const VerifyOpenCampusID = () =>{
  const { authState } = useOCAuth();
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in with OCID
    if (authState.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    }
  }, [authState.idToken]);

  return(
    <div>
      {!ocidUsername ?
        <div className='flex flex-col justify-between text-white items-center gap-4'>
          <p className='font-bold text-lg'>Get Verified!</p>
          <p className='text-center text-base'>
            In order to participate in the launchPad, you need to be use Open Campus ID
          </p>
          <LoginButton />
        </div> :
        <div className='flex flex-col justify-between text-white items-center gap-4'>
          <p className='font-bold text-lg'>Verified!</p>
          <p className='text-center text-base'>
            Wellcome to Hasshadai !
          </p>
          <div className="bg-black text-xl px-4 py-2 text-white rounded-xl border border-gray-300 pr-4">
            {ocidUsername}
          </div>
        </div>
        }
    </div>
  )
}