import React from 'react'

const WhyChoose = () => {
  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-normal text-slate-900 md:text-5xl">
              Why choose <br />
              <span className="text-[#1e60ff] font-sans font-bold">Fokoremovals</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500 max-w-xs">
              Your trusted partner for stress-free moves across the UK.
            </p>
          </div>
          <div className="flex items-start md:justify-end">
            <p className="text-sm leading-relaxed text-slate-600 max-w-xs md:text-right">
              At Fokoremovalsltd, we combine professionalism, reliability and care 
              to make every move smooth and hassle-free.
            </p>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Fully Insured */}
          <div className="flex flex-col justify-between  rounded-2xl border border-slate-100 bg-white p-6 shadow-sm relative ">
            <div className="relative flex h-18 w-full items-center justify-center bg-slate-50 rounded-xl mb-6 hover:shadow-lg transition-shadow duration-100 ">
                <img
  src="https://www.fokoremovals.co.uk/road.png"  alt="Angled road"
  className="absolute bottom-0 -left-[5px] w-full h-auto -top-[70px] object-cover opacity-100 rounded-lg [transform:rotate(2deg)_scale(1.2)_translateY(30px)] z-40 "
/>
            <img src="https://www.fokoremovals.co.uk/truck.png" alt="Moving Truck" className="absolute bottom-[40px] right-[-13%] top-[-100px] w-[300px] h-auto z-40 rotate-[1deg] scale-[1.2] translate-y-[30px] object-cover opacity-100 rounded-lg" />
              <div className="text-xs text-slate-400">[ Truck Illustration Asset ]</div>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Fully Insured Goods in Transit</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Enjoy complete peace of mind knowing your items are protected throughout the move.
              </p>
            </div>
          </div>

          {/* Card 2: Professional & Punctual */}
          <div className="flex flex-col justify-between  rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ">
            <div className="relative h-[220px] bg-[#f3f8fe] rounded-3xl mb-2 overflow-visible ">
  <img
    src="https://www.fokoremovals.co.uk/courier.png"
    alt="Mover Character"
    className="absolute -top-[80px] left-1/2 -translate-x-1/2 w-[230px] z-40"
  />
</div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Professional, Polite, and Punctual</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Our experienced team delivers a courteous, timely, and hassle-free service every time.
              </p>
            </div>
          </div>

          {/* Card 3: Affordable & Flexible */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="relative flex h-48 w-full items-center justify-center bg-slate-50 rounded-xl overflow-hidden mb-6 p-4">
              {/* Replace with your UI panels mockup asset */}
              <div className="text-xs text-slate-400">[ UI Review Panels Asset ]</div>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Affordable and Flexible Options</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Choose a plan that fits your schedule and budget without compromising on quality.
              </p>
            </div>
          </div>

          {/* Card 4: Handled with Care (Wide) */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="relative h-48 w-full bg-slate-100 rounded-xl overflow-hidden mb-6">
              <img
  alt="Shop"
  src="https://www.fokoremovals.co.uk/Shop.png"
  className="w-full h-full object-cover rounded-lg"
/>
              
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Your Belongings Handled with Care</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                We treat your possessions as if they were our own, ensuring safe transport at every stage.
              </p>
            </div>
          </div>

          {/* Card 5: Based in Loughborough */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-1">
            <div className="relative h-48 w-full bg-slate-100 rounded-xl overflow-hidden mb-6">
              {/* Replace with your map/pin image banner */}
              <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 bg-teal-50/40">
                [ Map Pin Image Banner ]
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Based in Loughborough, Operating UK-Wide</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Local expertise with national reach wherever you're moving, we've got you covered.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChoose
