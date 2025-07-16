import React from "react";
import ActivityTable from "./activity-table";
import DayCard from "./day-card";
import FlightCard from "./flight-card";
import { Plane, Hotel, CarTaxiFront, IdCard } from "lucide-react";
const PDFDocument = ({ data = {} }) => {
  const ITEMS_PER_PAGE = 15;
  const items = Array.isArray(data.items) ? data.items : [];
  const itemChunks = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    itemChunks.push(items.slice(i, i + ITEMS_PER_PAGE));
  }
  if (itemChunks.length === 0) itemChunks.push([]);

  return (
    <div id="pdf-content" className="mx-auto max-w-4xl bg-white p-8">
      <div className="pdf-page h-screen border-2 border-red-600 p-4">
        <div className="flex h-24 w-full items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-full w-auto" />
        </div>
        <section className="flex h-auto w-full flex-col gap-4">
          <div className="from-brand to-accent h-auto w-full rounded-xl bg-gradient-to-r p-4">
            <span className="text-pale font-regular flex w-full items-center justify-center text-center text-lg">
              Hi, Rahul
            </span>
            <span className="text-pale flex w-full items-center justify-center text-center text-xl font-semibold">
              Signapore Iternarary
            </span>
            <span className="text-pale font-regular flex w-full items-center justify-center py-1 text-center text-lg">
              6 Days Nights
            </span>
            <div className="flex w-full items-center justify-center gap-4 py-2">
              <Plane
                fill="currentColor"
                className="text-pale h-6 w-6"
                strokeWidth={0}
              />
              <Hotel className="text-pale h-6 w-6" />
              <CarTaxiFront className="text-pale h-6 w-6" />
              <IdCard className="text-pale h-6 w-6" />
            </div>
          </div>
          <div className="border-brand/25 flex h-auto w-full rounded-2xl border-[1.5px] text-sm">
            <div className="flex h-auto w-1/5 flex-col gap-1 p-4">
              <span className="text-deep text-xs font-semibold">
                Departure from
              </span>
              <span className="text-deep">Kolkata</span>
            </div>
            <div className="flex h-auto w-1/5 flex-col gap-1 p-4">
              <span className="text-deep text-xs font-semibold">Departure</span>
              <span className="text-deep">09/06/2025</span>
            </div>
            <div className="flex h-auto w-1/5 flex-col gap-1 p-4">
              <span className="text-deep text-xs font-semibold">Arrival</span>
              <span className="text-deep">15/06/2025</span>
            </div>
            <div className="flex h-auto w-1/5 flex-col gap-1 p-4">
              <span className="text-deep text-xs font-semibold">
                Destination
              </span>
              <span className="text-deep">Singapore</span>
            </div>
            <div className="flex h-auto w-1/5 flex-col gap-1 p-4">
              <span className="text-deep text-xs font-semibold">
                No. of travellers
              </span>
              <span className="text-deep">4</span>
            </div>
          </div>
          {/* max TWO daycards if  */}
          <DayCard />
          <DayCard />
        </section>
      </div>

      <div className="page-break"></div>
      <div className="pdf-page h-screen border-2 border-red-600 p-4">
        <DayCard />
        <section className="mt-4 flex h-auto w-full flex-col gap-4">
          <span className="text-deep text-2xl font-semibold">
            Flight Summary
          </span>
          <div className="flex w-full flex-col gap-4">
            <FlightCard />
            <FlightCard />
            <FlightCard />
          </div>
          <span className="text-deep text-sm font-light">
            Note: All flights include meals, seat choice (excluding XL), and
            20kg/25Kg checked baggage.
          </span>
        </section>
        <section className="mt-4 flex h-auto w-full flex-col gap-2">
          <span className="text-deep mb-1 text-xl font-semibold">
            Hotel Bookings
          </span>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-gray-200 bg-white text-sm shadow">
              <thead>
                <tr className="bg-brand overflow-hidden rounded-xl text-white">
                  <th className="p-2 text-left">City</th>
                  <th className="p-2 text-left">Check In</th>
                  <th className="p-2 text-left">Check Out</th>
                  <th className="p-2 text-left">Nights</th>
                  <th className="p-2 text-left">Hotel Name</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-2">Singapore</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2">Super Townhouse Oak</td>
                </tr>
                <tr className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-2">Singapore</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2">
                    Super Townhouse Oak
                    <div className="text-xs text-gray-500">
                      Vashi Formerly Blue Diamond
                    </div>
                  </td>
                </tr>
                <tr className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-2">Singapore</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2">
                    Super Townhouse Oak
                    <div className="text-xs text-gray-500">
                      Vashi Formerly Blue Diamond
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2">Singapore</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2">24/02/2024</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2">
                    Super Townhouse Oak
                    <div className="text-xs text-gray-500">
                      Vashi Formerly Blue Diamond
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            <p>1. All Hotels Are Tentative And Can Be Replaced With Similar.</p>
            <p>2. Breakfast Included For All Hotel Stays.</p>
            <p>3. All Hotels Will Be 4* And Above Category</p>
            <p>
              4. A maximum occupancy of 2 people/room is allowed in most hotels.
            </p>
          </div>
        </section>
      </div>
      <div className="page-break"></div>
      <div className="pdf-page h-screen border-2 border-red-600 p-4">
        <div className="flex h-auto w-full flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <section className="border-brand/25 flex h-auto w-full rounded-2xl border-[1.5px] p-4">
              <div className="flex h-auto w-full flex-col gap-2">
                <span className="text-deep text-lg font-semibold">
                  Important Notes
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Airlines Standard Policy
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      All bookings subject to airline terms and conditions
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Flight/Hotel Cancellation
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Cancellation charges apply as per policy
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Trip Insurance
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Highly recommended for coverage protection
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Hotel Check-in & Out
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Standard timing: Check-in 3PM, Check-out 12PM
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Visa Rejection
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Visa/Non-cancellable fees are non-refundable
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-brand/25 flex h-auto w-full rounded-2xl border-[1.5px] p-4">
              <div className="flex h-auto w-full flex-col gap-2">
                <span className="text-deep text-lg font-semibold">
                  Scope Of Service
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Flight Tickets & Hotel Vouchers
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Delivered within 3 business days post payment
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Web Check-In
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Boarding passes via Email/WhatsApp 24hrs prior
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Customer Support
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Chat support with 4-hour response guarantee
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Cancellation Support
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Full assistance for booking modifications
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-deep text-xs font-semibold">
                      Trip Support
                    </span>
                    <span className="text-[10px] leading-tight text-gray-600">
                      Emergency support with 5-minute response
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-2 flex h-auto w-full flex-col gap-2">
            <span className="text-deep mb-1 text-xl font-semibold">
              Inclusion Summary
            </span>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse rounded-lg border border-gray-200 bg-white text-xs shadow">
                <thead>
                  <tr className="bg-brand overflow-hidden text-white">
                    <th className="p-2 text-left font-semibold">Item</th>
                    <th className="p-2 text-center font-semibold">Count</th>
                    <th className="p-2 text-left font-semibold">Details</th>
                    <th className="p-2 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="text-deep p-2 font-medium">Flight</td>
                    <td className="p-2 text-center font-medium">2</td>
                    <td className="p-2 text-[11px]">
                      All flights as mentioned in itinerary
                    </td>
                    <td className="p-2 text-center">
                      <span className="inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-medium text-yellow-700">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="text-deep p-2 font-medium">Hotel</td>
                    <td className="p-2 text-center font-medium">5</td>
                    <td className="p-2 text-[11px] leading-tight">
                      Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns),
                      Novotel (Gold Coast), Holiday Inn (Melbourne)
                    </td>
                    <td className="p-2 text-center">
                      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-medium text-green-700">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="text-deep p-2 font-medium">Transfers</td>
                    <td className="p-2 text-center font-medium">8</td>
                    <td className="p-2 text-[11px]">
                      Airport-Hotel, Hotel-Attraction, Day trips transfers
                    </td>
                    <td className="p-2 text-center">
                      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-medium text-green-700">
                        Included
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-brand/25 bg-pale-50/50 mt-2 rounded-sm border-[1.5px] p-2">
              <div className="flex items-center gap-2">
                <span className="text-deep text-xs font-semibold text-nowrap">
                  Transfer Policy:
                </span>
                <span className="text-[10px] leading-tight text-gray-700">
                  If any transfer is delayed beyond 15 minutes, customer may
                  book alternative transport and claim refunds.
                </span>
              </div>
            </div>
          </section>
        </div>
        <ActivityTable
          activities={[
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Nature/Sightseeing",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
            {
              city: "Rio De Janeiro",
              activity: "Sydney Harbour Cruise & Taronga Zoo",
              type: "Airlines Standard",
              time: "2-3 Hours",
            },
          ]}
        />
        <section className="border-brand/25 mt-4 flex h-auto w-full flex-col gap-2 rounded-sm border-[1.5px] p-3">
          <span className="text-deep mb-1 text-xl font-semibold">
            Terms & Conditions
          </span>
          <a
            href="https://www.example.com/terms"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Full Terms & Conditions
          </a>
        </section>
      </div>
    </div>
  );
};

export default PDFDocument;
