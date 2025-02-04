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
    {
      label: t('Draft'),
      value: 4,
    },
    {
      label: t('Starred'),
      value: 5,
    },
    {
      label: t('Important'),
      value: 6,
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

export interface EmailDataType {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  snippet: string;
  body: string;
  date: string;
  labelIds: string[];
  isFav: boolean;
}

export interface EmailFilterDataType {
  filters: {
    label: string;
    pageToken?: string;
    from?: string[];
    subject?: string;
    before?: string;
    after?: string;
    is?: string;
    to?: string[];
  };
}

// Dummy data

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
