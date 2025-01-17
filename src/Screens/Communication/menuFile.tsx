import { FaHeadphones } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';

export const toggleMenu = (t: any) => {
  return [
    {
      label: 'Email',
      value: 1,
    },
    {
      label: 'SMS',
      value: 2,
    },
    {
      label: t('call'),
      value: 3,
    },
  ];
};

export const toggleEmailMenu = (t: any) => {
  return [
    {
      label: t('Inbox'),
      value: 1,
    },
    {
      label: t('Sent'),
      value: 2,
    },
    {
      label: t('Spam'),
      value: 3,
    },
  ];
};

export const toggleCallMenu = (t: any) => {
  return [
    {
      label: t('callDetail'),
      value: 0,
    },
    {
      label: t('call'),
      value: 1,
    },
    {
      label: t('videoCall'),
      value: 2,
    },
  ];
};

export const CallOptionsMenu = [
  {
    label: 'Call',
    value: 'call',
    id: 1,
    icon: <IoCall />,
  },
  {
    label: 'Video Link',
    value: 'videoCall',
    id: 2,
    icon: <FaHeadphones />,
  },
];

// Dummy data
export const dummyData = [
  {
    name: 'Sara Khurshid',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: new Date(), content: 'Hello, how are you?' },
      { sender: 'self', time: new Date(), content: "I'm good, how about you?" },
      {
        sender: 'user',
        time: new Date(),
        content: 'I’m doing well! Busy with work.',
      },
      { sender: 'self', time: new Date(), content: 'I know how that feels.' },
      {
        sender: 'user',
        time: new Date(),
        content: 'By the way, can we catch up soon?',
      },
      {
        sender: 'self',
        time: new Date(),
        content: 'Sure, let’s plan for the weekend.',
      },
      {
        sender: 'user',
        time: new Date(),
        content: 'Great! I’ll check my calendar.',
      },
      {
        sender: 'self',
        time: new Date(),
        content: 'Sounds good. Let me know!',
      },
      { sender: 'user', time: new Date(), content: 'Will do, take care!' },
      { sender: 'self', time: new Date(), content: 'You too!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T10:00:00Z'),
        type: 'incoming',
        roomId: 'sara.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'outgoing',
        roomId: 'sara.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'missed',
        roomId: 'sara.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '1',
    time: new Date(),
  },
  {
    name: 'John Doe',
    messages: [
      { sender: 'user', time: '18:30', content: 'Can you send me the report?' },
      {
        sender: 'self',
        time: '18:31',
        content: 'Sure, give me a few minutes.',
      },
      {
        sender: 'user',
        time: '18:32',
        content: 'Thanks! Let me know once sent.',
      },
      {
        sender: 'self',
        time: '18:33',
        content: 'Done. Let me know if you need anything else.',
      },
      { sender: 'user', time: new Date(), content: 'Got it. Appreciate it!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T09:00:00Z'),
        type: 'incoming',
        roomId: 'john.doe.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T13:00:00Z'),
        type: 'outgoing',
        roomId: 'john.doe.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T15:00:00Z'),
        type: 'missed',
        roomId: 'john.doe.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '2',
    time: new Date(),
  },
  {
    name: 'Emma Williams',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '14:22', content: 'Hello, how are you?' },
      { sender: 'self', time: '16:23', content: "I'm good, how about you?" },
      { sender: 'self', time: '17:24', content: 'Yes, confirmed.' },
      {
        sender: 'user',
        time: '17:25',
        content: 'Can you also bring the report?',
      },
      { sender: 'self', time: '17:26', content: 'Absolutely, it’s ready.' },
      {
        sender: 'self',
        time: '17:27',
        content: 'Sounds good. Let me know!',
      },
      { sender: 'user', time: '17:28', content: 'Will do, take care!' },
      { sender: 'self', time: '17:28', content: 'You too!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T11:00:00Z'),
        type: 'incoming',
        roomId: 'emma.williams.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'outgoing',
        roomId: 'emma.williams.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T16:00:00Z'),
        type: 'missed',
        roomId: 'emma.williams.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '3',
    time: new Date(),
  },
  {
    name: 'James Smith',
    messages: [
      { sender: 'self', time: '14:30', content: 'Where are we meeting?' },
      { sender: 'user', time: '14:35', content: 'At the usual spot.' },
      { sender: 'self', time: '14:40', content: 'Great, see you soon!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T10:30:00Z'),
        type: 'incoming',
        roomId: 'james.smith.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T12:30:00Z'),
        type: 'outgoing',
        roomId: 'james.smith.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T15:30:00Z'),
        type: 'missed',
        roomId: 'james.smith.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '4',
    time: new Date(),
  },
  {
    name: 'Lily Johnson',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '09:30', content: "Let's catch up soon!" },
      { sender: 'self', time: '09:35', content: 'Sure, when works for you?' },
      { sender: 'user', time: '09:40', content: 'How about Friday afternoon?' },
      { sender: 'self', time: '09:45', content: 'Perfect, see you then!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T10:00:00Z'),
        type: 'incoming',
        roomId: 'lily.johnson.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'outgoing',
        roomId: 'lily.johnson.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'missed',
        roomId: 'lily.johnson.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '5',
    time: new Date(),
  },
  {
    name: 'Mason Lee',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '09:30', content: "Let's catch up soon!" },
      { sender: 'self', time: '09:35', content: 'Sure, when works for you?' },
      { sender: 'user', time: '09:40', content: 'How about Friday afternoon?' },
      { sender: 'self', time: '09:45', content: 'Perfect, see you then!' },
      { sender: 'self', time: '14:30', content: 'Where are we meeting?' },
      { sender: 'user', time: '14:35', content: 'At the usual spot.' },
      { sender: 'self', time: '14:40', content: 'Great, see you soon!' },
    ],
    calls: [
      {
        inviationTime: new Date('2025-01-02T10:00:00Z'),
        type: 'incoming',
        roomId: 'mason.lee.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'outgoing',
        roomId: 'mason.lee.daily',
        inviationSenderId: 'self',
      },
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'missed',
        roomId: 'mason.lee.daily',
        inviationSenderId: 'self',
      },
    ],
    id: '6',
    time: new Date(),
  },
  {
    name: 'James Smith',
    messages: [
      { sender: 'self', time: '14:30', content: 'Where are we meeting?' },
      { sender: 'user', time: '14:35', content: 'At the usual spot.' },
      { sender: 'self', time: '14:40', content: 'Great, see you soon!' },
    ],
    id: '7',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T11:30:00Z'),
        type: 'incoming',
        roomId: 'james.smith.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T15:00:00Z'),
        type: 'outgoing',
        roomId: 'james.smith.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Lily Johnson',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '09:30', content: "Let's catch up soon!" },
      { sender: 'self', time: '09:35', content: 'Sure, when works for you?' },
      { sender: 'user', time: '09:40', content: 'How about Friday afternoon?' },
      { sender: 'self', time: '09:45', content: 'Perfect, see you then!' },
    ],
    id: '8',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T10:00:00Z'),
        type: 'missed',
        roomId: 'lily.johnson.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'outgoing',
        roomId: 'lily.johnson.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Mason Lee',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '09:30', content: "Let's catch up soon!" },
      { sender: 'self', time: '09:35', content: 'Sure, when works for you?' },
      { sender: 'user', time: '09:40', content: 'How about Friday afternoon?' },
      { sender: 'self', time: '09:45', content: 'Perfect, see you then!' },
      { sender: 'self', time: '14:30', content: 'Where are we meeting?' },
      { sender: 'user', time: '14:35', content: 'At the usual spot.' },
      { sender: 'self', time: '14:40', content: 'Great, see you soon!' },
    ],
    id: '9',
    time: '14:45',
    calls: [
      {
        inviationTime: new Date('2025-01-02T11:00:00Z'),
        type: 'incoming',
        roomId: 'mason.lee.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T16:30:00Z'),
        type: 'outgoing',
        roomId: 'mason.lee.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Sophia Brown',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '09:30', content: "Let's catch up soon!" },
      {
        sender: 'self',
        time: '09:35',
        content: 'Absolutely, it’s been a while.',
      },
      { sender: 'user', time: '16:45', content: 'Where are we meeting?' },
      { sender: 'self', time: '16:50', content: 'I’ll be at the usual spot.' },
    ],
    id: '10',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T13:00:00Z'),
        type: 'incoming',
        roomId: 'sophia.brown.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T17:30:00Z'),
        type: 'outgoing',
        roomId: 'sophia.brown.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Lucas Davis',
    messages: [
      { sender: 'user', time: '23:34', content: 'Hello, how are you?' },
      { sender: 'self', time: '23:36', content: 'I’m good, how about you?' },
      {
        sender: 'user',
        time: '23:40',
        content: 'I’m doing great, just finishing up work.',
      },
      {
        sender: 'self',
        time: '23:42',
        content: 'That sounds good! How was your day?',
      },
      {
        sender: 'user',
        time: '23:45',
        content: 'Busy, but productive. How about yours?',
      },
      {
        sender: 'self',
        time: '23:48',
        content: 'Same here, just trying to wrap things up.',
      },
    ],
    id: '11',
    time: '18:00',
    calls: [
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'missed',
        roomId: 'lucas.davis.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T16:30:00Z'),
        type: 'outgoing',
        roomId: 'lucas.davis.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Charlotte Wilson',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '10:15', content: 'Can you send me the report?' },
      { sender: 'self', time: '10:17', content: 'I’ll send it right away!' },
      { sender: 'user', time: '10:20', content: 'Thanks, I appreciate it.' },
      {
        sender: 'self',
        time: '10:25',
        content: 'No problem, let me know if you need anything else.',
      },
      { sender: 'user', time: '10:30', content: 'Will do, thanks!' },
      { sender: 'self', time: '10:35', content: 'You’re welcome!' },
    ],
    id: '12',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T14:00:00Z'),
        type: 'incoming',
        roomId: 'charlotte.wilson.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T18:00:00Z'),
        type: 'outgoing',
        roomId: 'charlotte.wilson.daily',
        inviationSenderId: 'self',
      },
    ],
  },

  {
    name: 'Amelia Martinez',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '08:45', content: 'Hey, how are things going?' },
      {
        sender: 'self',
        time: '08:50',
        content: 'Things are going well, how about you?',
      },
      {
        sender: 'user',
        time: '08:55',
        content: 'Busy, but getting through it.',
      },
      {
        sender: 'self',
        time: '09:00',
        content: 'Glad to hear that! Let me know if you need help.',
      },
    ],
    id: '13',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T12:30:00Z'),
        type: 'incoming',
        roomId: 'amelia.martinez.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T16:15:00Z'),
        type: 'outgoing',
        roomId: 'amelia.martinez.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Ethan Harris',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '10:00', content: 'Let’s sync up later.' },
      { sender: 'self', time: '10:05', content: 'Sure, let’s set a time.' },
      { sender: 'user', time: '10:10', content: 'How about 3 PM?' },
      { sender: 'self', time: '10:15', content: 'Sounds good, see you then!' },
    ],
    id: '14',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T14:30:00Z'),
        type: 'incoming',
        roomId: 'ethan.harris.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T18:45:00Z'),
        type: 'outgoing',
        roomId: 'ethan.harris.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Mia Thomas',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '08:20', content: 'Can you send me the file?' },
      { sender: 'self', time: '08:25', content: 'Just did, check your email.' },
      { sender: 'user', time: '08:30', content: 'Thanks for sending it over!' },
      {
        sender: 'self',
        time: '08:35',
        content: 'You’re welcome, happy to help!',
      },
    ],
    id: '15',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'missed',
        roomId: 'mia.thomas.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T15:30:00Z'),
        type: 'outgoing',
        roomId: 'mia.thomas.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Jack White',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '09:00',
        content: 'Good morning, ready for the meeting?',
      },
      {
        sender: 'self',
        time: '09:05',
        content: 'Good morning! Ready as ever.',
      },
      { sender: 'user', time: '09:10', content: 'Let’s dive right in!' },
      { sender: 'self', time: '09:15', content: 'Sounds like a plan.' },
    ],
    id: '16',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T13:00:00Z'),
        type: 'incoming',
        roomId: 'jack.white.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T16:00:00Z'),
        type: 'outgoing',
        roomId: 'jack.white.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Isabella Robinson',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '11:00',
        content: 'Can you meet me later today?',
      },
      {
        sender: 'self',
        time: '11:05',
        content: 'Absolutely, what time works for you?',
      },
      { sender: 'user', time: '11:10', content: 'How about after lunch?' },
      { sender: 'self', time: '11:15', content: 'Perfect, see you at 1 PM!' },
    ],
    id: '17',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T12:45:00Z'),
        type: 'incoming',
        roomId: 'isabella.robinson.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T17:00:00Z'),
        type: 'outgoing',
        roomId: 'isabella.robinson.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Benjamin Carter',
    url: 'https://via.placeholder.com/150',
    messages: [
      { sender: 'user', time: '08:30', content: 'How’s your day going?' },
      { sender: 'self', time: '08:35', content: 'It’s been good so far.' },
      { sender: 'user', time: '08:40', content: 'That’s good to hear!' },
      {
        sender: 'self',
        time: '08:45',
        content: 'Thanks! Let’s catch up soon.',
      },
    ],
    id: '18',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T13:30:00Z'),
        type: 'incoming',
        roomId: 'benjamin.carter.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T18:15:00Z'),
        type: 'outgoing',
        roomId: 'benjamin.carter.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Henry Lee',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '09:00',
        content: 'Can we discuss the new project?',
      },
      {
        sender: 'self',
        time: '09:05',
        content: 'Of course, when works for you?',
      },
      { sender: 'user', time: '09:10', content: 'How about after lunch?' },
      {
        sender: 'self',
        time: '09:15',
        content: 'Sounds good. Let’s catch up then.',
      },
    ],
    id: '19',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T12:00:00Z'),
        type: 'incoming',
        roomId: 'henry.lee.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T17:30:00Z'),
        type: 'outgoing',
        roomId: 'henry.lee.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Olivia Green',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '14:30',
        content: 'Can you help with the presentation?',
      },
      {
        sender: 'self',
        time: '14:35',
        content: 'Sure, I’ll take a look right now.',
      },
      {
        sender: 'user',
        time: '14:40',
        content: 'Thanks! Let me know if you need anything.',
      },
      {
        sender: 'self',
        time: '14:45',
        content: 'I’m all set for now, appreciate it!',
      },
    ],
    id: '20',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T16:00:00Z'),
        type: 'missed',
        roomId: 'olivia.green.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T18:30:00Z'),
        type: 'outgoing',
        roomId: 'olivia.green.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Gabriel Thomas',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '10:00',
        content: 'I need a quick update on the task.',
      },
      {
        sender: 'self',
        time: '10:05',
        content: 'I’ll send it to you shortly.',
      },
      { sender: 'user', time: '10:10', content: 'Thanks for the help!' },
      {
        sender: 'self',
        time: '10:15',
        content: 'No problem, happy to assist.',
      },
    ],
    id: '21',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T13:15:00Z'),
        type: 'incoming',
        roomId: 'gabriel.thomas.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T19:00:00Z'),
        type: 'outgoing',
        roomId: 'gabriel.thomas.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Victoria Moore',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '13:00',
        content: 'How’s the presentation going?',
      },
      {
        sender: 'self',
        time: '13:05',
        content: 'It’s almost done, should be ready in an hour.',
      },
      {
        sender: 'user',
        time: '13:10',
        content: 'Awesome! Let me know if you need anything.',
      },
      {
        sender: 'self',
        time: '13:15',
        content: 'I’ll reach out if needed, thanks!',
      },
    ],
    id: '22',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T14:45:00Z'),
        type: 'incoming',
        roomId: 'victoria.moore.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T20:00:00Z'),
        type: 'outgoing',
        roomId: 'victoria.moore.daily',
        inviationSenderId: 'self',
      },
    ],
  },
  {
    name: 'Sophia Carter',
    url: 'https://via.placeholder.com/150',
    messages: [
      {
        sender: 'user',
        time: '08:00',
        content: 'Can you send me the updated files?',
      },
      {
        sender: 'self',
        time: '08:05',
        content: 'I’ll send them over right now.',
      },
      {
        sender: 'user',
        time: '08:10',
        content: 'Thanks, I’ll look at them right away.',
      },
      {
        sender: 'self',
        time: '08:15',
        content: 'Great, let me know if you have questions.',
      },
    ],
    id: '23',
    time: new Date(),
    calls: [
      {
        inviationTime: new Date('2025-01-02T11:30:00Z'),
        type: 'missed',
        roomId: 'sophia.carter.daily',
        inviationSenderId: 'Someone',
      },
      {
        inviationTime: new Date('2025-01-02T15:00:00Z'),
        type: 'outgoing',
        roomId: 'sophia.carter.daily',
        inviationSenderId: 'self',
      },
    ],
  },
];

