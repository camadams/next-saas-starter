import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Database } from "lucide-react";
import { Terminal } from "./terminal";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                The Best Spendings Tracker Ever{" "}
                {/* <span className="text-orange-500">Ever</span> */}
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Keep track and gain control of your spendings
              </p>
              {/* <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="">
                  <div
                    className={`relative md:w-1/3 mx-auto`}
                    style={{ aspectRatio: `3200 / 1415` }}
                  >
                    <Image
                      className="object-contain rounded-sm"
                      src="/publicsheet.png"
                      alt="publicsheet"
                      fill
                    />
                  </div>
                </div>
              </div> */}
            </div>

            <div className="md:w-1/2 w-full p-6 ">
              <h1 className="text-sm">
                Click{" "}
                <a
                  className="underline text-blue-600"
                  href={"https://docs.google.com/spreadsheets/d/1miwGLbtSz2PscoSHbgtde7k7swR9QJsnWbcGkT-zFH8/edit?usp=sharing"}
                  target="_blank"
                >
                  here
                </a>
                {" "}
                to use a demo spreadsheet while we are still in development.
              </h1>
              <div
                className={`relative mx-auto`}
                style={{ aspectRatio: `2 / 1` }}
              >
                <Image
                  className="object-contain rounded-sm"
                  src="/publicsheet.png"
                  alt="publicsheet"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center p-2 md:p-8">
              <div className="p-2 md:p-4 md:text-3xl text-xl w-1/2 font-medium text-gray-900 flex items-center justify-center">
                Take a photo of receipt
              </div>
              <div className="w-1/2">
                <div
                  className={`relative md:w-1/3 mx-auto`}
                  style={{ aspectRatio: `480 / 640` }}
                >
                  <Image
                    className="object-contain rounded-sm"
                    src="/receipt.jpg"
                    alt="receipt"
                    fill
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-gray-50 p-2 md:p-8">
              <div className="w-1/2">
                <div
                  className="relative md:w-2/3 mx-auto"
                  style={{ aspectRatio: `1683 / 720` }}
                >
                  <Image
                    className="object-contain rounded-sm"
                    src="/table.png"
                    alt="table"
                    fill
                  />
                </div>
              </div>
              <div className="p-2 md:p-4  md:text-3xl text-xl w-1/2 font-medium text-gray-900 flex items-center justify-center">
                Have ✨AI✨ extract the info
              </div>
            </div>

            <div className="flex items-center justify-center  p-2 md:p-8">
              <div className="p-2 md:p-4 md:text-3xl text-xl w-1/2 font-medium text-gray-900 flex items-center justify-center">
                Keep track of spending
              </div>
              <div className="w-1/2">
                <div
                  className={`relative  md:w-2/3 mx-auto`}
                  style={{ aspectRatio: `1053 / 648` }}
                >
                  <Image
                    className="object-contain rounded-sm"
                    src="/pie.png"
                    alt="pie"
                    fill
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-gray-50 p-2 md:p-8">
              <div className="w-1/2">
                <div
                  className={`relative md:w-2/3 mx-auto`}
                  style={{ aspectRatio: `1575 / 859` }}
                >
                  <Image
                    className="object-contain rounded-sm"
                    src="/bar.png"
                    alt="bar"
                    fill
                  />
                </div>
              </div>
              <div className="p-2 md:p-4 md:text-3xl text-xl w-1/2 font-medium text-gray-900 flex items-center justify-center">
                Note: No spending on 6,7 July
              </div>
            </div>

            {/* <div className="flex justify-evenly bg-gray-100 rounded-md p-8">
              <Image src="/table.png" alt="table" width={400} height={100} />

              <div className="md:text-3xl text-xl font-medium text-gray-900 flex items-center">
                Have ✨AI✨ extract the info
              </div>
            </div>

            <div className="flex justify-evenly">
              <div className="md:text-3xl text-xl font-medium text-gray-900 flex items-center">
                Keep track of spending
              </div>
              <Image src="/pie.png" alt="pie" width={400} height={100} />
            </div>

            <div className="flex justify-evenly  bg-gray-100 rounded-md p-8">
              <Image src="/bar.png" alt="bar" width={400} height={100} />

              <div className="md:text-3xl text-xl font-medium text-gray-900 flex items-center">
                Note: No spending on 6,7 July
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to launch your SaaS?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Our template provides everything you need to get your SaaS up
                and running quickly. Don't waste time on boilerplate - focus on
                what makes your product unique.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a
                href="https://github.com/leerob/next-saas-starter"
                target="_blank"
              >
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  View the code
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
