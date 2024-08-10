"use client"
import { useRouter } from "next/navigation";
import useGlobalState from "@/hooks/globalstate.hook";

interface Props {
  noCreateStore?: Boolean;
  customer?: Boolean;
}

const Services = () => {
  const {profile} = useGlobalState();
  const router = useRouter();

  const storeHandler = () => {
    if (!profile?.user) {
      router.push("/signup");
    } else {
      router.push("/store/create-store");
    }
  };

  return (
    <div className="">
      <section className="d c-services mx-auto px-8 md:px-16">
        {/* {noCreateStore && (
          <div className="mb-12 mx-28">
            {" "}
            <hr />
          </div>
        )} */}
        <div className="c-services__title font-[700] mb-4 text-2xl sm:text-3xl">You can count on us for:</div>
        <div className="c-services__grid grid">
          <div className="services-box sm:grid block">
            <div className="c-icon mb-2">
              <img
                src="data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M43.5 66C54.2697 66 63 57.2697 63 46.5C63 35.7303 54.2697 27 43.5 27C32.7303 27 24 35.7303 24 46.5C24 57.2697 32.7303 66 43.5 66Z' fill='%239BD9F0'/%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M36 10.5C21.9167 10.5 10.5 21.9167 10.5 36C10.5 50.0832 21.9167 61.5 36 61.5C50.0832 61.5 61.5 50.0832 61.5 36C61.5 21.9167 50.0832 10.5 36 10.5ZM13.5 36C13.5 23.5736 23.5736 13.5 36 13.5C48.4263 13.5 58.5 23.5736 58.5 36C58.5 48.4263 48.4263 58.5 36 58.5C23.5736 58.5 13.5 48.4263 13.5 36ZM37.5 19.5C37.5 18.6716 36.8283 18 36 18C35.1717 18 34.5 18.6716 34.5 19.5V34.5H22.5C21.6716 34.5 21 35.1717 21 36C21 36.8283 21.6716 37.5 22.5 37.5H36C36.8283 37.5 37.5 36.8283 37.5 36V19.5Z' fill='%23384A62'/%3E%3C/svg%3E%0A"
                alt="clock"
              />
            </div>
            <div className="c-text">
              <div className="c-text__title mb-1 font-[500]">Fast Turnaround Within Days</div>
              <div className="c-text__sub font-normal">
                Your order gets to you within 3-7 working days via DHL or our very own Printivo Direct.
              </div>
            </div>
          </div>

          <div className="services-box sm:grid block">
            <div className="c-icon mb-2">
              <img
                src="data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M35.987 9.656v52.32l-13.29-9.39c-4.32-3.51-7.11-8.7-7.62-14.25l-2.31-24.84 23.22-3.84z' fill='%23A7F5E7'/%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M61.457 10.226l-25.17-4.17c-.18-.03-.39-.03-.57 0l-25.17 4.17c-.93.15-1.59.99-1.5 1.92l2.43 26.52c.6 6.51 3.87 12.6 9.06 16.77l14.43 10.2c.3.24.66.33 1.02.33s.72-.09 1.05-.33l14.4-10.2c.03 0 .06-.03.09-.06 5.1-4.11 8.37-10.2 8.97-16.71l2.46-26.52c.06-.93-.57-1.77-1.5-1.92zm-4.53 28.11c-.51 5.55-3.3 10.71-7.59 14.22l-13.35 9.42-13.29-9.39c-4.32-3.51-7.11-8.7-7.62-14.25l-2.31-24.84 23.22-3.84 23.22 3.84-2.28 24.84z' fill='%23384A62'/%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M35.987 65.966v-3.99l-13.29-9.39c-4.32-3.51-7.11-8.7-7.62-14.25l-2.31-24.84 23.22-3.84V6.034c-.093 0-.185.008-.27.022l-25.17 4.17c-.93.15-1.59.99-1.5 1.92l2.43 26.52c.6 6.51 3.87 12.6 9.06 16.77l14.43 10.2c.3.24.66.33 1.02.33z' fill='%23000' fill-opacity='.3'/%3E%3C/svg%3E"
                alt="clock"
              />
            </div>
            <div className="c-text">
              <div className="c-text__title mb-1 font-[500]">100% Top Quality</div>
              <div className="c-text__sub font-normal">
                Only the finest materials, machines and people will be involved in fulfilling your order.
              </div>
            </div>
          </div>

          <div className="services-box sm:grid block">
            <div className="c-icon mb-2">
              <img
                src="data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M49.8 48.291h11.4c.99 0 1.8-.81 1.8-1.8v-12c0-.99-.81-1.8-1.8-1.8H49.8c-4.29 0-7.8 3.51-7.8 7.8s3.51 7.8 7.8 7.8zm-4.2-7.8c0-2.31 1.89-4.2 4.2-4.2h9.6v8.4h-9.6c-2.31 0-4.2-1.89-4.2-4.2zm6.9 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' fill='%23E384B6'/%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M53.73 14.57l-.11 4.921H31.435L53.73 14.57zM14.62 19.49l40.55-8.941c.54-.12 1.11.03 1.53.36.42.36.66.87.66 1.44l-.144 7.141h.984c2.64 0 4.8 2.16 4.8 4.8v10.2c0-.99-.81-1.8-1.8-1.8h-1.8v-8.4c0-.66-.54-1.2-1.2-1.2H13.8c-.66 0-1.2.54-1.2 1.2v32.4c0 .66.54 1.2 1.2 1.2h44.4c.66 0 1.2-.54 1.2-1.2v-8.4h1.8c.99 0 1.8-.81 1.8-1.8v10.2c0 2.64-2.16 4.8-4.8 4.8H13.8c-2.64 0-4.8-2.16-4.8-4.8v-32.4c0-2.64 2.16-4.8 4.8-4.8h.82z' fill='%23384A62'/%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M53.73 14.57l-.11 4.921h3.597l.143-7.141c0-.57-.24-1.08-.66-1.44-.42-.33-.99-.48-1.53-.36L14.62 19.49h16.816L53.73 14.57zM52.5 40.49a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' fill='%23000' fill-opacity='.3'/%3E%3C/svg%3E"
                alt="clock"
              />
            </div>
            <div className="c-text">
              <div className="c-text__title mb-1 font-[500]">Affordable Services</div>
              <div className="c-text__sub font-normal">
                All products are adequately priced to ensure you get value for your money at all times.
              </div>
            </div>
          </div>

          {/* {noCreateStore ? (
            ""
          ) : (
            <>
              {profile?.user?.merchStore ? (
                ""
              ) : (
                <>
                  {!customer && (
                    <div tw="flex flex-col lg:flex-row cursor-pointer" onClick={storeHandler}>
                      <p tw=" text-2xl lg:text-xl  my-5 text-odi  font-bold">
                        Create Your <br /> Merch Store Account
                      </p>
                      <ArrowEast />
                    </div>
                  )}
                </>
              )}
            </>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default Services;
