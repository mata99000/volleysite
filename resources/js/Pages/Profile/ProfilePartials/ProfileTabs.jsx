import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import ProfileTabsItems from './ProfileTabsItems';
import { DivideIcon } from '@heroicons/react/20/solid';
import Slide from './Slide';

export default function ProfileTabs() {

  // Kornisna funkcija classNames je da primi if statement vezan za klase, ako je klasa selektovana vazi prvi uslov
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

    return (
    <>
                <TabGroup>
                    <TabList className="flex justify-center bg-white">
                    {/* Lista imena tabova */}
                        <ProfileTabsItems text="Profile"  />
                        <ProfileTabsItems text="Clubs" />
                        <ProfileTabsItems text="Teammates" />
                        <ProfileTabsItems text="Achievement details" />
                    </TabList>

                    <TabPanels className="w-[1200px] mx-auto mt-3">
                    {/* Sadrzaj taba pojedinacno */}
                    <TabPanel  
                      className="rounded-xl p-3 focus:outline-none"
                      >
                        <div className="grid grid-rows-2 grid-flow-col gap-4">
                          <div className="row-span-3 rounded-lg bg-white p-4">
                            <h2 className="flex items-center font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                              Gallery
                            </h2>
                            <div className="w-full gallery-body">
                              <div className="w-full h-auto">
                              </div>
                              <div>
                                <Slide />
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg bg-white p-4">
                            <div className="">
                            <h2 className="flex items-center font-bold">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                              </svg>
                                Information
                            </h2>
                            </div>
                            <div id="tabela-info" className="">
                              <ul className="">
                                <li className="flex justify-between border-b py-2 text-sm">
                                  <div>Age</div>
                                  <div>18</div>
                                </li>
                                <li className="flex justify-between border-b py-2 text-sm">
                                  <div>Position</div>
                                  <div>--</div>
                                </li>
                                <li className="flex justify-between border-b py-2 text-sm">
                                  <div>Dominant Hand</div>
                                  <div>Right</div>
                                </li>
                                <li className="flex justify-between border-b py-2 text-sm">
                                  <div>Favourite Court</div>
                                  <div>Indoor</div>
                                </li>
                                <li className="flex justify-between py-2 text-sm">
                                  <div>Email</div>
                                  <div>milance@hotmail.com</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="h-[100px] mt-4 rounded-lg bg-white p-4">
                          <div className="">
                            <h2 className="flex items-center font-bold">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                              </svg>
                              Social Networks
                            </h2>
                            </div>
                            <div id="tabela-socials" className="">
                              <ul className="py-4 flex">
                                <li className="text-sm">
                                <a href="#!" role="button" className="flex items-center mr-4">
                                  <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#c13584] mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                      {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                  </span>
                                  Instagram
                                </a>
                                </li>

                                <li className="text-sm">
                                  <a href="#!" role="button" className="flex items-center">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#1877f2] mr-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                      {/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                      </svg>
                                    </span>
                                    Facebook
                                  </a>
                                  
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="h-[100px] -mt-28 rounded-lg bg-white p-4">
                          <div className="">
                            <h2 className="flex items-center font-bold">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                              </svg>
                                Region
                            </h2>
                          </div>
                          <div div id="region" className="">
                          <ul className="py-4 flex">
                            <li className="text-sm">
                            <a href="#!" role="button" className="flex items-center">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#1877f2] mr-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                      {/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                      </svg>
                                    </span>
                                    Facebook
                                  </a>
                            </li>
                            </ul>
                          </div>
                          </div>
                        </div>
                    </TabPanel>

                    <TabPanel 
                      className="rounded-xl bg-white p-3 ring-white/60 ring-offset-blue-400 focus:outline-none"
                      >
                        List of Clubs content
                    </TabPanel>

                    <TabPanel 
                      className="rounded-xl bg-white p-3 ring-white/60 ring-offset-blue-400 focus:outline-none"
                      >
                        Teammates content
                    </TabPanel>

                    <TabPanel  
                      className="rounded-xl bg-white p-3 ring-white/60 ring-offset-blue-400 focus:outline-none"
                      >
                        Achievement details content
                    </TabPanel>
            </TabPanels>
                </TabGroup>
    </>
    )
}