const senderNames = [
  'John Smith',
  'Jane Doe',
  'Emily Johnson',
  'Michael Brown',
  'Sarah Wilson',
  'James Miller',
  'Olivia Davis',
  'William Garcia',
  'Ava Martinez',
  'Benjamin Rodriguez',
  'Sophia Taylor',
  'Lucas Hernandez',
  'Mia Thomas',
  'Henry Moore',
  'Isabella Martin',
  'Alexander Lee',
  'Charlotte Perez',
  'Ethan White',
  'Amelia Harris',
  'Mason Clark',
  'Ella Lewis',
  'Logan Walker',
  'Grace Hall',
  'Jackson Young',
  'Chloe Allen',
  'Sebastian King',
  'Lily Wright',
  'Dylan Scott',
  'Zoe Green',
  'Nathan Adams',
  'Victoria Hill',
  'Caleb Nelson',
  'Nora Baker',
  'Jacob Gonzalez',
  'Scarlett Carter',
  'Elijah Mitchell',
  'Harper Rivera',
  'Matthew Campbell',
  'Madison Flores',
  'Levi Stewart',
  'Ellie Sanchez',
  'Owen Morris',
  'Hazel Nguyen',
  'Gabriel Rogers',
  'Layla Reed',
  'Samuel Cooper',
  'Aria Morgan',
  'Isaac Bell',
  'Penelope Murphy',
  'Anthony Bailey',
  'Aubrey Phillips',
  'Joshua Gray',
  'Hannah Hughes',
  'Andrew Ramirez',
  'Mila Jenkins',
  'Ryan Bryant',
  'Eleanor Butler',
  'Caleb Foster',
  'Zoey Simmons',
  'Luke Perry',
];

