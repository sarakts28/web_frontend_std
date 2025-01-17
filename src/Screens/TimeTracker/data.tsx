import { useTranslation } from 'react-i18next';

const useData = () => {
  const { t } = useTranslation();

  const subDetailTaskArrayReconciliations = [
    {
      id: 'Debtors',
      value: 'Debtors',
      label: t('Debtors'),
    },
    {
      id: 'Creditors',
      value: 'Creditors',
      label: t('Creditors'),
    },
    {
      id: 'BalanceSheet',
      value: 'BalanceSheet',
      label: t('BalanceSheet'),
    },
    {
      id: 'Payroll',
      value: 'Payroll',
      label: t('Payroll'),
    },
    { id: 'VAT', value: 'VAT', label: t('VAT') },
    {
      id: 'IntercompanyAccounts',
      value: 'IntercompanyAccounts',
      label: t('IntercompanyAccounts'),
    },
    {
      id: 'OtherSpecify',
      value: 'OtherSpecify',
      label: t('OtherSpecify'),
    },
  ];

  const subDetailTaskArrayCommunicationWithCustomers = [
    {
      id: 'PhoneCalls',
      value: 'PhoneCalls',
      label: t('PhoneCalls'),
    },
    {
      id: 'Emails',
      value: 'Emails',
      label: t('Emails'),
    },
    {
      id: 'Sms',
      value: 'Sms',
      label: t('Sms'),
    },
  ];

  const subDetailTaskArrayCommunicationWithTax = [
    {
      id: 'ClarificationQuestions',
      value: 'ClarificationQuestions',
      label: t('ClarificationQuestions'),
    },
    {
      id: 'Objections',
      value: 'Objections',
      label: t('Objections'),
    },
    {
      id: 'PaymentAgreements',
      value: 'PaymentAgreements',
      label: t('Payment Agreements'),
    },
  ];

  const subDeatilTaskArrayCustomerInquiry = [
    {
      id: 'DataExtraction',
      value: 'DataExtraction',
      label: t('DataExtraction'),
    },
    {
      id: 'ExplanationOfAccountingItems',
      value: 'ExplanationOfAccountingItems',
      label: t('ExplanationOfAccountingItems'),
    },
    {
      id: 'SpecificConsulting',
      value: 'SpecificConsulting',
      label: t('SpecificConsulting'),
    },
  ];

  const subDetailTaskArraySpecialProjects = [
    {
      id: 'AnalysisTasks',
      value: 'AnalysisTasks',
      label: t('AnalysisTasks'),
    },
    {
      id: 'OneOfTasks',
      value: 'OneOfTasks',
      label: t('OneOfTasks'),
    },
  ];

  const mainCategoryArray = [
    {
      id: 'Onboarding',
      value: 'Onboarding',
      label: t('Onboarding'),
      subTasks: [
        {
          id: 'neetingandKickoff',
          value: 'MeetingandKickoff',
          label: t('MeetingandKickoff'),
        },
        {
          id: 'ReviewofPreviousMaterial',
          value: 'ReviewofPreviousMaterial',
          label: t('ReviewofPreviousMaterial'),
        },
        {
          id: 'ActionPlanDevelopment',
          value: 'ActionPlanDevelopment',
          label: t('ActionPlanDevelopment'),
        },
        {
          id: 'FollowUpandDiscussion',
          value: 'FollowUpandDiscussion',
          label: t('FollowUpandDiscussion'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
    {
      id: 'InternalActivities',
      value: 'internalActivities',
      label: t('InternalActivities'),
      subTasks: [
        {
          id: 'Meetings',
          value: 'Meetings',
          label: t('Meetings'),
        },
        {
          id: 'ColleagueDiscussions',
          value: 'ColleagueDiscussions',
          label: t('ColleagueDiscussions'),
        },
        {
          id: 'PlanningandCoordination',
          value: 'PlanningandCoordination',
          label: t('PlanningandCoordination'),
        },
        {
          id: 'MiscellaneousInternal',
          value: 'MiscellaneousInternal',
          label: t('MiscellaneousInternal'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
    {
      id: 'Accounting',
      value: 'Accounting',
      label: t('Accounting'),
      subTasks: [
        {
          id: 'OngoingBookkeeping',
          value: 'OngoingBookkeeping',
          label: t('OngoingBookkeeping'),
        },
        {
          id: 'ReconstructionofHistoricalPeriods',
          value: 'ReconstructionofHistoricalPeriods',
          label: t('ReconstructionofHistoricalPeriods'),
        },
        {
          id: 'Reconciliations',
          value: 'Reconciliations',
          label: t('Reconciliations'),
          subDetailedTask: subDetailTaskArrayReconciliations,
        },
        {
          id: 'VATReporting',
          value: 'VATReporting',
          label: t('VATReporting'),
        },
        {
          id: 'PreparationofMonthlyandAnnualReports',
          value: 'PreparationofMonthlyandAnnualReports',
          label: t('PreparationofMonthlyandAnnualReports'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },

    {
      id: 'Communication',
      value: 'Communication',
      label: t('Communication'),
      subTasks: [
        {
          id: 'CommunicationWithCustomers',
          value: 'CommunicationWithCustomers',
          label: t('CommunicationWithCustomers'),
          subDetailedTask: subDetailTaskArrayCommunicationWithCustomers,
        },
        {
          id: 'CommunicationWithColleagues',
          value: 'CommunicationWithColleagues',
          label: t('CommunicationWithColleagues'),
        },
        {
          id: 'CommunicationWithTaxAuthorities/Agency',
          value: 'CommunicationWithTaxAuthorities/Agency',
          label: t('CommunicationWithTaxAuthorities/Agency'),
          subDetailedTask: subDetailTaskArrayCommunicationWithTax,
        },
        {
          id: 'CommunicationWithExternalParties(Banks, Lawyers)',
          value: 'CommunicationWithExternalParties(Banks, Lawyers)',
          label: t('CommunicationWithExternalParties(Banks, Lawyers)'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
    {
      id: 'AdhocAndSpecialTasks',
      value: 'AdhocAndSpecialTasks',
      label: t('AdhocAndSpecialTasks'),
      subTasks: [
        {
          id: 'CustomerInquiry',
          value: 'CustomerInquiry',
          label: t('CustomerInquiry'),
          subDetailedTask: subDeatilTaskArrayCustomerInquiry,
        },
        {
          id: 'SpecialProjects',
          value: 'SpecialProjects',
          label: t('SpecialProjects'),
          subDetailedTask: subDetailTaskArraySpecialProjects,
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
    {
      id: 'EducationAndDevelopment',
      value: 'EducationAndDevelopment',
      label: t('EducationAndDevelopment'),
      subTasks: [
        {
          id: 'ParticipationinCourses/Webinars',
          value: 'ParticipationinCourses/Webinars',
          label: t('ParticipationinCourses/Webinars'),
        },
        {
          id: 'InternalTraining',
          value: 'InternalTraining',
          label: t('InternalTraining'),
        },
        {
          id: 'SelfStudy',
          value: 'SelfStudy',
          label: t('Self-Study'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
    {
      id: 'LeaveAndAbsence',
      value: 'LeaveAndAbsence',
      label: t('LeaveAndAbsence'),
      subTasks: [
        {
          id: 'PlannedVacation',
          value: 'PlannedVacation',
          label: t('PlannedVacation'),
        },
        {
          id: 'SickLeave',
          value: 'SickLeave',
          label: t('SickLeave'),
        },
        {
          id: 'OtherSpecify',
          value: 'OtherSpecify',
          label: t('OtherSpecify'),
        },
      ],
    },
  ];

  const contextArray = [
    {
      id: 'Standard',
      value: 'Standard',
      label: t('Standard'),
      mainCategory: mainCategoryArray,
    },
    {
      id: 'BusinessTransformation',
      value: 'BusinessTransformation',
      label: t('BusinessTransformation'),
      mainCategory: mainCategoryArray,
    },
    {
      id: 'BusinessClosure',
      value: 'BusinessClosure',
      label: t('BusinessClosure'),
      mainCategory: mainCategoryArray,
    },
    {
      id: 'TaxCase',
      value: 'TaxCase',
      label: t('TaxCase'),
      mainCategory: mainCategoryArray,
    },
    {
      id: 'InternalTask',
      value: 'InternalTask',
      label: t('InternalTask'),
      mainCategory: mainCategoryArray,
    },
    {
      id: 'AdhocInquiry',
      value: 'AdhocInquiry',
      label: t('AdhocInquiry'),
      mainCategory: mainCategoryArray,
    },
  ];
  const data = [
    {
      id: 'customer1',
      label: 'Customer 1',
      value: 'Customer1',
      context: contextArray,
    },
    {
      id: 'customer2',
      label: 'Customer 2',
      value: 'Customer2',
      context: contextArray,
    },
    {
      id: 'customer3',
      label: 'Customer 3',
      value: 'Customer3',
      context: contextArray,
    },
    {
      id: 'customer4',
      label: 'Customer 4',
      value: 'Customer4',
      context: contextArray,
    },
    {
      id: 'customer5',
      value: 'Customer5',
      label: 'Customer 5',
      context: contextArray,
    },
  ];

  const clients = [
    {
      id: 'customer1',
      label: 'Customer 1',
      value: 'Customer1',
    },
    {
      id: 'customer2',
      label: 'Customer 2',
      value: 'Customer2',
    },
    {
      id: 'customer3',
      label: 'Customer 3',
      value: 'Customer3',
    },
    {
      id: 'customer4',
      label: 'Customer 4',
      value: 'Customer4',
    },
    {
      id: 'customer5',
      value: 'Customer5',
      label: 'Customer 5',
    },
  ];

  const findLabelByValue = (value: string) => {
    const recursiveSearch = (items: any[]): string | undefined => {
      for (const item of items) {
        if (item.value.toLowerCase() === value.toLocaleLowerCase()) {
          return item.label;
        }

        if (item.subTasks) {
          const found = recursiveSearch(item.subTasks);

          if (found) return found;
        }

        if (item.subDetailedTask) {
          const found = recursiveSearch(item.subDetailedTask);

          if (found) return found;
        }

        if (item.context) {
          const found = recursiveSearch(item.context);

          if (found) return found;
        }
      }

      return undefined;
    };

    const result =
      recursiveSearch(data) ||
      recursiveSearch(clients) ||
      recursiveSearch(mainCategoryArray);

    return result || '';
  };


  return { data, clients, mainCategoryArray, findLabelByValue, contextArray };
};

export default useData;
