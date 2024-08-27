import { DecodedToken } from "@/interfaces/OIDC";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import LoginButton from "../components/OCLoginButton";

export default function OverviewTab() {
  const { authState } = useOCAuth();
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in with OCID
    if (authState.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    }
  }, [authState.idToken]);

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
      <OverviewCard title='KYC'>
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
      </OverviewCard>

      <OverviewCard title='Tier'>
        <div className='flex flex-col justify-center text-white items-center h-44'>
          <p className='text-center text-base'>
            Once you start having activity, your tier level will be shown here.
          </p>
        </div>
      </OverviewCard>

      <OverviewCard title='Points'>
        <div className='flex flex-col justify-center text-white items-center h-44'>
          <p className='font-bold text-4xl'>0</p>
        </div>
      </OverviewCard>
    </div>
  );
}

export function OverviewCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className='rounded-lg bg-base-200'>
      <div className='px-4 pt-4 text-2xl font-bold'>{title}</div>
      <div className='divider'></div>
      <div className='px-4 pb-4'>{children}</div>
    </div>
  );
}
