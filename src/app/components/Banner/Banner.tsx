import React from "react";
import { useRouter } from "next/navigation";

interface Banner {
    email?: string;
}

export default function Banner({ email }: Banner) {
    const router = useRouter();
    return (
        <nav className="flex justify-between items-center px-2 md:px-16 py-3 bg-cream-light">
            <p className="font-medium text-sm text-blue-md cursor-pointer track__order" onClick={() => router.push("/track")}>
                Track Orders
            </p>

            <div className="flex items-center justify-between">
                <p className="font-medium text-sm mx-2 md:mx-8 text-blue-dark contact__">
                    {email ? (
                        <span className="need__help cursor-pointer">
                            <a href={`mailto:${email}`}>Send us a message</a>
                        </span>
                    ) : (
                        <span>
                            {/* <span className="need__help">Need Help? Call</span>{" "}
              <span style={{ color: "#327AE6" }}>+234802749223</span> */}
                        </span>
                    )}
                </p>
                {/* <div className="mx-8 cursor-pointer">{email ? "" : <WhatsApp />}</div> */}
                <div className="flex justify-between items-center border border-brown-light rounded-3xl py-2 px-4 cursor-pointer country_">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2.66699H0V13.3338H16V2.66699Z" fill="#F0F0F0" />
                        <path d="M5.33322 2.66699H0V13.3338H5.33322V2.66699Z" fill="#4A945A" />
                        <path d="M16.0002 2.66699H10.667V13.3338H16.0002V2.66699Z" fill="#4A945A" />
                    </svg>
                    <p className="mx-2 font-semibold text-sm text-odi-lite nigeria__">Nigeria</p>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.52876 5.52827C3.78911 5.26792 4.21122 5.26792 4.47157 5.52827L8.00016 9.05687L11.5288 5.52827C11.7891 5.26792 12.2112 5.26792 12.4716 5.52827C12.7319 5.78862 12.7319 6.21073 12.4716 6.47108L8.47157 10.4711C8.21122 10.7314 7.78911 10.7314 7.52876 10.4711L3.52876 6.47108C3.26841 6.21073 3.26841 5.78862 3.52876 5.52827Z"
                            fill="#506683"
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
}
