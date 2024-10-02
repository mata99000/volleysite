import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export default function ProfileTabs() {

  // Kornisna funkcija classNames je da primi if statement vezan za klase, ako je klasa selektovana vazi prvi uslov
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

    const categories = [
        {
          name: 'Recent',
          posts: [
            {
              id: 1,
              title: 'Does drinking coffee make you smarter?',
              date: '5h ago',
              commentCount: 5,
              shareCount: 2,
            },
            {
              id: 2,
              title: "So you've bought coffee... now what?",
              date: '2h ago',
              commentCount: 3,
              shareCount: 2,
            },
          ],
        },
        {
          name: 'Popular',
          posts: [
            {
              id: 1,
              title: 'Is tech making coffee better or worse?',
              date: 'Jan 7',
              commentCount: 29,
              shareCount: 16,
            },
            {
              id: 2,
              title: 'The most innovative things happening in coffee',
              date: 'Mar 19',
              commentCount: 24,
              shareCount: 12,
            },
          ],
        },
        {
          name: 'Trending',
          posts: [
            {
              id: 1,
              title: 'Ask Me Anything: 10 answers to your questions about coffee',
              date: '2d ago',
              commentCount: 9,
              shareCount: 5,
            },
            {
              id: 2,
              title: "The worst advice we've ever heard about coffee",
              date: '4d ago',
              commentCount: 1,
              shareCount: 2,
            },
          ],
        },
      ]

    return (
    <>
                <TabGroup>
                    <TabList className="pl-[250px] flex bg-white">
                        {categories.map(({ name }) => (
                        <Tab
                            key={name}
                            // Nacin da se elektovanom tabu dodeli odgovarajuca klasu
                            className={({ selected }) => 
                            classNames(
                              "py-2.5 px-3 text-sm outline-none",
                              selected ?
                              "bg-white text-blue-500" : "text-gray-700"
                            )}
                        >
                              {name}
                        </Tab>
                        ))}
                    </TabList>
            <TabPanels className="mt-3">
                {categories.map(({ name, posts }) => (
                    <TabPanel key={name} className="rounded-xl bg-white p-3 ring-white/60">
                        <ul>
                            {posts.map((post) => (
                            <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                                <a href="#" className="font-semibold text-black">
                                <span className="absolute inset-0" />
                                    {post.title}
                                </a>
                                <ul className="flex gap-2 text-black/50" aria-hidden="true">
                                    <li>{post.date}</li>
                                    <li aria-hidden="true">&middot;</li>
                                    <li>{post.commentCount} comments</li>
                                    <li aria-hidden="true">&middot;</li>
                                    <li>{post.shareCount} shares</li>
                                </ul>
                            </li>
                            ))}
                        </ul>
                    </TabPanel>
                    ))}
            </TabPanels>
                </TabGroup>
    </>
    )
}