import React, { useState, useEffect, useCallback } from "react";

const ItineraryForm = ({ setPdfData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    customerPhone: "+1 (555) 987-6543",
    destination: "Bali, Indonesia",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    totalDays: 7,
    adults: 2,
    children: 0,
    days: [],
    flights: [],
    totalPrice: 0,
  });

  const totalSteps = 4;

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= formData.totalDays; i++) {
      const currentDate = new Date(formData.startDate);
      currentDate.setDate(currentDate.getDate() + (i - 1));

      days.push({
        dayNumber: i,
        date: currentDate.toISOString().split("T")[0],
        activities: [
          {
            id: Date.now() + i,
            name:
              i === 1
                ? "Airport Transfer & Hotel Check-in"
                : `Day ${i} Sightseeing`,
            description:
              i === 1
                ? "Private transfer from airport to hotel, check-in and welcome briefing"
                : "Guided tour of local attractions and cultural sites",
            time: i === 1 ? "14:00" : "09:00",
            duration: i === 1 ? "2 hours" : "6 hours",
            price: i === 1 ? 50 : 120,
            type: i === 1 ? "transfer" : "sightseeing",
          },
        ],
        transfers: [],
        accommodation: {
          name: "Luxury Beach Resort",
          checkIn: i === 1 ? "15:00" : "",
          checkOut: i === formData.totalDays ? "11:00" : "",
          roomType: "Deluxe Ocean View",
          price: 180,
        },
      });
    }
    setFormData((prev) => ({ ...prev, days }));
  }, [formData.totalDays, formData.startDate]);

  // Calculate total price
  const calculateTotal = useCallback(() => {
    let total = 0;

    // Accommodation costs
    formData.days.forEach((day) => {
      total += day.accommodation.price || 0;
    });

    // Activity costs
    formData.days.forEach((day) => {
      day.activities.forEach((activity) => {
        total += activity.price || 0;
      });
    });

    // Transfer costs
    formData.days.forEach((day) => {
      day.transfers.forEach((transfer) => {
        total += transfer.price || 0;
      });
    });

    // Flight costs (multiplied by number of adults)
    formData.flights.forEach((flight) => {
      total += (flight.price || 0) * formData.adults;
    });

    return total;
  }, [formData]);

  useEffect(() => {
    const totalPrice = calculateTotal();
    setFormData((prev) => ({ ...prev, totalPrice }));
    setPdfData({ ...formData, totalPrice });
  }, [
    formData.days,
    formData.flights,
    formData.adults,
    calculateTotal,
    setPdfData,
    formData,
  ]);

  const updateBasicInfo = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: Date.now(),
      name: "New Activity",
      description: "Activity description",
      time: "10:00",
      duration: "2 hours",
      price: 50,
      type: "sightseeing",
    };

    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? { ...day, activities: [...day.activities, newActivity] }
          : day,
      ),
    }));
  };

  const updateActivity = (dayIndex, activityIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              activities: day.activities.map((activity, aIndex) =>
                aIndex === activityIndex
                  ? { ...activity, [field]: value }
                  : activity,
              ),
            }
          : day,
      ),
    }));
  };

  const removeActivity = (dayIndex, activityIndex) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              activities: day.activities.filter(
                (_, aIndex) => aIndex !== activityIndex,
              ),
            }
          : day,
      ),
    }));
  };

  const addTransfer = (dayIndex) => {
    const newTransfer = {
      id: Date.now(),
      type: "Private Car",
      from: "Hotel",
      to: "Airport",
      time: "10:00",
      duration: "1 hour",
      price: 40,
      capacity: 4,
    };

    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? { ...day, transfers: [...day.transfers, newTransfer] }
          : day,
      ),
    }));
  };

  const updateTransfer = (dayIndex, transferIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              transfers: day.transfers.map((transfer, tIndex) =>
                tIndex === transferIndex
                  ? { ...transfer, [field]: value }
                  : transfer,
              ),
            }
          : day,
      ),
    }));
  };

  const removeTransfer = (dayIndex, transferIndex) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              transfers: day.transfers.filter(
                (_, tIndex) => tIndex !== transferIndex,
              ),
            }
          : day,
      ),
    }));
  };

  const addFlight = () => {
    const newFlight = {
      id: Date.now(),
      airline: "Garuda Indonesia",
      flightNumber: "GA-835",
      from: "JFK New York",
      to: "DPS Bali",
      departureTime: "10:30",
      arrivalTime: "14:25",
      price: 850,
      type: formData.flights.length === 0 ? "departure" : "return",
    };

    setFormData((prev) => ({
      ...prev,
      flights: [...prev.flights, newFlight],
    }));
  };

  const updateFlight = (flightIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      flights: prev.flights.map((flight, index) =>
        index === flightIndex ? { ...flight, [field]: value } : flight,
      ),
    }));
  };

  const removeFlight = (flightIndex) => {
    setFormData((prev) => ({
      ...prev,
      flights: prev.flights.filter((_, index) => index !== flightIndex),
    }));
  };

  const updateAccommodation = (dayIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.map((day, dIndex) =>
        dIndex === dayIndex
          ? { ...day, accommodation: { ...day.accommodation, [field]: value } }
          : day,
      ),
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const stepTitles = [
    "Trip Information",
    "Flight Details",
    "Daily Itinerary",
    "Review & Finalize",
  ];

  const renderProgressBar = () => (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => goToStep(step)}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                step === currentStep
                  ? "border-deep bg-deep text-white shadow-lg"
                  : step < currentStep
                    ? "border-slate-600 bg-slate-600 text-white"
                    : "border-slate-300 bg-white text-slate-400 hover:border-slate-400"
              }`}
            >
              {step < currentStep ? (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="font-medium">{step}</span>
              )}
            </button>
            {step < totalSteps && (
              <div className="mx-6 h-0.5 w-20 bg-slate-200">
                <div
                  className={`h-full bg-slate-600 transition-all duration-300 ${
                    step < currentStep ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-deep text-2xl font-light">
          {stepTitles[currentStep - 1]}
        </h2>
        <p className="mt-2 text-slate-500">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="mb-8 text-lg font-light text-slate-600">
                Let's start with the essential details of your journey
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      updateBasicInfo("customerName", e.target.value)
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) =>
                      updateBasicInfo("customerEmail", e.target.value)
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    updateBasicInfo("customerPhone", e.target.value)
                  }
                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) =>
                    updateBasicInfo("destination", e.target.value)
                  }
                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  placeholder="Where are you traveling to?"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      updateBasicInfo("startDate", e.target.value)
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateBasicInfo("endDate", e.target.value)}
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Total Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.totalDays}
                    onChange={(e) =>
                      updateBasicInfo(
                        "totalDays",
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Adults
                  </label>
                  <select
                    value={formData.adults}
                    onChange={(e) =>
                      updateBasicInfo("adults", parseInt(e.target.value))
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} Adult{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Children
                  </label>
                  <select
                    value={formData.children}
                    onChange={(e) =>
                      updateBasicInfo("children", parseInt(e.target.value))
                    }
                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="mb-8 text-lg font-light text-slate-600">
                Add your flight information to complete the travel details
              </h3>
            </div>

            <div className="mb-8 text-center">
              <button
                type="button"
                onClick={addFlight}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Flight
              </button>
            </div>

            {formData.flights.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <svg
                    className="h-8 w-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <p className="text-slate-500">No flights added yet</p>
                <p className="mt-1 text-sm text-slate-400">
                  Click "Add Flight" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {formData.flights.map((flight, index) => (
                  <div
                    key={flight.id}
                    className="rounded-lg border border-slate-200 p-6"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-deep text-lg font-medium">
                        {flight.type === "departure" ? "Outbound" : "Return"}{" "}
                        Flight
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className="rounded bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                          #{index + 1}
                        </span>
                        <button
                          onClick={() => removeFlight(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Remove Flight"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Airline
                        </label>
                        <input
                          type="text"
                          value={flight.airline}
                          onChange={(e) =>
                            updateFlight(index, "airline", e.target.value)
                          }
                          className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                          placeholder="e.g., Emirates"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Flight Number
                        </label>
                        <input
                          type="text"
                          value={flight.flightNumber}
                          onChange={(e) =>
                            updateFlight(index, "flightNumber", e.target.value)
                          }
                          className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                          placeholder="e.g., EK-123"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Price per Person
                        </label>
                        <div className="relative">
                          <span className="absolute top-3 left-0 text-slate-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={flight.price}
                            onChange={(e) =>
                              updateFlight(
                                index,
                                "price",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 pl-6 placeholder-slate-400 focus:ring-0 focus:outline-none"
                            placeholder="850"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          From
                        </label>
                        <input
                          type="text"
                          value={flight.from}
                          onChange={(e) =>
                            updateFlight(index, "from", e.target.value)
                          }
                          className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                          placeholder="JFK New York"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          To
                        </label>
                        <input
                          type="text"
                          value={flight.to}
                          onChange={(e) =>
                            updateFlight(index, "to", e.target.value)
                          }
                          className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 placeholder-slate-400 focus:ring-0 focus:outline-none"
                          placeholder="DPS Bali"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-700">
                            Departure
                          </label>
                          <input
                            type="time"
                            value={flight.departureTime}
                            onChange={(e) =>
                              updateFlight(
                                index,
                                "departureTime",
                                e.target.value,
                              )
                            }
                            className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-700">
                            Arrival
                          </label>
                          <input
                            type="time"
                            value={flight.arrivalTime}
                            onChange={(e) =>
                              updateFlight(index, "arrivalTime", e.target.value)
                            }
                            className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="mb-8 text-lg font-light text-slate-600">
                Plan your activities and logistics for each day
              </h3>
            </div>

            <div className="space-y-10">
              {formData.days.map((day, dayIndex) => (
                <div
                  key={day.dayNumber}
                  className="rounded-lg border border-slate-200"
                >
                  <div className="rounded-t-lg border-b border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-deep text-xl font-medium">
                      Day {day.dayNumber}
                    </h3>
                    <p className="mt-1 text-slate-600">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="space-y-8 p-6">
                    {/* Accommodation */}
                    <div>
                      <h4 className="text-deep mb-4 text-lg font-medium">
                        Accommodation
                      </h4>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                              Hotel Name
                            </label>
                            <input
                              type="text"
                              value={day.accommodation.name}
                              onChange={(e) =>
                                updateAccommodation(
                                  dayIndex,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="text-deep focus:border-deep w-full border-0 border-b border-slate-200 bg-transparent px-0 py-2 focus:ring-0 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                              Room Type
                            </label>
                            <input
                              type="text"
                              value={day.accommodation.roomType}
                              onChange={(e) =>
                                updateAccommodation(
                                  dayIndex,
                                  "roomType",
                                  e.target.value,
                                )
                              }
                              className="text-deep focus:border-deep w-full border-0 border-b border-slate-200 bg-transparent px-0 py-2 focus:ring-0 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                              Check-in
                            </label>
                            <input
                              type="time"
                              value={day.accommodation.checkIn}
                              onChange={(e) =>
                                updateAccommodation(
                                  dayIndex,
                                  "checkIn",
                                  e.target.value,
                                )
                              }
                              className="text-deep focus:border-deep w-full border-0 border-b border-slate-200 bg-transparent px-0 py-2 focus:ring-0 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                              Price per Night
                            </label>
                            <div className="relative">
                              <span className="absolute top-2 left-0 text-slate-500">
                                $
                              </span>
                              <input
                                type="number"
                                value={day.accommodation.price}
                                onChange={(e) =>
                                  updateAccommodation(
                                    dayIndex,
                                    "price",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                className="text-deep focus:border-deep w-full border-0 border-b border-slate-200 bg-transparent px-0 py-2 pl-4 focus:ring-0 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <h4 className="text-deep text-lg font-medium">
                          Activities
                        </h4>
                        <button
                          type="button"
                          onClick={() => addActivity(dayIndex)}
                          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Activity
                        </button>
                      </div>

                      {day.activities.map((activity, activityIndex) => (
                        <div
                          key={activity.id}
                          className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-6"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-600">
                              Activity #{activityIndex + 1}
                            </span>
                            {day.activities.length > 1 && (
                              <button
                                onClick={() =>
                                  removeActivity(dayIndex, activityIndex)
                                }
                                className="p-1 text-red-500 hover:text-red-700"
                                title="Remove Activity"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-slate-700">
                                Activity Name
                              </label>
                              <input
                                type="text"
                                value={activity.name}
                                onChange={(e) =>
                                  updateActivity(
                                    dayIndex,
                                    activityIndex,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-slate-700">
                                Time
                              </label>
                              <input
                                type="time"
                                value={activity.time}
                                onChange={(e) =>
                                  updateActivity(
                                    dayIndex,
                                    activityIndex,
                                    "time",
                                    e.target.value,
                                  )
                                }
                                className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-slate-700">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={activity.duration}
                                onChange={(e) =>
                                  updateActivity(
                                    dayIndex,
                                    activityIndex,
                                    "duration",
                                    e.target.value,
                                  )
                                }
                                className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                placeholder="e.g., 2 hours"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-slate-700">
                                Price
                              </label>
                              <div className="relative">
                                <span className="absolute top-3 left-0 text-slate-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  value={activity.price}
                                  onChange={(e) =>
                                    updateActivity(
                                      dayIndex,
                                      activityIndex,
                                      "price",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 pl-6 focus:ring-0 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700">
                                Description
                              </label>
                              <textarea
                                value={activity.description}
                                onChange={(e) =>
                                  updateActivity(
                                    dayIndex,
                                    activityIndex,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                className="text-deep focus:border-deep w-full rounded-md border border-slate-200 px-3 py-2 focus:ring-0 focus:outline-none"
                                placeholder="Activity description..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <h4 className="text-deep text-lg font-medium">
                          Transfers
                        </h4>
                        <button
                          type="button"
                          onClick={() => addTransfer(dayIndex)}
                          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Transfer
                        </button>
                      </div>

                      {day.transfers.length === 0 ? (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 py-8 text-center">
                          <p className="text-slate-500">No transfers added</p>
                        </div>
                      ) : (
                        day.transfers.map((transfer, transferIndex) => (
                          <div
                            key={transfer.id}
                            className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-6"
                          >
                            <div className="mb-4 flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-600">
                                Transfer #{transferIndex + 1}
                              </span>
                              <button
                                onClick={() =>
                                  removeTransfer(dayIndex, transferIndex)
                                }
                                className="p-1 text-red-500 hover:text-red-700"
                                title="Remove Transfer"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  Vehicle Type
                                </label>
                                <input
                                  type="text"
                                  value={transfer.type}
                                  onChange={(e) =>
                                    updateTransfer(
                                      dayIndex,
                                      transferIndex,
                                      "type",
                                      e.target.value,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  From
                                </label>
                                <input
                                  type="text"
                                  value={transfer.from}
                                  onChange={(e) =>
                                    updateTransfer(
                                      dayIndex,
                                      transferIndex,
                                      "from",
                                      e.target.value,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  To
                                </label>
                                <input
                                  type="text"
                                  value={transfer.to}
                                  onChange={(e) =>
                                    updateTransfer(
                                      dayIndex,
                                      transferIndex,
                                      "to",
                                      e.target.value,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  Time
                                </label>
                                <input
                                  type="time"
                                  value={transfer.time}
                                  onChange={(e) =>
                                    updateTransfer(
                                      dayIndex,
                                      transferIndex,
                                      "time",
                                      e.target.value,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={transfer.duration}
                                  onChange={(e) =>
                                    updateTransfer(
                                      dayIndex,
                                      transferIndex,
                                      "duration",
                                      e.target.value,
                                    )
                                  }
                                  className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 focus:ring-0 focus:outline-none"
                                  placeholder="e.g., 1 hour"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                  Price
                                </label>
                                <div className="relative">
                                  <span className="absolute top-3 left-0 text-slate-500">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    value={transfer.price}
                                    onChange={(e) =>
                                      updateTransfer(
                                        dayIndex,
                                        transferIndex,
                                        "price",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    className="text-deep focus:border-deep w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 pl-6 focus:ring-0 focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="mb-8 text-lg font-light text-slate-600">
                Review your complete itinerary before finalizing
              </h3>
            </div>

            {/* Customer Information */}
            <div className="rounded-lg bg-slate-50 p-6">
              <h4 className="text-deep mb-4 text-lg font-medium">
                Customer Information
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-slate-600">Name:</span>
                  <p className="font-medium">{formData.customerName}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Email:</span>
                  <p className="font-medium">{formData.customerEmail}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Phone:</span>
                  <p className="font-medium">{formData.customerPhone}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Travelers:</span>
                  <p className="font-medium">
                    {formData.adults} Adult{formData.adults > 1 ? "s" : ""},{" "}
                    {formData.children} Children
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-6">
              <h4 className="text-deep mb-4 text-lg font-medium">
                Trip Overview
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <span className="text-sm text-slate-600">Destination:</span>
                  <p className="font-medium">{formData.destination}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Duration:</span>
                  <p className="font-medium">{formData.totalDays} Days</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Dates:</span>
                  <p className="font-medium">
                    {new Date(formData.startDate).toLocaleDateString()} -{" "}
                    {new Date(formData.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="rounded-lg bg-slate-50 p-6">
              <h4 className="text-deep mb-4 text-lg font-medium">
                Cost Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Accommodation ({formData.totalDays} nights)</span>
                  <span>
                    $
                    {formData.days.reduce(
                      (total, day) => total + (day.accommodation.price || 0),
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Activities</span>
                  <span>
                    $
                    {formData.days.reduce(
                      (total, day) =>
                        total +
                        day.activities.reduce(
                          (actTotal, activity) =>
                            actTotal + (activity.price || 0),
                          0,
                        ),
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transfers</span>
                  <span>
                    $
                    {formData.days.reduce(
                      (total, day) =>
                        total +
                        day.transfers.reduce(
                          (transTotal, transfer) =>
                            transTotal + (transfer.price || 0),
                          0,
                        ),
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Flights ({formData.adults} adults)</span>
                  <span>
                    $
                    {formData.flights.reduce(
                      (total, flight) =>
                        total + (flight.price || 0) * formData.adults,
                      0,
                    )}
                  </span>
                </div>
                <hr className="border-slate-300" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total Cost</span>
                  <span>${formData.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <div className="mb-2 flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h4 className="text-lg font-medium text-green-800">
                  Ready to Generate
                </h4>
              </div>
              <p className="text-green-700">
                Your itinerary is complete and ready to be exported as a PDF.
                Click "Generate PDF" to create your travel document.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white shadow-xl">
          <div className="px-8 py-10">
            {renderProgressBar()}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`rounded-md px-6 py-3 font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                Previous
              </button>

              <div className="text-center">
                <span className="text-deep text-2xl font-light">
                  Total: ${formData.totalPrice.toLocaleString()}
                </span>
              </div>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-deep rounded-md px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-900"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPdfData({ ...formData, totalPrice: calculateTotal() });
                    alert(
                      "Simulated PDF generation.Click on export btn on navbar to download.",
                    );
                  }}
                  className="rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-green-700"
                >
                  Generate PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryForm;
