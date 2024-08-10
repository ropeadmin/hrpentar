'use client';
import React, { useState } from 'react';
import { getSubPathName } from '@/utils';
import useGlobalState from '@/hooks/globalstate.hook';
import useAppTheme from '@/hooks/theme.hook';
import { MdClose } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { profileLogoutAction } from '@/store/profile.slice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconButton } from '@mui/material';

export default function DashboardNavbar() {
  const router = useRouter();
  const subpath = getSubPathName();
  const { profile, logout, isAuthenticated } = useGlobalState();
  const { isMobile } = useAppTheme();
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
      href: '/dashboard'
    },
    {
      id: 2,
      link: "View store",
      href: '/dashboard/store'
    },
    {
      id: 3,
      link: "Transactions",
      href: '/dashboard/transaction'
    },
    {
      id: 4,
      link: "Order history",
      href: '/dashboard/order-history'
    },
    {
      id: 5,
      link: "Notifications",
      href: '/dashboard/notification'
    },
    {
      id: 5,
      link: "Settings",
      href: '/dashboard/settings'
    },
  ];


  const fullName = profile?.user?.full_name || '-------';
  const avatar = profile?.user?.avatar;


  return (
    <>
      <div className="min-h-[76px] max-h-[76px] bg-white md:pl-7 md:pr-[80px] px-5 flex items-center justify-between relative">
        <div className="flex justify-between items-center w-full">
          <div>
            {/* <div className="relative">
        <input
          type='text'
          id=''
          value={''}
          onChange={undefined}
          className="text-gray-900 text-[16px] rounded-[12px] outline-none w-[300px] px-4 py-3"
          style={{background: 'rgba(204, 204, 204, 0.20)'}}
          placeholder='Search by categories'
        />
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <div>
              <AiOutlineSearch />
            </div>
          </IconContext.Provider>
        </div>
      </div> */}
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <div className="c-logged__in items-center mr-2 md:mr-10">
                <div className="c-user relative">
                  <div className="c-user__header items-center cursor-pointer flex">
                    <div className="c-user__avatar w-9 h-9">
                      <img src={profile?.user?.avatar} alt="user photo" className="w-full h-full object-cover" />
                    </div>
                    <div className="c-user__name ml-1.5 font-[500] text-red-light font-15">
                      {profile?.user?.full_name.split(" ")[0]}
                    </div>
                  </div>
                  <div className="c-user__dropdown">
                    <div className="dropdown-content h-full">
                      <div className="user-area py-3">
                        <div className="mb-4">
                          <h4 className="font-[600] text-blue-dark p-5 pb-3 pt-2 text-base">My Account</h4>
                          <div>
                            <Link
                              href="/dashboard/settings"
                              className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                            >
                              My Profile
                            </Link>
                          </div>

                          <div>
                            <Link
                              href="/dashboard/settings"
                              className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                            >
                              Account Settings
                            </Link>
                          </div>

                          <div>
                            <Link
                              href="/dashboard/order-history"
                              className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                            >
                              Order History
                            </Link>
                          </div>
                        </div>

                        {profile?.user?.merchStore?.id && (
                          <>
                            <hr className="border-cream" />

                            <div className="mt-1">
                              <h4 className="font-[600] text-blue-dark p-5 pb-3 text-base">My Store</h4>
                              <div>
                                <Link
                                  href="/dashboard/store"
                                  className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  View My Store
                                </Link>
                              </div>

                              <div>
                                <Link
                                  href="/dashboard/transactions"
                                  className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  Transactions
                                </Link>
                              </div>

                              <div>
                                <Link
                                  href="/dashboard/transactions"
                                  className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  Payments
                                </Link>
                              </div>

                              {/* <div>
                                                        <Link
                                                            href="/dashboard/settings"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            Design Uploads
                                                        </Link>
                                                    </div> */}
                            </div>
                          </>
                        )}
                        {!profile?.user?.merchStore?.id && (
                          <>
                            <hr className="border-cream" />
                            <div className="mt-1">
                              <div>
                                <Link
                                  href="/create-store"
                                  className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  Create Store
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="dropdown-spacing"></div>

                      <div className="logout-area">
                        <button
                          className="text-blue-dark no-outline w-full py-5 px-8 font-normal text-base block mb-2 text-left"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <IconButton>
              <Link href="/cart" className="c-cart__icon flex-shrink-0 relative">
                <img
                  src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.2202 10.7466L25.3669 19.76C25.1536 20.4 24.5936 20.8267 23.9269 20.8267H12.9136C12.2736 20.8267 11.6602 20.4266 11.4469 19.8399L7.26024 8.55999H4.8069C4.22023 8.55999 3.74023 8.08 3.74023 7.49333C3.74023 6.90666 4.22023 6.42666 4.8069 6.42666H7.98023C8.43357 6.42666 8.83357 6.71998 8.99357 7.14665L13.3402 18.6666H23.4736L25.7402 11.4666H13.1802C12.5936 11.4666 12.1136 10.9866 12.1136 10.4C12.1136 9.8133 12.5936 9.3333 13.1802 9.3333H27.2069C27.5536 9.3333 27.8736 9.51996 28.0602 9.78662C28.2736 10.0533 28.3269 10.4266 28.2202 10.7466ZM13.4469 22.2133C12.9936 22.2133 12.5402 22.4 12.2202 22.72C11.9002 23.04 11.7136 23.4933 11.7136 23.9466C11.7136 24.4 11.9002 24.8533 12.2202 25.1733C12.5402 25.4933 12.9936 25.68 13.4469 25.68C13.9002 25.68 14.3536 25.4933 14.6736 25.1733C14.9936 24.8533 15.1802 24.4 15.1802 23.9466C15.1802 23.4933 14.9936 23.04 14.6736 22.72C14.3536 22.4 13.9002 22.2133 13.4469 22.2133ZM23.0202 22.2133C22.5669 22.2133 22.1136 22.4 21.7936 22.72C21.4736 23.04 21.2869 23.4933 21.2869 23.9466C21.2869 24.4 21.4736 24.8533 21.7936 25.1733C22.1136 25.4933 22.5669 25.68 23.0202 25.68C23.4736 25.68 23.9269 25.4933 24.2469 25.1733C24.5669 24.8533 24.7536 24.4 24.7536 23.9466C24.7536 23.4933 24.5669 23.04 24.2469 22.72C23.9269 22.4 23.4736 22.2133 23.0202 22.2133Z' fill='%23384A62'/%3E%3C/svg%3E%0A"
                  alt="cart"
                />
                {/* {cartData?.length > 0 && (
              <span className="absolute c-cart__size font-sf--bold font-15 text-white bg-red-light">
                {cartData.length}
              </span>
            )} */}
              </Link>
            </IconButton>
          </div>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer z-10 md:hidden"
        >
          {nav ? <MdClose size={25} /> : <HiOutlineMenuAlt3 size={25} />}
        </div>
      </div>

      {nav && isMobile && (
        <div className="w-[50vw] h-[60vh] bg-[#fff] absolute right-5 top-14 bottom-5 rounded-[20px] z-50 shadow-md p-4">
          <div className="mt-5 flex flex-col">
            {links.map(({ id, link, href }) => (
              <div
                key={id}
                className="px-4 cursor-pointer text-black py-5 text-[3.7vw]" onClick={() => router.push(href)} >
                {link}
              </div>
            ))}
            <div onClick={logout} className="px-4 cursor-pointer text-[#ff0000] py-4 text-[3.7vw] bg-[#ff353521] rounded-[14px]">
              <p className="leading-tight">Logout</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
