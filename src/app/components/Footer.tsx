import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between mt-[150px] border-t-[6px] border-flysha-light-purple p-[100px_10px_30px]">
      <div className="container max-w-[1130px] mx-auto flex justify-between relative">
        <Image
          width={300}
          height={300}
          src="/assets/images/icons/Ellipse 4.png"
          className="absolute h-[300px] -top-[45px] -left-[20px] z-0"
          alt="icon"
        />
        <div className="flex shrink-0 h-fit z-10">
          <Image
            width={120}
            height={50}
            src="/assets/images/logos/logo.svg"
            alt=""
          />
        </div>
        <div className="flex gap-[100px] z-10">
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Explore</p>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Services
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Testimonials
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Pricing
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              About
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Services</p>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Pickup at Home
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              First Lounge Plus
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Business Room
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Bentley Power
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">About</p>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Company Profile
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Our Investors
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Media Press
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300"
            >
              Careers
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Connect</p>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image
                width={20}
                height={20}
                src="/assets/images/icons/call.svg"
                alt="icon"
              />
              +1 2208 1996
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image
                width={20}
                height={20}
                src="/assets/images/icons/dribbble.svg"
                alt="icon"
              />
              buildwithangga
            </Link>
            <Link
              href=""
              className="font-medium hover:font-semibold hover:text-flysha-light-purple transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image
                width={20}
                height={20}
                src="/assets/images/icons/sms.svg"
                alt="icon"
              />
              team@bwa.com
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-[60px] text-[#A0A0AC] text-sm z-10">
        All Rights Reserved. Copyright BuildWithAngga 2024.
      </p>
    </footer>
  );
}
