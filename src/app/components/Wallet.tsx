import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from './LoginButton';

interface DecodedToken {
  edu_username: string;
  [key: string]: any;
}


const Wallet = () => {
  const { authState } = useOCAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in with OCID
    if (authState.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    }
  }, [authState.idToken]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type='button'
                      className='btn px-4 py-2 border bg-black text-white rounded-xl shadow-sm'
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type='button'
                      className='btn px-4 py-2 border bg-black text-white border-gray-300 rounded-xl shadow-sm'
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    {!ocidUsername ? <LoginButton /> :
                      <div className="bg-black text-xl px-4 py-2 text-white rounded-xl border border-gray-300 pr-4">
                        {ocidUsername}
                      </div>
                    }
                    <div className='relative' ref={dropdownRef}>
                      <button
                        onClick={toggleDropdown}
                        type='button'
                        className='btn inline-flex items-center px-4 py-2 border bg-black text-white rounded-xl border-gray-300 shadow-sm text-xl font-medium hover:bg-black-50'
                        id='dropdown-menu-button'
                        aria-expanded={isOpen ? 'true' : 'false'}
                        aria-haspopup='true'
                      >
                        <div className='mr-4'>
                          {account.ensName || account.displayName}
                        </div>
                        {account.ensAvatar ? (
                          <Image
                            src={account.ensAvatar}
                            style={{ borderRadius: '50%' }}
                            width={30}
                            height={30}
                            alt='Podcaster Avatar'
                          />
                        ) : (
                          <img
                            src={`https://robohash.org/${account.address}&200x200`}
                            className='border-2 bg-indigo-300 h-[30px] w-[30px] rounded-full'
                          />
                        )}
                      </button>
                      {isOpen && (
                        <div
                          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='dropdown-menu-button'
                          tabIndex={'-1' as any}
                        >
                          <Link
                            href={`/profile`}
                            className='flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          >
                            <p className='ml-4'>Profile</p>
                          </Link>
                          <div
                            className='flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            onClick={openAccountModal}
                          >
                            <p className='ml-4'>Disconnect</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default Wallet;