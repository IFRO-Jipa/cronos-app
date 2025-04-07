import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

export const PAGE_HOME_ACTIONS = [
  {
    label: "Turma",
    icon: <SchoolIcon fontSize={"large"} />,
    href: "/classes",
  },
  {
    label: "Professor",
    icon: <PersonIcon fontSize={"large"} />,
    href: "/teachers",
  },
  {
    label: "Avançado",
    icon: <DashboardCustomizeIcon fontSize={"large"} />,
    href: "/advanced",
  },
];