export const dummyEmailData = Array.from({ length: 60 }, (_, index) => ({
  id: `email-${index + 1}`,
  SenderName: senderNames[index % senderNames.length], // Use sender names in a cyclic manner.
  Subject: `Subject ${index + 1}: ${
    index % 3 === 0
      ? 'This is a longer subject to test different lengths of text in the UI and how they render properly.'
      : 'Short Subject'
  }`,
  Body: `${
    index % 2 === 0
      ? 'This is a longer message content designed to test how the application handles larger bodies of text in emails.'
      : 'Short message content.'
  }`,
  type: ['inbox', 'sent', 'spam'][index % 3],
  isFav: Math.random() > 0.5,
  time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(
    Math.floor(Math.random() * 60)
  ).padStart(2, '0')}`,
}));

export interface DummyEmailDataType {
  id: string;
  SenderName: string;
  Subject: string;
  Body: string;
  type: string;
  isFav: boolean;
  time: string;
}

export const emailTemplates = [
  {
    id: 1,
    label: 'Welcome Invitation',
    value: `
      Dear [User Name],

      Welcome to [Platform Name]! We’re thrilled to have you on board.

      Click the link below to activate your account and start exploring:
      [Activation Link]

      If you have any questions, feel free to contact us at support@[platformname].com.

      Best Regards,
      The [Platform Name] Team
    `,
  },
  {
    id: 2,
    label: 'Meeting Invitation',
    value: `
      Subject: Invitation to Meeting

      Hi [User Name],

      You’re invited to a meeting scheduled for:

      Date: [Date]
      Time: [Time]
      Location: [Location or Virtual Link]

      Please confirm your availability by replying to this email or clicking the RSVP link below:
      [RSVP Link]

      Looking forward to your participation!

      Thanks,
      [Sender’s Name]
    `,
  },
  {
    id: 3,
    label: 'Event Reminder',
    value: `
      Subject: Reminder: Upcoming Event

      Hello [User Name],

      Just a quick reminder about the upcoming event:

      Event: [Event Name]
      Date: [Date]
      Time: [Time]
      Location: [Location]

      Don’t forget to mark your calendar and let us know if you have any questions.

      See you there!

      Warm Regards,
      [Event Organizer Name]
    `,
  },
  {
    id: 4,
    label: 'Thank You Note',
    value: `
      Dear [User Name],

      Thank you for attending [Event Name]! We truly appreciate your time and hope you found it valuable.

      If you have any feedback or would like to stay updated about future events, feel free to reach out.

      Best Wishes,
      [Organizer Name or Team]
    `,
  },
  {
    id: 5,
    label: 'Password Reset',
    value: `
      Subject: Password Reset Request

      Hi [User Name],

      We received a request to reset your password. Click the link below to set a new password:
      [Reset Link]

      If you didn’t request a password reset, please ignore this email or contact support at support@[platformname].com.

      Thank you,
      [Platform Name] Support Team
    `,
  },
  {
    id: 6,
    label: 'Subscription Renewal Reminder',
    value: `
      Subject: Reminder: Subscription Renewal

      Hello [User Name],

      We hope you’re enjoying [Platform Name]! This is a friendly reminder that your subscription will expire on [Expiration Date].

      To continue uninterrupted access to our services, please renew your subscription here:
      [Renewal Link]

      If you have any questions, feel free to contact us at support@[platformname].com.

      Best Regards,
      The [Platform Name] Team
    `,
  },
];
