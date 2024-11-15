import { Info, SettingsIcon } from "lucide-react"

export const adminSidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: {
      size: 15,
      path: "/icons/dashboard.svg"
    },
    pending: false
  },
  {
    title: "Company",
    url: "#",
    icon: {
      size: 16,
      path: "/icons/company.svg"
    },
    pending: false
  },
  {
    title: "Teams",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/people.svg"
    },    subItems: [
      {
        name: "Onboarding",
        url: "/dashboard/teams/onboarding",
      },
      {
        name: "Analytics",
        url: "/dashboard/leave",
      },
      {
        name: "Employee",
        url: "/dashboard/teams/employee",
      },
      {
        name: "Department",
        url: "/dashboard/teams/department",
      },
      {
        name: "Managers",
        url: "/dashboard/administration",
      },
      {
        name: "Requests",
        url: "/dashboard/administration",
      }
    ],
    pending: false
  },
  {
    title: "Payroll",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/payroll.svg"
    }, 
    pending: true 
  },
  {
    title: "Leave",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/leave.svg"
    },  
    pending: true
  },
  {
    title: "Performance",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/performance.svg"
    },
    pending: false
  },
  {
    title: "Benefits",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/benefit.svg"
    },  
    pending: false
  },
  {
    title: "Payments",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/payment.svg"
    },  
    pending: true
  },
  {
    title: "Recruitment",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/recruitment.svg"
    },  
    pending: true
  },
  {
    title: "Disciplinary",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/disciplinary.svg"
    },  
    pending: true
  },
  {
    title: "Documents",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/document.svg"
    }, 
    pending: false
  },
  {
    title: "Assets",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/asset.svg"
    },
    pending: false
  },
  {
    title: "Reports",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/report.svg"
    },
    pending: true
  },
]
export const employeeSidebarItems = [
  {
    title: "Onboarding",
    url: "#",
    icon: {
      size: 15,
      path: "/icons/onboard.svg"
    },
    pending: false
  },
  {
    title: "Dashboard",
    url: "#",
    icon: {
      size: 15,
      path: "/icons/dashboard.svg"
    },
    pending: false
  },
  {
    title: "Profile",
    url: "#",
    icon: {
      size: 16,
      path: "/icons/profile.svg"
    },
    pending: false
  },
  {
    title: "Requests",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/requestircon.svg"
    },    subItems: [
      {
        name: "Onboarding",
        url: "/dashboard/teams/onboarding",
      },
      {
        name: "Analytics",
        url: "/dashboard/leave",
      },
      {
        name: "Employee",
        url: "/dashboard/teams/employee",
      },
      {
        name: "Department",
        url: "/dashboard/teams/department",
      },
      {
        name: "Managers",
        url: "/dashboard/administration",
      },
      {
        name: "Requests",
        url: "/dashboard/administration",
      }
    ],
    pending: false
  },
  {
    title: "Claims",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/claims.svg"
    }, 
    pending: true 
  },
  {
    title: "Performance",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/performanceicon.svg"
    },  
    pending: true
  },
  {
    title: "Benefits",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/benefiticon.svg"
    },  
    pending: true
  },
  {
    title: "Payslips",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/payslipsicon.svg"
    },
    pending: true
  },
  {
    title: "Wallets",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/benefit.svg"
    },  
    pending: true
  },
  {
    title: "Documents",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/document.svg"
    }, 
    pending: false
  },
  {
    title: "Assets",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/asset.svg"
    },
    pending: false
  },
]

export const adminSidebarfooterItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: Info,
  }
]